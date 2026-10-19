export interface CookerImage {
  id: string;
  filename: string;
  url: string;
  title: string;
  description: string;
  category: 'overview' | 'components' | 'controls' | 'burners' | 'cleaning' | 'lifestyle' | 'dimensions';
  badge: string;
}

export const COOKER_IMAGES: CookerImage[] = [
  {
    id: 'hero-persp',
    filename: 'He848b3e8bcc24b1e9c9d64ea2c2c4a96q.jpg',
    url: '/images/He848b3e8bcc24b1e9c9d64ea2c2c4a96q.jpg',
    title: 'Double-Burner Cooker Overview',
    description: 'Clean perspective view highlighting the black tempered glass cooktop, dual burners with foldable pan supports, digital display, and rotary knobs.',
    category: 'overview',
    badge: 'Overview'
  },
  {
    id: 'parts-diagram',
    filename: '11bb45a3-5549-4fdd-9bc1-7023275b3a13.png',
    url: '/images/11bb45a3-5549-4fdd-9bc1-7023275b3a13.png',
    title: 'Complete Component Guide',
    description: 'Pan Support / Pot Stand, Left Burner, Right Burner, Premium Glass Surface, Control Knobs, Digital Display, Non-Slip Feet, and Safety Guide.',
    category: 'components',
    badge: 'Components'
  },
  {
    id: 'flip-burner-cleaning',
    filename: 'H8aa2ffb08c2d478c9b27763db19e43fc0.jpeg',
    url: '/images/H8aa2ffb08c2d478c9b27763db19e43fc0.jpeg',
    title: 'Flip-Top Burner For Easier Cleaning',
    description: 'Both burners flip up 90 degrees on sturdy hinges, letting you wipe away burnt-on residue, soup spills, and cooking oil effortlessly.',
    category: 'cleaning',
    badge: '90° Flip-Up'
  },
  {
    id: 'cooktop-front',
    filename: 'Hf3fea0e1fc4e46d4ac33b8a45f21785ex.jpg',
    url: '/images/Hf3fea0e1fc4e46d4ac33b8a45f21785ex.jpg',
    title: 'Frontal Glass Cooktop View',
    description: 'Sleek black reflective tempered glass surface with symmetrical dual burner placement and intuitive center controls.',
    category: 'overview',
    badge: 'Design'
  },
  {
    id: 'smart-controls',
    filename: 'H6452756b08ba47fea9e256a8e5ff398eo.jpg',
    url: '/images/H6452756b08ba47fea9e256a8e5ff398eo.jpg',
    title: 'Smart Control Interface',
    description: 'Precise power levels with digital display, battery level monitor, and brushed metallic rotary control knobs.',
    category: 'controls',
    badge: 'Controls'
  },
  {
    id: 'display-detail',
    filename: 'Hf2133c8b4c394a919ba6426a8448fce4z.jpg',
    url: '/images/Hf2133c8b4c394a919ba6426a8448fce4z.jpg',
    title: 'Digital Display & Rotary Knobs',
    description: 'Close-up of the center digital timer panel, 4-bar battery gauge, and MIN/MAX flame adjustment markings.',
    category: 'controls',
    badge: 'Display'
  },
  {
    id: 'cleaning-demo',
    filename: 'Hc8520771f71b451d96ae3caee5e55e9a5.jpg',
    url: '/images/Hc8520771f71b451d96ae3caee5e55e9a5.jpg',
    title: 'Effortless Cleaning Surface',
    description: 'Smooth toughened glass surface allows quick, single-wipe cleaning to keep your kitchen spotless after preparing meals.',
    category: 'cleaning',
    badge: 'Easy Clean'
  },
  {
    id: 'burner-cap-distribution',
    filename: 'Hb703478da96c4d06ac439666db478fb5s.jpg',
    url: '/images/Hb703478da96c4d06ac439666db478fb5s.jpg',
    title: 'Burner Cap & Heat Distribution',
    description: 'Engineered circular multi-ring burner cap geometry designed for uniform vortex heat distribution across cookware bottoms.',
    category: 'burners',
    badge: 'Heat Distribution'
  },
  {
    id: 'right-burner-detail',
    filename: 'Hb9c8e9ca38f44abbbdb7f174825a70a1y.jpg',
    url: '/images/Hb9c8e9ca38f44abbbdb7f174825a70a1y.jpg',
    title: 'Multi-Jet Burner Crown',
    description: 'Close-up of the heavy-duty burner crown featuring 8 flame ports, center burner core, and solid pot support stand.',
    category: 'burners',
    badge: 'Burner Head'
  },
  {
    id: 'left-burner-detail',
    filename: 'H8787481c4acb4f6090aac0b922281e25m.jpg',
    url: '/images/H8787481c4acb4f6090aac0b922281e25m.jpg',
    title: 'Left Burner & Ignition Probe',
    description: 'Detailed view of the left burner assembly, pot support, electronic pulse ignition needle, and flame-failure thermocouple.',
    category: 'burners',
    badge: 'Burner Detail'
  },
  {
    id: 'precision-engineering',
    filename: 'Hccaf409c308a41e4a507c495dab8ffb6u.jpg',
    url: '/images/Hccaf409c308a41e4a507c495dab8ffb6u.jpg',
    title: 'Precision Engineering & Brass Nozzles',
    description: 'Solid brass gas nozzles and optimized airflow chamber built for reliable, instant ignition and blue flame efficiency.',
    category: 'burners',
    badge: 'Engineering'
  },
  {
    id: 'kitchen-marble-lifestyle',
    filename: 'Hebaafe7677f84003942e806feac863ad1.jpg',
    url: '/images/Hebaafe7677f84003942e806feac863ad1.jpg',
    title: 'Modern Kitchen Countertop Setup',
    description: 'Sleek low-profile cooker installed on luxury marble countertop, blending seamlessly into modern luxury kitchen designs.',
    category: 'lifestyle',
    badge: 'Modern Kitchen'
  },
  {
    id: 'chef-lifestyle',
    filename: 'H133eb5b944574834be14201900e73e0bZ.jpg',
    url: '/images/H133eb5b944574834be14201900e73e0bZ.jpg',
    title: 'Wok & Everyday Cookware Support',
    description: 'Stable pot supports accommodate heavy woks, cast iron skillets, soup pots, and frying pans for convenient daily cooking.',
    category: 'lifestyle',
    badge: 'Cookware'
  },
  {
    id: 'top-down-view',
    filename: 'Hdb9c0c43cbc4438d8d77325727a4474dz.jpg',
    url: '/images/Hdb9c0c43cbc4438d8d77325727a4474dz.jpg',
    title: 'Top-Down Layout View',
    description: 'Balanced symmetrical layout showing burner spacing, center digital display, and safety caution badge.',
    category: 'overview',
    badge: 'Top View'
  },
  {
    id: 'install-dimensions',
    filename: 'H137f07cc70424452ada679ac752fcf43l.jpg',
    url: '/images/H137f07cc70424452ada679ac752fcf43l.jpg',
    title: 'Dimensions & Installation Size',
    description: 'Product Dimensions: 750mm × 450mm. Recommended Cutout Size: 650mm × 350mm (or Tabletop with rubber feet).',
    category: 'dimensions',
    badge: 'Dimensions'
  }
];

