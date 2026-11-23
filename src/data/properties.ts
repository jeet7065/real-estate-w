import { Property, GalleryItem, StatItem } from '../types'

export const PROPERTIES: Property[] = [
  {
    id: 'the-meridian',
    name: 'The Meridian',
    tagline: 'Iconic Commercial Skyscraper with Grade-A LEED Platinum Workspaces',
    category: 'Commercial',
    location: 'Golf Course Road, DLF Phase 5',
    city: 'Gurugram',
    priceFrom: '₹18.5 Cr',
    area: '450,000 sq.ft.',
    status: 'Ready for Fit-Out',
    architect: 'Foster & Partners Collaboration',
    completionYear: '2025',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85', // glass skyscraper facade
    exteriorImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=85', // towering glass facade
    interiorImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=85', // luxury modern open executive office
    heroImage: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1920&q=85',
    description: 'Standing as a monument to commercial prestige, The Meridian elevates corporate headquarters into an art form. Boasting 42 storeys of column-free floor plates, acoustic triple-glazed low-E facades, and private sky decks overlooking the Aravali range.',
    highlights: [
      '42 Storeys with 3.8m clear ceiling heights',
      'LEED Platinum & WELL Gold pre-certified',
      'High-speed destination-controlled Schindler elevators',
      'Biophilic indoor sky gardens every 6 floors'
    ],
    specs: [
      { label: 'Total Built-up Area', value: '1.2M sq.ft.' },
      { label: 'Floor Plate Size', value: '28,000 – 34,000 sq.ft.' },
      { label: 'Energy Rating', value: 'LEED Platinum' },
      { label: 'Car Parking', value: '4 Basements + Multi-level' }
    ],
    features: [
      'Triple-height grand entrance lobby with Italian Travertine',
      'Touchless biometric and facial recognition access',
      'Advanced MERV-14 air filtration with IAQ monitors',
      'Rooftop helipad and executive boardroom lounge',
      'Integrated gourmet dining and curated retail galleria'
    ]
  },
  {
    id: 'the-aurelia',
    name: 'The Aurelia',
    tagline: 'Ultra-Luxury Sky Mansions with 360-Degree Panoramic Views',
    category: 'Residential',
    location: 'Sector 42, Golf Course Extension',
    city: 'Gurugram',
    priceFrom: '₹14.2 Cr',
    area: '6,200 – 11,500 sq.ft.',
    status: 'Pre-Launch',
    architect: 'Studio K Architecture & Interiors',
    completionYear: '2026',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
    exteriorImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1920&q=85',
    interiorImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1920&q=85',
    heroImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=85',
    description: 'An exclusive collection of 48 bespoke sky residences designed for connoisseurs of architectural restraint and opulence. Featuring wrap-around infinity balconies, private plunge pools, and dual private elevator access for complete discretion.',
    highlights: [
      'Limited edition 4 & 5 bedroom sky villas',
      'Private cantilevered infinity plunge pools',
      'Italian Boffi kitchens with Gaggenau appliances',
      '24/7 White-glove concierge and butler service'
    ],
    specs: [
      { label: 'Residence Sizes', value: '6,200 to 11,500 sq.ft.' },
      { label: 'Ceiling Height', value: '12.5 ft. finished clear' },
      { label: 'Elevators', value: '2 Private + 1 Service / Unit' },
      { label: 'Clubhouse Area', value: '45,000 sq.ft. private club' }
    ],
    features: [
      'Temperature-controlled indoor Olympic lap pool',
      'Private wine cellar and cigar lounge',
      'Screening room with Dolby Atmos acoustics',
      'Holistic wellness spa with cryotherapy chamber'
    ]
  },
  {
    id: 'the-grand-boulevard',
    name: 'The Grand Boulevard',
    tagline: 'High-Street Luxury Retail and Culinary Promenade',
    category: 'Retail',
    location: 'Cyber City Precinct',
    city: 'Gurugram',
    priceFrom: '₹9.8 Cr',
    area: '320,000 sq.ft.',
    status: 'Under Development',
    architect: 'Morphogenesis & Landscape Atelier',
    completionYear: '2025',
    image: 'https://images.unsplash.com/photo-1555636222-cae831e670b3?auto=format&fit=crop&w=1600&q=85',
    exteriorImage: 'https://images.unsplash.com/photo-1519999482648-25049ddd37b1?auto=format&fit=crop&w=1920&q=85',
    interiorImage: 'https://images.unsplash.com/photo-1567449303078-57ad995bd301?auto=format&fit=crop&w=1920&q=85',
    heroImage: 'https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?auto=format&fit=crop&w=1920&q=85',
    description: 'An open-air luxury retail and dining amphitheatre crafted with natural sandstones, lush water cascades, and double-height storefront glass. A cultural epicenter for world-class fashion houses, fine dining establishments, and experiential art.',
    highlights: [
      'Double-height 7.5m retail storefronts',
      'Climate-cooled outdoor promenades',
      'Michelin-starred restaurant flagship terraces',
      'Subterranean valet and concierge hub'
    ],
    specs: [
      { label: 'Retail Frontage', value: '800 meters continuous' },
      { label: 'Store Units', value: '64 curated luxury brands' },
      { label: 'Footfall Projection', value: '45,000+ daily HNIs' },
      { label: 'Landscape Area', value: '4.5 acres manicured plaza' }
    ],
    features: [
      'Interactive kinetic water fountains',
      'Art installations curated by leading international galleries',
      'Valet with private VIP lounge',
      'Integrated EV supercharging infrastructure'
    ]
  },
  {
    id: 'the-horizon',
    name: 'The Horizon',
    tagline: 'Next-Generation Grade-A Tech & Innovation Campus',
    category: 'Commercial',
    location: 'Sohna Road IT Corridor',
    city: 'Gurugram',
    priceFrom: '₹12.0 Cr',
    area: '850,000 sq.ft.',
    status: 'Completed',
    architect: 'HOK Architecture International',
    completionYear: '2024',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1600&q=85',
    exteriorImage: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1920&q=85',
    interiorImage: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1920&q=85',
    heroImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=85',
    description: 'Engineered for technology leaders and multinational corporations, The Horizon combines hyper-efficient structural grids with carbon-neutral operations. Featuring adaptive smart lighting, solar glass facades, and modular team workspaces.',
    highlights: [
      'Zero Net Carbon operational efficiency',
      'Integrated AI building management system',
      'Collab hubs, auditoriums, and rooftop running tracks',
      'Direct metro connectivity via air-conditioned skywalk'
    ],
    specs: [
      { label: 'Total Campus Size', value: '18 Acres' },
      { label: 'Towers', value: '3 Interconnected Towers' },
      { label: 'Floor Efficiency', value: '84% super-efficient core' },
      { label: 'Connectivity', value: 'Triple-redundant dark fiber' }
    ],
    features: [
      '500-seat amphitheatre and executive event center',
      '2.5-acre central reflection lake with amphitheatre',
      'Gymnasium, padel tennis courts, and wellness zone',
      'Automated robotic delivery and package logistics'
    ]
  },
  {
    id: 'the-solaris-penthouse',
    name: 'The Solaris Penthouses',
    tagline: 'Triplex Crown Residences Atop Cyber Park',
    category: 'Residential',
    location: 'Sector 29 Luxury Enclave',
    city: 'Gurugram',
    priceFrom: '₹22.0 Cr',
    area: '9,800 sq.ft.',
    status: 'Under Development',
    architect: 'Zaha Hadid Design Studio Alumni',
    completionYear: '2026',
    image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1600&q=85',
    exteriorImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1920&q=85',
    interiorImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1920&q=85',
    heroImage: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1920&q=85',
    description: 'The pinnacle of vertical luxury. A limited collection of three bespoke triplex penthouses featuring private rooftop glass observatory pools, cantilevered entertaining terraces, and internal glass elevator tubes.',
    highlights: [
      'Triple-height living room with 24ft curtain walls',
      'Private heated glass bottom pool overhanging skyline',
      'Custom marble sculptural staircase',
      'Master suite occupying an entire floor with dual salons'
    ],
    specs: [
      { label: 'Floors', value: 'Levels 48, 49 & 50' },
      { label: 'Terrace Space', value: '3,200 sq.ft. private deck' },
      { label: 'Security', value: 'Biometric biometric airlock' },
      { label: 'Parking', value: '6 Dedicated EV bays' }
    ],
    features: [
      'Smart home automation powered by Crestron & Lutron',
      'Wine cellar holding up to 1,200 vintage bottles',
      'Private spa suite with sauna and sensory rain shower',
      'Direct private express lift from basement to triplex'
    ]
  },
  {
    id: 'the-sanctuary',
    name: 'The Sanctuary Reserve',
    tagline: 'Low-Density Eco-Architectural Mixed Habitat',
    category: 'Mixed-Use',
    location: 'Southern Peripheral Expressway',
    city: 'Gurugram',
    priceFrom: '₹11.5 Cr',
    area: '520,000 sq.ft.',
    status: 'Under Development',
    architect: 'WOHA & Biophilic Design Group',
    completionYear: '2026',
    image: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1600&q=85',
    exteriorImage: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1920&q=85',
    interiorImage: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1920&q=85',
    heroImage: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1920&q=85',
    description: 'Where urban dynamism harmonizes with untamed tranquility. A biophilic ecosystem combining boutique executive offices, branded residences, and organic horticultural pavilions surrounded by 20,000 indigenous trees.',
    highlights: [
      '80% open landscaped green envelope',
      'Zero-discharge water reclamation park',
      'Curated artisanal wellness promenade',
      'Bespoke co-working club with botanical courtyards'
    ],
    specs: [
      { label: 'Land Area', value: '25 Contiguous Acres' },
      { label: 'Green Cover', value: '82% Native Flora' },
      { label: 'Solar Generation', value: '1.8 MW On-site' },
      { label: 'Certification', value: 'GRIHA 5-Star Certified' }
    ],
    features: [
      'Organic farm-to-table culinary pavilions',
      '1.2 km illuminated forest jogging trail',
      'Mindfulness pavilion and outdoor yoga decks',
      'Eco-luxury retreat facilities for executives'
    ]
  }
]

