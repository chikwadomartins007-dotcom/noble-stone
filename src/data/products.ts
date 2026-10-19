import { Product } from '../types';

export const LUXURY_FINISHES = {
  gunmetal: { id: 'gunmetal', name: 'Nano Gunmetal Grey', hex: '#43464b', colorClass: 'bg-[#43464b]' },
  brushedGold: { id: 'brushed-gold', name: 'Brushed Royal Gold', hex: '#d4af37', colorClass: 'bg-[#d4af37]' },
  matteBlack: { id: 'matte-black', name: 'Obsidian Matte Black', hex: '#1a1a1a', colorClass: 'bg-[#1a1a1a]' },
  chromeSilver: { id: 'chrome', name: 'Starlight Chrome', hex: '#d9e2ec', colorClass: 'bg-[#d9e2ec]' },
  whiteCeramic: { id: 'white-ceramic', name: 'Alpine Nano Glaze White', hex: '#f8fafc', colorClass: 'bg-[#f8fafc]' },
};

export const PRODUCTS: Product[] = [
  {
    id: 'noblestone-imperial-piano-shower',
    title: 'Noblestone Imperial 5-Key Digital Piano Thermostatic Shower Set',
    subtitle: 'Hydroelectric LED Real-Time Temperature Display & Solid Brass Engine',
    category: 'digital-showers',
    originalPrice: 420000,
    salePrice: 265000,
    currency: '₦',
    badge: 'Best Seller • 37% OFF',
    rating: 4.9,
    reviewsCount: 342,
    stockLeft: 4,
    images: [
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1200&q=80'
    ],
    finishes: [
      LUXURY_FINISHES.gunmetal,
      LUXURY_FINISHES.brushedGold,
      LUXURY_FINISHES.matteBlack,
      LUXURY_FINISHES.chromeSilver
    ],
    highlights: [
      'Hydroelectric LED Display: Shows real-time temperature & timer without any batteries or electricity',
      'Independent Piano Key Controls: 4 intuitive keys for Rainfall, Waterfall, Hand Wand, and High-Pressure Bidet Gun',
      'Anti-Scald Thermostatic Core: Locks safe 38°C water temperature with rapid 0.2s thermal response',
      'Solid Refined H59 Brass Body: Explosion-proof, anti-corrosive, engineered for over 15+ years of daily use',
      'Ambient LED Glow & Broad Tempered Glass Storage Shelf for shampoos and luxury toiletries'
    ],
    specs: [
      { label: 'Valve Core', value: 'Sedal Ceramic Thermostatic Valve Cartridge' },
      { label: 'Shower Head Size', value: '320mm x 200mm Air-Injection Rainfall' },
      { label: 'Power Source', value: 'Internal Micro-Hydro Turbine (100% Self-Powered)' },
      { label: 'Installation Type', value: 'Standard Wall Mounted (Hot & Cold 150mm ±15mm)' },
      { label: 'Material', value: 'Refined H59 Brass + Aerospace Aluminum + Tempered Glass' },
      { label: 'Working Pressure', value: '0.1MPa - 0.6MPa (Works with gravity and booster pumps)' }
    ],
    boxContents: [
      '1x Main Brass Piano Key Control Manifold with LED Display',
      '1x Ultra-Slim Large Overhead Rain Showerhead',
      '1x 3-Function Pressurized Hand Shower Wand',
      '1x High-Pressure Brass Bidet Spray Gun',
      '1x 1.5m Tangle-Free Anti-Burst PVC Flexible Hose',
      '1x Adjustable Height Stainless Steel Riser Rail',
      'Full Brass Decorative Eccentric Wall Fittings & Washer Seals'
    ],
    description: 'Transform your bathroom into a 7-star wellness sanctuary. The Noblestone Imperial Shower combines aerospace engineering with haute-couture bathroom architecture. Built with an internal micro-hydro turbine, the LED screen lights up automatically the moment water flows, displaying water temperature in real time to prevent burns. Switch effortlessly between the tropical rain canopy, soothing cascade waterfall, pressurized hand shower, and bidet washer with responsive piano keys.',
    dimensions: 'Height adjustable: 850mm - 1250mm | Showerhead: 320mm x 200mm',
    material: 'Refined H59 Brass + 304 Stainless Steel + Tempered Glass Shelf',
    warranty: '5-Year Manufacturer Warranty on Valve Core & Brass Engine',
    isBestSeller: true
  },
  {
    id: 'noblestone-sovereign-smart-toilet',
    title: 'Noblestone Sovereign Intelligent Smart Bidet Toilet',
    subtitle: 'Microwave Radar Auto-Open, Foot Sensor Flush & UV-C Plasma Sterilization',
    category: 'smart-toilets',
    originalPrice: 890000,
    salePrice: 580000,
    currency: '₦',
    badge: 'Flagship Luxury • 35% OFF',
    rating: 5.0,
    reviewsCount: 189,
    stockLeft: 3,
    images: [
      'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1540518614846-7ede433c4ef9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
    ],
    finishes: [
      LUXURY_FINISHES.whiteCeramic,
      { id: 'white-gold', name: 'Alpine White & Brushed Gold Rim', hex: '#f0ede6', colorClass: 'bg-[#f0ede6]' }
    ],
    highlights: [
      'Hands-Free Microwave Radar Sensing: Automatically lifts lid upon gentle approach and closes upon departure',
      'Foot-Kick Sensor: Kick bottom sensor to lift seat ring and trigger silent vortex dual flush',
      'Instant Ceramic Core Water Heating: Warm water wash with oscillating pulse massage & adjustable temperature',
      'Warm Air Drying System with 4 temperature settings eliminating the need for toilet paper',
      'Built-in Battery Backup: Continuous flushing even during power outages',
      'UV-C Light Self-Cleaning Stainless Nozzle & Plasma Odor Purification'
    ],
    specs: [
      { label: 'Flush System', value: 'Siphonic 360° Silent Tornado Vortex (3.8L/4.8L)' },
      { label: 'Heating Method', value: 'Instant Ceramic Rod Thermal Induction' },
      { label: 'Water Pressure', value: 'Zero Water Pressure Limitation (Built-in booster tank)' },
      { label: 'Dimensions', value: '680mm x 390mm x 480mm' },
      { label: 'Rough-In Distance', value: 'Standard 300mm / 400mm Floor Pit' },
      { label: 'Certifications', value: 'CE, RoHS, WaterSense, ISO9001' }
    ],
    boxContents: [
      '1x Noblestone Sovereign Integrated Smart WC Body',
      '1x Wireless Touch Remote Control & Wall Mount Cradle',
      '1x Angle Valve with Dual Stage Sedimentary Water Filter',
      '1x Flange Gasket Seal & Floor Fixing Hardware',
      '1x High-Capacity 9V Backup Battery Pack for Outage Operation',
      '1x Instruction & Plumber Installation Manual'
    ],
    description: 'The pinnacle of hygienic bathroom engineering. The Noblestone Sovereign Smart WC senses your presence from up to 1 meter away, gracefully lifting its soft-close lid. Equipped with an integrated booster pump, it flushes powerfully even in low-pressure homes with whisper-quiet vortex suction. Enjoy posterior and feminine cleansing, heated seat comfort, and warm air drying effortlessly with the sleek wireless remote.',
    dimensions: '680mm (L) x 390mm (W) x 480mm (H)',
    material: 'High-Temperature 1280°C Vitreous China Ceramic + Antibacterial UF Seat',
    warranty: '5-Year Structural & 3-Year Electrical Complete Replacement Warranty',
    isBestSeller: true
  },
  {
    id: 'noblestone-grand-waterfall-nano-sink',
    title: 'Noblestone Grand 304 Nano Waterfall Kitchen Workstation Sink',
    subtitle: 'Piano Flying Rain Waterfall, Digital Temp Display & Integrated Glass Rinser',
    category: 'waterfall-sinks',
    originalPrice: 380000,
    salePrice: 235000,
    currency: '₦',
    badge: 'Popular • 38% OFF',
    rating: 4.9,
    reviewsCount: 278,
    stockLeft: 6,
    images: [
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=80'
    ],
    finishes: [
      LUXURY_FINISHES.gunmetal,
      LUXURY_FINISHES.brushedGold,
      LUXURY_FINISHES.matteBlack
    ],
    highlights: [
      'Dual Waterfall Outlets: Gentle Flying Rain waterfall for delicate greens and fruits + piano switch cascade',
      'Hydro-Powered Digital Temperature Monitor: Displays water heat without batteries or external wiring',
      '304 Honeycomb Bionic Embossed Surface: Scratch-resistant, oil-repellent, anti-fingerprint nano coating',
      'High-Pressure Glass Rinser: One-press rapid multi-angle jet cleaner for cups, baby bottles, and wine glasses',
      'Complete Culinary Accessories Included: Solid wood prep board, triangular strainer, wash basin, soap dispenser'
    ],
    specs: [
      { label: 'Material', value: 'Extra-Thick 3.0mm SUS304 Food-Grade Stainless Steel' },
      { label: 'Sink Dimensions', value: '750mm x 450mm x 220mm (Also available in 800mm)' },
      { label: 'Faucet Type', value: '360° Swivel Pull-Out Spring Sprayer (3 Spray Modes)' },
      { label: 'Sound Deadening', value: 'Heavy Duty EVA Acoustic Sound Absorption Undercoating' },
      { label: 'Drain System', value: 'One-Knob Remote Countertop Waste Drain Control' }
    ],
    boxContents: [
      '1x Noblestone 304 Nano Honeycomb Double Waterfall Sink',
      '1x Digital LED Pull-Out Faucet Assembly with Piano Keys',
      '1x High-Pressure Glass/Cup Rinser with Braided Supply Line',
      '1x Solid Sapele Hardwood Cutting & Prep Board',
      '1x Triangular Stainless Steel Drying Colander',
      '1x Small Inner Soaking Wash Basin',
      '1x Press-Action Liquid Soap Dispenser',
      '1x Knob Drain Waste Pipe Kit with Anti-Odor Trap'
    ],
    description: 'Transform your kitchen with the workstation sink acclaimed by culinary connoisseurs and architectural designers. Features a unique bionic lotus-leaf micro-crystalline nano coating where grease and sauce glide off effortlessly. Clean vegetables in seconds under the expansive Flying Rain sheet, rinse glasses like a professional barista, and monitor water warmth in real-time.',
    dimensions: '750mm (L) x 450mm (W) x 220mm (D)',
    material: 'SUS304 Stainless Steel + Bionic Nano-Titanium Honeycomb Embossing',
    warranty: '5-Year Rust-Proof & Mechanical Warranty',
    isBestSeller: true
  },
  {
    id: 'noblestone-aurelia-stone-bathtub',
    title: 'Noblestone Aurelia Freestanding Seamless Cast Stone Resin Bathtub',
    subtitle: 'Thermal Dual-Layer Heat Retention with Ergonomic Contoured Lumbar Support',
    category: 'luxury-bathtubs',
    originalPrice: 950000,
    salePrice: 620000,
    currency: '₦',
    badge: 'Architectural Icon • 35% OFF',
    rating: 4.9,
    reviewsCount: 94,
    stockLeft: 2,
    images: [
      'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=1200&q=80'
    ],
    finishes: [
      LUXURY_FINISHES.whiteCeramic,
      { id: 'matte-black-exterior', name: 'Obsidian Black Exterior / Pure White Interior', hex: '#111827', colorClass: 'bg-[#111827]' }
    ],
    highlights: [
      'Monolithic Solid Cast Stone Resin: Non-porous, antibacterial, velvety matte-silk finish that resists staining',
      'Triple Thermal Core: Retains bath water temperature 60% longer than traditional acrylic tubs',
      'Architectural Organic Silhouette: Perfectly curved 115° back recline designed to support spinal alignment',
      'Concealed Integrated Slotted Overflow and polished brass click-clack pop-up waste'
    ],
    specs: [
      { label: 'Length', value: '1700mm (Also customizable to 1500mm / 1600mm)' },
      { label: 'Capacity', value: '290 Litres' },
      { label: 'Net Weight', value: '115 kg (Heavy-weight solid stone foundation)' },
      { label: 'Drain Position', value: 'Center Slotted with Brass Pop-Up' },
      { label: 'Maintenance', value: 'Renewable surface; light scratches buff out instantly' }
    ],
    boxContents: [
      '1x Noblestone Aurelia Monolithic Stone Bathtub',
      '1x Solid Brass Chrome/Gold Pop-Up Drain Plug Assembly',
      '1x Flexible Drain Extension Hose & Floor Seal',
      '1x Specialized Surface Finishing Sponge & Polish Kit'
    ],
    description: 'The defining focal point of any master ensuite. Carved from a blend of natural crushed stone aggregate and high-performance resin, the Aurelia combines sculptural elegance with tactile warmth. The silky matte texture is inviting to the touch, and its heat-locking core ensures your evening soak stays warm and luxurious for hours.',
    dimensions: '1700mm (L) x 800mm (W) x 580mm (H)',
    material: 'Natural Mineral Crushed Stone Composite & Cross-Linked Poly-Resin',
    warranty: '10-Year Structural Guarantee',
    isBestSeller: false
  },
  {
    id: 'noblestone-elysium-floating-vanity',
    title: 'Noblestone Elysium Sintered Slate Floating Vanity & Smart Mirror Set',
    subtitle: 'Integrated Seamless Italian Slate Basin with 3-Color Dimmable Defogging Mirror',
    category: 'vanities-mirrors',
    originalPrice: 680000,
    salePrice: 440000,
    currency: '₦',
    badge: 'New Collection • 35% OFF',
    rating: 4.8,
    reviewsCount: 112,
    stockLeft: 5,
    images: [
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1540518614846-7ede433c4ef9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80'
    ],
    finishes: [
      { id: 'slate-grey', name: 'Italian Laurent Noir Sintered Stone', hex: '#2c3038', colorClass: 'bg-[#2c3038]' },
      { id: 'calacatta-gold', name: 'Calacatta Oro White Marble', hex: '#f3ede2', colorClass: 'bg-[#f3ede2]' }
    ],
    highlights: [
      'Seamless 12mm Sintered Stone Basin: Zero water staining, heat-resistant up to 1200°C, zero absorption rate',
      'Aviation Multi-Layer Solid Oak Cabinet: Specially sealed against humidity and bathroom vapor deformation',
      'Smart LED Illuminated Mirror: Touch switch, warm/neutral/cool dimming, automatic heat demister pad & digital clock',
      'DTC Concealed Damping Soft-Close Drawers with custom leather organizer dividers'
    ],
    specs: [
      { label: 'Vanity Dimensions', value: '1000mm / 1200mm (W) x 500mm (D) x 480mm (H)' },
      { label: 'Smart Mirror Dimensions', value: '950mm (W) x 700mm (H) with back ambient lighting' },
      { label: 'Drawer Slides', value: 'DTC Silent Hydraulic Undermount Buffers (80kg load rating)' },
      { label: 'Mirror Features', value: '3-Touch Sensor: Power, CCT Dimmer, Instant Defogger' }
    ],
    boxContents: [
      '1x Integrated Sintered Slate Vanity Top & Basin',
      '1x Solid Wood Wall-Mounted Cabinet with 2 Soft-Close Drawers',
      '1x Smart LED Touch Defogging Mirror Unit',
      '1x Heavy-Duty Steel Wall Mounting Bracket & Expansion Bolts',
      '1x Pop-Up Drain Assembly with Odor-Free Trap P-Trap'
    ],
    description: 'Designed for bespoke architectural residences. The Elysium pairs sintered stone quarried and refined to resist all cosmetics, hot styling tools, and hard water marks with master-crafted solid wood storage. The matching smart mirror eliminates steam mist in 5 seconds with its integrated micro-heating element, giving you flawless clarity every morning.',
    dimensions: '1000mm (W) x 500mm (D) x 480mm (H) | Mirror: 950mm x 700mm',
    material: 'Italian Sintered Stone Slab + Marine-Grade Solid Wood + HD Silver Mirror',
    warranty: '5-Year Cabinet & Sintered Stone Warranty',
    isNewArrival: true
  },
  {
    id: 'noblestone-concealed-inwall-shower',
    title: 'Noblestone Aurelius In-Wall Concealed Thermostatic Multi-Jet System',
    subtitle: 'Minimalist Flush Architectural Architecture with 3 Body Massage Spray Jets',
    category: 'digital-showers',
    originalPrice: 340000,
    salePrice: 215000,
    currency: '₦',
    badge: 'Minimalist Luxury • 36% OFF',
    rating: 4.8,
    reviewsCount: 167,
    stockLeft: 5,
    images: [
      'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=1200&q=80'
    ],
    finishes: [
      LUXURY_FINISHES.brushedGold,
      LUXURY_FINISHES.gunmetal,
      LUXURY_FINISHES.matteBlack
    ],
    highlights: [
      'Concealed In-Wall Rough-In Box: Sleek European aesthetic with all pipework hidden flush behind marble or tile',
      '3 High-Pressure Swiveling Body Massage Jets that target lower back, mid-back, and shoulder tension',
      '12-Inch Ultra-Slim Ceiling/Wall Mount Rainfall Plate with easy-clean medical-grade silicone nozzles',
      'Solid Brass 3-Way Thermostatic Diverter with Vernet Thermostatic Cartridge from France'
    ],
    specs: [
      { label: 'Rough-in Depth', value: '70mm - 85mm standard wall cavity depth' },
      { label: 'Cartridge', value: 'Vernet (France) Wax Sensor Thermostatic Core' },
      { label: 'Connection Size', value: 'Standard 1/2" NPT / G1/2 Threaded' },
      { label: 'Body Jets', value: '3x 50mm Brass Swivel Jets (30° angle adjustment)' }
    ],
    boxContents: [
      '1x Solid Brass Heavy-Duty In-Wall Rough-In Diverter Valve Box',
      '1x Architectural Brass Faceplate with Precision Dial Knobs',
      '1x 12-Inch Stainless Steel Rain Showerhead & 400mm Brass Arm',
      '3x Directional Body Massage Spray Jets',
      '1x Solid Brass Hand Shower Wand & Wall Holder with Water Outlet',
      '1x 1.5m Reinforced Anti-Twist Shower Hose'
    ],
    description: 'For homeowners and architects who desire an ultra-clean, minimalist wet room. The Noblestone Aurelius conceals all unsightly pipework inside the wall, leaving only refined solid brass dial plates, body massage jets, and an expansive ceiling rain shower head.',
    dimensions: 'Showerhead: 300mm x 300mm | Faceplate: 280mm x 130mm',
    material: 'H59-1 Refined Solid Brass + 304 Stainless Steel',
    warranty: '5-Year In-Wall Leak-Proof Warranty'
  },
  {
    id: 'noblestone-rimless-wall-hung-wc',
    title: 'Noblestone Ventus Wall-Hung Rimless WC with Ultra-Thin Soft-Close Seat',
    subtitle: 'Space-Saving Floating Ceramic with Silent Dual Tornado Cyclone Flushing',
    category: 'smart-toilets',
    originalPrice: 290000,
    salePrice: 185000,
    currency: '₦',
    badge: '36% OFF',
    rating: 4.9,
    reviewsCount: 145,
    stockLeft: 7,
    images: [
      'https://images.unsplash.com/photo-1540518614846-7ede433c4ef9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&w=1200&q=80'
    ],
    finishes: [
      LUXURY_FINISHES.matteBlack,
      LUXURY_FINISHES.whiteCeramic
    ],
    highlights: [
      'Floating Wall-Hung Architecture: Makes bathroom floors effortlessly fast to mop and sanitize',
      'Rimless Clean-Flush Technology: Eliminates hidden cavities where limescale and bacteria multiply',
      'Dual-Stream Tornado Flush: High velocity cyclonic water vortex cleans entire bowl in a single flush',
      'Compatible with Geberit, Grohe, and all standard concealed in-wall cistern tanks'
    ],
    specs: [
      { label: 'Weight Capacity', value: 'Tested up to 400kg on standard concealed frames' },
      { label: 'Glaze Type', value: 'Triple Micro-Crystal Antibacterial Nano Glaze' },
      { label: 'Seat Material', value: 'Urea-Formaldehyde (UF) Scratch-Resistant with Quick Release' },
      { label: 'Flush Volume', value: 'Water-Saving 3L Eco / 4.5L Full Flush' }
    ],
    boxContents: [
      '1x Noblestone Ventus Wall-Hung Rimless Ceramic WC Pan',
      '1x Ultra-Slim D-Shape Soft-Close UF Seat & Lid',
      '1x Complete Blind-Installation Concealed Wall Fixing Bolts & Tools',
      '1x Acoustic Insulation Mat for Wall Dampening'
    ],
    description: 'Elevate your bathroom floorplan with the floating Noblestone Ventus WC. Engineered with an innovative rimless rim design and tornado water swirl, it delivers immaculate hygiene with every flush while adding clean, contemporary hotel-suite grandeur to your home.',
    dimensions: '520mm (D) x 360mm (W) x 350mm (H)',
    material: 'Vitreous China Kiln-Fired at 1280°C + Heavy UF Seat',
    warranty: '10-Year Ceramic Glaze Warranty'
  },
  {
    id: 'noblestone-waterfall-basin-mixer',
    title: 'Noblestone Cascade Sculptural Waterfall Basin Mixer Faucet',
    subtitle: 'Architectural Open-Channel Water Ribbon with Diamond-Tested Ceramic Valve',
    category: 'faucets-accessories',
    originalPrice: 120000,
    salePrice: 75000,
    currency: '₦',
    badge: '37% OFF',
    rating: 4.8,
    reviewsCount: 203,
    stockLeft: 12,
    images: [
      'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80'
    ],
    finishes: [
      LUXURY_FINISHES.brushedGold,
      LUXURY_FINISHES.gunmetal,
      LUXURY_FINISHES.matteBlack
    ],
    highlights: [
      'Sculptural Open-Spout Waterfall: Creates a tranquil, splash-free natural cascade of aerated water',
      'Precision Single-Lever Joystick: Effortless single-finger control of temperature and flow volume',
      'Heavyweight 100% Solid Brass: Weighs over 1.6kg for guaranteed durability and zero pipe shake',
      'PVD Multi-Layer Electroplating: Defies corrosion, hard water salt buildup, and daily tarnishing'
    ],
    specs: [
      { label: 'Spout Type', value: 'Open Chute Natural Waterfall' },
      { label: 'Cartridge Life', value: '500,000 cycles (Sedal Spain Ceramic Disc)' },
      { label: 'Hole Size', value: 'Standard 35mm Countertop Pre-Drilled Hole' },
      { label: 'Water Lines', value: '600mm Stainless Braided Hot & Cold Flexible Hoses Included' }
    ],
    boxContents: [
      '1x Noblestone Cascade Solid Brass Waterfall Faucet',
      '2x 600mm 304 Stainless Steel Braided Supply Hoses (1/2")',
      '1x Solid Brass Threaded Mounting Base & Rubber Gasket Set'
    ],
    description: 'A striking statement piece for guest powder rooms and master vanities. The Noblestone Cascade transforms ordinary water flow into a calming ribbon of clear water while delivering precision German-standard thermal mixing.',
    dimensions: 'Height: 185mm | Spout Reach: 135mm | Spout Width: 60mm',
    material: 'High-Purity Cast H59 Brass with PVD Finish',
    warranty: '5-Year Drip-Free Ceramic Disc Warranty'
  }
];

export const CATEGORIES: { id: string; name: string; count: number; icon: string }[] = [
  { id: 'all', name: 'All Fixtures', count: 8, icon: 'Sparkles' },
  { id: 'digital-showers', name: 'Digital Piano Showers', count: 2, icon: 'Droplets' },
  { id: 'smart-toilets', name: 'Intelligent Smart WCs', count: 2, icon: 'Layers' },
  { id: 'waterfall-sinks', name: 'Waterfall Kitchen Sinks', count: 1, icon: 'Flame' },
  { id: 'luxury-bathtubs', name: 'Stone Bathtubs', count: 1, icon: 'RotateCcw' },
  { id: 'vanities-mirrors', name: 'Vanities & Smart Mirrors', count: 1, icon: 'Eye' },
  { id: 'faucets-accessories', name: 'Waterfall Faucets', count: 1, icon: 'Award' },
];