export const COOKER_PACKAGES = [
  {
    quantity: 1,
    unitPrice: 170000,
    originalPrice: 250000,
    totalPrice: 170000,
    savings: 80000,
    label: '1 COOKER SET',
    badge: 'STANDARD PACK',
    savingsNote: 'Save ₦80,000 Off Regular Price',
    isPopular: false
  },
  {
    quantity: 2,
    unitPrice: 165000,
    originalPrice: 500000,
    totalPrice: 330000,
    savings: 170000,
    label: '2 COOKER SETS',
    badge: '★ MOST POPULAR • ₦165,000 EACH',
    savingsNote: 'Extra ₦10,000 Combo Discount (Save ₦170,000 Total)',
    isPopular: true
  },
  {
    quantity: 3,
    unitPrice: 160000,
    originalPrice: 750000,
    totalPrice: 480000,
    savings: 270000,
    label: '3 COOKER SETS',
    badge: 'FAMILY & RENTAL PACK',
    savingsNote: '₦160,000 each (Save ₦270,000 Total)',
    isPopular: false
  },
  {
    quantity: 4,
    unitPrice: 150000,
    originalPrice: 1000000,
    totalPrice: 600000,
    savings: 400000,
    label: '4 PIECES & ABOVE',
    badge: 'WHOLESALE / ESTATE PACK',
    savingsNote: 'Best Value: ₦150,000 each (Save ₦400,000 Total)',
    isPopular: false
  }
];