export const STATS: StatItem[] = [
  {
    number: 25,
    suffix: '+',
    label: 'Landmark Developments',
    description: 'Award-winning commercial towers and ultra-prime residences delivered with precision.'
  },
  {
    number: 12,
    suffix: '+',
    label: 'Prime City Locations',
    description: 'Strategically positioned in high-yield, high-growth metropolitan growth corridors.'
  },
  {
    number: 500,
    suffix: '+',
    label: 'Commercial Spaces',
    description: 'Home to Fortune 500 headquarters, global institutions, and innovative enterprises.'
  },
  {
    number: 4,
    suffix: '.8M',
    label: 'Sq. Ft. Built & Designed',
    description: 'Every square foot engineered to the highest architectural and environmental benchmarks.'
  }
]

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'The Meridian Sky Glaze',
    category: 'Exterior',
    property: 'The Meridian',
    location: 'Golf Course Road, Gurugram',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=85',
    aspect: 'tall',
    dimensions: '42 Storeys Glass Curtain'
  },
  {
    id: 'gal-2',
    title: 'The Aurelia Executive Suite',
    category: 'Interior',
    property: 'The Aurelia',
    location: 'DLF Phase 5',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85',
    aspect: 'wide',
    dimensions: 'Floor-to-Ceiling Aravali Views'
  },
  {
    id: 'gal-3',
    title: 'Triple-Height Grand Lobby',
    category: 'Lobby',
    property: 'The Horizon',
    location: 'Cyber City',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=85',
    aspect: 'square',
    dimensions: 'Italian Travertine & Bronze'
  },
  {
    id: 'gal-4',
    title: 'Boulevard Promenade & Cascades',
    category: 'Landscape',
    property: 'The Grand Boulevard',
    location: 'High-Street District',
    image: 'https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?auto=format&fit=crop&w=1600&q=85',
    aspect: 'wide',
    dimensions: '4.5 Acres Curated Water Plaza'
  },
  {
    id: 'gal-5',
    title: 'Acoustic Facade Fin Geometry',
    category: 'Facade',
    property: 'The Meridian',
    location: 'Exterior Detail',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1400&q=85',
    aspect: 'tall',
    dimensions: 'Parametric Louver System'
  },
  {
    id: 'gal-6',
    title: 'The Solaris Sky Terrace',
    category: 'Interior',
    property: 'The Solaris Penthouses',
    location: 'Sector 29',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85',
    aspect: 'square',
    dimensions: 'Cantilevered Glass Pool Deck'
  }
]

