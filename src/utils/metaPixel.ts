// Meta Pixel & Conversions API (CAPI) Integration Helper
// Pixel ID: 1056774304044998

export const META_PIXEL_ID = '1056774304044998';

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
    _fbq?: any;
  }
}

/**
 * Utility to read browser cookie value by name
 */
export function getCookie(name: string): string | undefined {
  if (typeof document === 'undefined') return undefined;
  const match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
  return match ? decodeURIComponent(match[3]) : undefined;
}

/**
 * Generate unique event ID for Meta Pixel and CAPI deduplication
 */
export function generateMetaEventId(prefix: string = 'evt'): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 9);
  return `${prefix}_${timestamp}_${random}`;
}

/**
 * Extract Meta Click ID (_fbc) from URL or cookie
 */
export function getMetaClickId(): string | undefined {
  if (typeof window === 'undefined') return undefined;
  
  // Try cookie first
  const cookieFbc = getCookie('_fbc');
  if (cookieFbc) return cookieFbc;

  // Try URL parameter 'fbclid'
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const fbclid = urlParams.get('fbclid');
    if (fbclid) {
      const creationTime = Date.now();
      return `fb.1.${creationTime}.${fbclid}`;
    }
  } catch (e) {
    // ignore
  }

  return undefined;
}

/**
 * Extract Meta Browser ID (_fbp) from cookie
 */
export function getMetaBrowserId(): string | undefined {
  return getCookie('_fbp');
}

export interface MetaUserData {
  fullName?: string;
  phone?: string;
  email?: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
}

export interface MetaCustomData {
  value?: number;
  currency?: string;
  content_name?: string;
  content_category?: string;
  content_type?: string;
  content_ids?: string[];
  contents?: Array<{
    id: string;
    quantity: number;
    item_price?: number;
    title?: string;
  }>;
  num_items?: number;
  order_id?: string;
  status?: string;
  [key: string]: any;
}

/**
 * Send event to Meta Conversions API backend proxy (/api/meta-conversion)
 */
export async function sendMetaConversionApi(
  eventName: string,
  customData: MetaCustomData = {},
  userData: MetaUserData = {},
  eventId?: string
) {
  const finalEventId = eventId || generateMetaEventId('capi');
  
  try {
    const payload = {
      event_name: eventName,
      event_id: finalEventId,
      event_time: Math.floor(Date.now() / 1000),
      event_source_url: typeof window !== 'undefined' ? window.location.href : '',
      user_data: {
        ...userData,
        fbp: getMetaBrowserId(),
        fbc: getMetaClickId(),
        client_user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
      },
      custom_data: {
        currency: 'NGN',
        ...customData,
      },
    };

    const res = await fetch('/api/meta-conversion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      console.warn(`[Meta CAPI] Server returned status ${res.status}`);
    }
  } catch (error) {
    console.warn('[Meta CAPI] Event dispatch skipped or offline:', error);
  }

  return finalEventId;
}

/**
 * Track an event simultaneously via both client-side Meta Pixel (fbq)
 * and server-side Conversions API (CAPI) with matching eventID for deduplication.
 */
export function trackMetaEvent(
  eventName: string,
  customData: MetaCustomData = {},
  userData: MetaUserData = {},
  customEventId?: string
) {
  const eventId = customEventId || generateMetaEventId(eventName.toLowerCase());

  // 1. Client-Side Meta Pixel (fbq)
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    try {
      window.fbq('track', eventName, customData, { eventID: eventId });
    } catch (e) {
      console.warn('[Meta Pixel] fbq track error:', e);
    }
  }

  // 2. Server-Side Conversions API (CAPI)
  sendMetaConversionApi(eventName, customData, userData, eventId);

  return eventId;
}

/**
 * Specific Conversions API & Pixel Event Triggers
 */

// 1. ViewContent (when user views cooker details)
export function trackMetaViewContent(product = {
  title: 'Premium 2-Burner Flip-Up Glass Gas Cooker',
  price: 170000,
  id: 'noblestone-2b-flip-cooker',
}) {
  return trackMetaEvent('ViewContent', {
    content_name: product.title,
    content_category: 'Kitchen Appliances',
    content_ids: [product.id],
    content_type: 'product',
    value: product.price,
    currency: 'NGN',
  });
}

// 2. AddToCart (when user selects a package/bundle)
export function trackMetaAddToCart(packageDetails: {
  quantity: number;
  label: string;
  price: number;
}) {
  return trackMetaEvent('AddToCart', {
    content_name: `Premium 2-Burner Flip-Up Cooker (${packageDetails.label})`,
    content_category: 'Kitchen Appliances',
    content_ids: ['noblestone-2b-flip-cooker'],
    content_type: 'product',
    value: packageDetails.price,
    currency: 'NGN',
    num_items: packageDetails.quantity,
  });
}

// 3. InitiateCheckout (when user starts the order flow or clicks "Order Now")
export function trackMetaInitiateCheckout(details?: {
  quantity?: number;
  price?: number;
  source?: string;
}) {
  const qty = details?.quantity || 1;
  const val = details?.price || 170000;
  return trackMetaEvent('InitiateCheckout', {
    content_name: 'Premium 2-Burner Flip-Up Glass Gas Cooker',
    content_category: 'Kitchen Appliances',
    content_ids: ['noblestone-2b-flip-cooker'],
    content_type: 'product',
    num_items: qty,
    value: val,
    currency: 'NGN',
    source: details?.source || 'landing_cta',
  });
}

// 4. Purchase (when user successfully completes Pay-on-Delivery order)
export function trackMetaPurchase(params: {
  orderId: string;
  total: number;
  quantity: number;
  productTitle: string;
  customer: {
    fullName: string;
    phone: string;
    address: string;
    city: string;
    state: string;
  };
}) {
  const { orderId, total, quantity, productTitle, customer } = params;

  return trackMetaEvent(
    'Purchase',
    {
      content_name: productTitle,
      content_type: 'product',
      content_ids: ['noblestone-2b-flip-cooker'],
      contents: [
        {
          id: 'noblestone-2b-flip-cooker',
          quantity: quantity,
          item_price: total / (quantity || 1),
          title: productTitle,
        },
      ],
      value: total,
      currency: 'NGN',
      num_items: quantity,
      order_id: orderId,
    },
    {
      fullName: customer.fullName,
      phone: customer.phone,
      address: customer.address,
      city: customer.city,
      state: customer.state,
      country: 'ng',
    },
    orderId // Use identical orderId for deterministic client-server deduplication
  );
}

// 5. Contact (when user clicks post-order WhatsApp dispatch link)
export function trackMetaContact(contactMethod = 'WhatsApp Dispatch', orderId?: string) {
  return trackMetaEvent('Contact', {
    content_name: contactMethod,
    order_id: orderId || 'post_order',
    status: 'order_confirmed',
  });
}