export const COOKER_SPECS = [
  { label: 'Cooker Type', value: 'Double-Burner Flip-Up Gas Hob (Tabletop & Built-in Dual Use)' },
  { label: 'Surface Material', value: '8mm Heavy-Duty Shatter-Proof Toughened Crystal Tempered Glass' },
  { label: 'Burner Mechanism', value: '90° Vertical Hinged Flip-Up Burners for 1-Wipe Cleaning' },
  { label: 'Flame Technology', value: 'Vortex Multi-Jet High Efficiency Pure Blue Flame (5.2kW)' },
  { label: 'Center Controls', value: 'Smart Digital LED Countdown Timer (0-99 min) + 4-Bar Battery Gauge' },
  { label: 'Ignition Type', value: 'Instant Electronic Continuous Pulse Ignition' },
  { label: 'Safety Protection', value: 'Automatic Thermocouple Flame-Failure Gas Cut-off Device' },
  { label: 'Gas Compatibility', value: 'LPG (Liquid Petroleum Gas / Cylinder Gas)' },
  { label: 'Cooker Dimensions', value: '750mm (Length) × 450mm (Width) × 90mm (Height)' },
  { label: 'Cutout Dimensions', value: '630mm - 650mm × 330mm - 350mm (Built-in) or Tabletop Use' },
  { label: 'Warranty', value: '2-Year Full Manufacturer Warranty + 5-Year Glass Guarantee' }
];

export const COOKER_FAQS = [
  {
    question: 'WHAT ARE THE PRICES FOR EACH QUANTITY?',
    answer: 'For the Premium 2-Burner Glass Cooker: 1 piece is ₦170,000; 2 pieces are ₦165,000 each (₦330,000 total); 3 pieces are ₦160,000 each (₦480,000 total); 4+ pieces are ₦150,000 each (₦600,000 for 4). Free insured delivery applies to all orders.'
  },
  {
    question: 'DO YOU OFFER PAYMENT ON DELIVERY NATIONWIDE?',
    answer: 'Yes! Payment on delivery is available nationwide across all 36 Nigerian states. You do not need to make any upfront online payment to place your order. Simply inspect the cooker upon arrival at your doorstep before completing payment via Cash, Mobile Transfer, or POS.'
  },
  {
    question: 'CAN THE 2-BURNER COOKER BE USED ON A TABLETOP OR BUILT-IN?',
    answer: 'Both! The cooker comes with 4 pre-attached anti-slip rubber feet for instant countertop/tabletop use without any cutting. It can also be dropped seamlessly into an existing kitchen countertop cutout (standard cutout dimension: 650 × 350 mm).'
  },
  {
    question: 'HOW DOES THE 90° FLIP-UP BURNER FEATURE WORK?',
    answer: 'Both the left and right burner heads are mounted on heavy-duty aerospace-grade metal hinges. Whenever cooking spills, oil, or soup overflow occurs, you simply tilt the burners upward 90 degrees and wipe the tempered glass clean in a single pass with a damp microfiber cloth.'
  },
  {
    question: 'WHAT DOES THE DIGITAL CENTER DISPLAY SHOW?',
    answer: 'The center console features an ultra-bright digital LED display that shows an adjustable cooking countdown timer (up to 99 minutes) and a 4-bar battery life indicator so you always know your ignition power status.'
  },
  {
    question: 'WHAT SAFETY FEATURES ARE INCLUDED?',
    answer: 'The cooker is equipped with an integrated thermocouple flame-out protection system. If wind blows out the flame or water boils over, the safety valve automatically shuts off the gas supply within 3 seconds to prevent gas leaks.'
  },
  {
    question: 'HOW FAST IS NATIONWIDE DELIVERY?',
    answer: 'Orders within Lagos and Abuja arrive within 24 to 48 hours. Orders to all other states (Port Harcourt, Ibadan, Kano, Benin, Enugu, etc.) arrive within 48 to 72 hours via our direct insured courier network.'
  }
];