export const WHY_CHOOSE_US = [
  {
    number: '01',
    title: 'Prime Locations',
    description: 'We secure the most coveted, strategic parcels across high-growth corridors, ensuring peerless connectivity, prestige, and generational capital appreciation.',
    metric: '100% Core Metro Locations'
  },
  {
    number: '02',
    title: 'Thoughtful Architecture',
    description: 'Collaborating with world-renowned studios, each structure is conceived as an enduring sculpture that optimizes daylight, natural airflow, and spatial intelligence.',
    metric: 'Global Architectural Laureates'
  },
  {
    number: '03',
    title: 'Future-Ready Infrastructure',
    description: 'Engineered with LEED Platinum standards, smart grid automation, redundant high-bandwidth fiber, and biophilic air purification systems.',
    metric: 'LEED & WELL Gold Certified'
  },
  {
    number: '04',
    title: 'Exceptional Experience',
    description: 'From bespoke white-glove concierge services to seamless facility management, every touchpoint delivers effortless sophistication and personalized care.',
    metric: '24/7 Dedicated Client Relations'
  }
]

export const DRONE_REVEAL_STAGES = [
  {
    stage: 1,
    title: 'Aerial Skyscraper Perspective',
    subtitle: 'Drone vantage point over Gurugram’s premier commercial corridor',
    description: 'A monolithic 42-storey glass tower rising with architectural confidence, capturing the golden afternoon light across its low-E acoustic facade.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=85',
    badge: 'Altitude: 180m • Exterior Perspective'
  },
  {
    stage: 2,
    title: 'Descent to Prime Corporate Suite',
    subtitle: 'Approaching the Level 32 executive floor plate',
    description: 'The camera descends smoothly along the vertical bronze-accented mullions, centering directly upon the corner executive boardroom and sky garden.',
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186f5f7?auto=format&fit=crop&w=1920&q=85',
    badge: 'Altitude: 110m • Floor 32 Approach'
  },
  {
    stage: 3,
    title: 'Selective Facade Transparency',
    subtitle: 'Glass curtain dissolves into full transparency',
    description: 'Through an engineered dissolution, the exterior architectural envelope reveals the warm oak, custom marble, and expansive daylight within.',
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1920&q=85',
    badge: 'X-Ray Facade Dissolve • Structural Core Preserved'
  },
  {
    stage: 4,
    title: 'Interior Executive Sky Sanctuary',
    subtitle: 'Step inside the finished corporate headquarters',
    description: 'Step into the column-free 3.8-meter ceiling volume featuring Italian furniture, private boardroom, biophilic planting, and unobstructed skyline horizons.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=85',
    badge: 'Level 32 Interior • 34,000 sq.ft. Fitted Suite'
  }
]
