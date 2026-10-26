import express from 'express';
import crypto from 'crypto';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const META_PIXEL_ID = process.env.META_PIXEL_ID || '1056774304044998';
const META_ACCESS_TOKEN = process.env.META_CONVERSIONS_API_TOKEN || process.env.META_ACCESS_TOKEN || '';
const META_TEST_EVENT_CODE = process.env.META_TEST_EVENT_CODE || '';

app.use(express.json());

// Helper to hash string with SHA-256 for Meta Conversions API
function hashSha256(value?: string | null): string | undefined {
  if (!value) return undefined;
  const normalized = value.trim().toLowerCase();
  if (!normalized) return undefined;
  return crypto.createHash('sha256').update(normalized).digest('hex');
}

// Normalize and hash phone number (standardizes Nigerian numbers to 234...)
function normalizeAndHashPhone(phone?: string | null): string | undefined {
  if (!phone) return undefined;
  let digits = phone.replace(/\D/g, '');
  if (!digits) return undefined;

  // If local Nigerian phone starting with '0', prepend '234'
  if (digits.startsWith('0') && digits.length === 11) {
    digits = '234' + digits.substring(1);
  } else if (!digits.startsWith('234') && digits.length === 10) {
    digits = '234' + digits;
  }

  return crypto.createHash('sha256').update(digits).digest('hex');
}

// Health and Meta CAPI Status Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    meta_pixel_id: META_PIXEL_ID,
    meta_capi_active: Boolean(META_ACCESS_TOKEN),
    test_event_code_set: Boolean(META_TEST_EVENT_CODE),
    timestamp: new Date().toISOString(),
  });
});

// Meta Conversions API (CAPI) Proxy Route
app.post('/api/meta-conversion', async (req, res) => {
  try {
    const {
      event_name,
      event_id,
      event_time = Math.floor(Date.now() / 1000),
      event_source_url,
      user_data = {},
      custom_data = {},
    } = req.body;

    if (!event_name) {
      return res.status(400).json({ error: 'event_name is required' });
    }

    // Extract client IP and User Agent
    const rawIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';
    const clientIp = Array.isArray(rawIp)
      ? rawIp[0]
      : (typeof rawIp === 'string' ? rawIp.split(',')[0].trim() : '');
    const clientUserAgent = (req.headers['user-agent'] as string) || user_data.client_user_agent || '';

    // Split full name into first and last name if available
    let firstName = '';
    let lastName = '';
    if (user_data.fullName) {
      const parts = user_data.fullName.trim().split(/\s+/);
      firstName = parts[0] || '';
      lastName = parts.slice(1).join(' ') || '';
    }

    // Format hashed user data according to Meta Conversions API specifications
    const formattedUserData: Record<string, any> = {
      client_ip_address: clientIp || undefined,
      client_user_agent: clientUserAgent || undefined,
    };

    if (user_data.fbp) formattedUserData.fbp = user_data.fbp;
    if (user_data.fbc) formattedUserData.fbc = user_data.fbc;

    const hashedPhone = normalizeAndHashPhone(user_data.phone);
    if (hashedPhone) formattedUserData.ph = [hashedPhone];

    const hashedEmail = hashSha256(user_data.email);
    if (hashedEmail) formattedUserData.em = [hashedEmail];

    const hashedFn = hashSha256(firstName);
    if (hashedFn) formattedUserData.fn = [hashedFn];

    const hashedLn = hashSha256(lastName);
    if (hashedLn) formattedUserData.ln = [hashedLn];

    const hashedCity = hashSha256(user_data.city ? user_data.city.replace(/\s+/g, '') : undefined);
    if (hashedCity) formattedUserData.ct = [hashedCity];

    const hashedState = hashSha256(user_data.state);
    if (hashedState) formattedUserData.st = [hashedState];

    const hashedCountry = hashSha256('ng'); // Nigeria
    if (hashedCountry) formattedUserData.country = [hashedCountry];

    const finalEventId = event_id || `evt_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

    // Assemble Conversions API Event Object
    const eventPayload: Record<string, any> = {
      event_name,
      event_time,
      event_id: finalEventId,
      event_source_url: event_source_url || (req.headers.referer as string) || 'https://noblestonebathrooms.com',
      action_source: 'website',
      user_data: formattedUserData,
      custom_data: {
        currency: 'NGN',
        ...custom_data,
      },
    };

    const capiBody: Record<string, any> = {
      data: [eventPayload],
    };

    if (META_TEST_EVENT_CODE) {
      capiBody.test_event_code = META_TEST_EVENT_CODE;
    }

    // If Access Token is provided, dispatch to Meta Graph API
    if (META_ACCESS_TOKEN) {
      const graphUrl = `https://graph.facebook.com/v19.0/${META_PIXEL_ID}/events?access_token=${encodeURIComponent(META_ACCESS_TOKEN)}`;
      
      const response = await fetch(graphUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(capiBody),
      });

      const responseData = await response.json();

      if (!response.ok) {
        console.error('[Meta CAPI] Error from Meta Graph API:', responseData);
        return res.status(response.status).json({
          success: false,
          error: responseData,
          event_id: finalEventId,
        });
      }

      console.log(`[Meta CAPI] Successfully sent ${event_name} (ID: ${finalEventId}) to Meta Graph API`);
      return res.json({
        success: true,
        event_id: finalEventId,
        meta_response: responseData,
      });
    }

    // Informational simulation/logging when token is not yet provided
    console.log(`[Meta CAPI] Event received: ${event_name} (ID: ${finalEventId}) - Payload prepared for Pixel ${META_PIXEL_ID}`);
    return res.json({
      success: true,
      event_id: finalEventId,
      status: 'simulated_and_logged',
      message: 'Conversions API event processed. Set META_CONVERSIONS_API_TOKEN in environment to forward live to Meta Graph API.',
      pixel_id: META_PIXEL_ID,
    });
  } catch (err: any) {
    console.error('[Meta CAPI] Server error processing event:', err);
    return res.status(500).json({
      success: false,
      error: err.message || 'Internal server error',
    });
  }
});

// Vite Middleware Setup
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Server] Running on http://0.0.0.0:${PORT} (Meta Pixel: ${META_PIXEL_ID})`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
