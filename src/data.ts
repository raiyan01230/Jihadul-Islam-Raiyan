import { Project, Certificate, TimelineEvent, Skill, ServiceItem, PricingCategory } from './types';

export const AVATAR_IMAGE = 'https://uploads.onecompiler.io/44rq7cdfs/1783927809521/Untitled%20design.png';

export const SERVICES: ServiceItem[] = [
  {
    id: 'web-dev',
    title: 'Full-Stack Web Development',
    description: 'Developing high-performance, responsive full-stack applications with elegant state management, rapid load times, and custom database integrations.',
    icon: 'Globe',
    features: ['React & Vite Ecosystem', 'Firebase Realtime & Firestore Integrations', 'PHP & Custom Database Connections', 'Modular Feature Architecture']
  },
  {
    id: 'ui-design',
    title: 'Premium UI/UX Design',
    description: 'Crafting visually stunning user interfaces utilizing advanced Tailwind styling, custom glassmorphic properties, mesh gradients, and cohesive font pairings.',
    icon: 'Layers',
    features: ['Liquid & Frosted Glass Elements', 'Custom Aurora Light Rays', 'Bento Grid System Layouts', 'Responsive Mobile-First Precision']
  },
  {
    id: 'ai-development',
    title: 'AI Tooling & Integration',
    description: 'Seamlessly building server-side AI integrations using the latest Google Gemini models, structured schemas, function calling, and real-time assistants.',
    icon: 'Sparkles',
    features: ['Gemini 3.5 Flash Implementations', 'Context-Aware AI Assistants', 'Notice & Content Auto-Drafting', 'Smart Insights & FAQ Engines']
  },
  {
    id: 'maintenance',
    title: 'App Performance & Maintenance',
    description: 'Optimizing existing web systems, squashing complex memory leaks, and engineering high-fidelity rendering routines to maximize Core Web Vitals.',
    icon: 'Wrench',
    features: ['Asset Caching & Image CDNs', 'JS/CSS Bundle Minification', 'Dynamic Routing & Code Splitting', 'Offline Service Worker support']
  },
  {
    id: 'e-commerce',
    title: 'E-Commerce Solutions',
    description: 'Engineering dynamic storefronts complete with seamless shopping carts, automated discount calculations, custom checkout workflows, and payment portals.',
    icon: 'ShoppingCart',
    features: ['Multi-currency Support', 'Interactive Cart Drawers', 'Bkash & Nagad Integration Ready', 'Dynamic Product Filtering & Sorting']
  },
  {
    id: 'restaurant-systems',
    title: 'Restaurant Ordering & Menu Hubs',
    description: 'Crafting responsive digital interactive menu cards and online table reservation engines specialized for modern bistros and culinary ventures.',
    icon: 'Utensils',
    features: ['Categorized Digital Menus', 'Real-time Table Booking Status', 'Automated Email Confirmation', 'Responsive Mobile-First Viewports']
  },
  {
    id: 'landing-pages',
    title: 'Conversion-Focused Landing Pages',
    description: 'Designing highly targeted single-page layouts designed to convert visitors into customers with lightning fast load speeds and crisp typography.',
    icon: 'Laptop',
    features: ['Scroll-triggered Animations', 'Lead Capture Form Integrations', 'Optimized Call to Action Sections', 'A/B Test Ready Grid Modules']
  },
  {
    id: 'firebase-modeling',
    title: 'Firebase Serverless Architecture',
    description: 'Modeling robust document patterns in Cloud Firestore and real-time state listeners in Firebase Realtime Database with high security standards.',
    icon: 'Database',
    features: ['NoSQL Relational Document Mapping', 'Granular Security Rules Generation', 'Dynamic Connection Outage Handling', 'Offline Data Caching Support']
  },
  {
    id: 'seo-speed',
    title: 'SEO Tuning & Speed Loading',
    description: 'Auditing page loads and implementing strict optimizations to achieve 95+ lighthouse scores on both mobile and desktop viewports.',
    icon: 'Zap',
    features: ['Next-Gen WebP Compression', 'Asynchronous Script Offloading', 'Strict Asset Preloading', 'Cumulative Layout Shift (CLS) Tweaks']
  },
  {
    id: 'custom-api',
    title: 'Custom API Engineering & Webhooks',
    description: 'Building secure Express server endpoints, parsing custom JSON requests, and orchestrating robust webhooks for clean data pipelines.',
    icon: 'Code',
    features: ['Strict Request Schemas', 'JWT & Token Authentication', 'Cross-Origin Resource Sharing (CORS) setup', 'Automated Error Handling Middleware']
  },
  {
    id: 'pwa-apps',
    title: 'Progressive Web Apps (PWA)',
    description: 'Upgrading standard websites into installable applets running on mobile homescreens complete with offline support and standalone launch properties.',
    icon: 'Smartphone',
    features: ['Service Worker Cache Storage', 'Manifest JSON Configurations', 'Offline Custom Greeting Cards', 'Install Banner Dialog Hooks']
  },
  {
    id: 'lms-education',
    title: 'Educational & LMS Portals',
    description: 'Designing modular student and teacher platforms to manage class logs, grade assignments, publish notices, and view digital credentials.',
    icon: 'BookOpen',
    features: ['Interactive Marksheet Creators', 'Dynamic Student Noticeboards', 'Role-Based Access Dashboards', 'PDF Certificate Generators']
  },
  {
    id: 'chat-systems',
    title: 'Real-time Live Chat Suites',
    description: 'Embedding dynamic interactive chat bubbles and messaging hubs backed by live listeners for micro-second instant customer engagement.',
    icon: 'MessageSquare',
    features: ['Typing State Indicators', 'Persistent Message Caching', 'Offline Queue Sync Engines', 'Automated Welcome AI Bot Responses']
  },
  {
    id: 'cms-customization',
    title: 'CMS Customization & Blogging',
    description: 'Building custom Headless CMS layouts or dynamic blogs backed by highly performant static-site compilation systems for content writers.',
    icon: 'FileText',
    features: ['Markdown-to-HTML Parsers', 'Dynamic Reading Progress Bars', 'Newsletter Subscription Boxes', 'Social Media Meta Tag Injection']
  },
  {
    id: 'security-hardening',
    title: 'Security Audits & Vulnerability Guards',
    description: 'Protecting frontends and serverless endpoints from XSS, SQL/NoSQL Injections, and cross-site scripting vulnerabilities using secure standards.',
    icon: 'ShieldCheck',
    features: ['Input Sanitization Libraries', 'Content Security Policies (CSP)', 'Authentication Guard Routines', 'Secure Storage Configurations']
  },
  {
    id: 'c-programming',
    title: 'Custom C Algorithmic Engineering',
    description: 'Writing low-level, high-efficiency C program scripts, performance-optimized sorting filters, and deep-level hardware data parsing structures.',
    icon: 'Terminal',
    features: ['Advanced Pointer Manipulations', 'Static & Dynamic Memory Buffers', 'Algorithmic Optimization Cycles', 'Platform-Independent Standard Compilations']
  },
  {
    id: 'cloud-hosting',
    title: 'Cloud Hosting Deployment & DevOps',
    description: 'Configuring and pushing application packages cleanly to Firebase Hosting, Cloud Run containers, Vercel, or custom Node.js environments.',
    icon: 'Server',
    features: ['Vite Build Pipeline Optimization', 'Domain Redirects & SSL Setup', 'Nginx Reverse Proxy Configurations', 'Automatic Build Artifact Cleanups']
  },
  {
    id: 'data-scraping',
    title: 'Automated Web Scraping Pipelines',
    description: 'Building clean, robust scripts to extract structured informational data from complex, dynamic web pages and converting them to JSON formats.',
    icon: 'HardDrive',
    features: ['Dynamic Page Render Solvers', 'Structured JSON Export Schemas', 'IP Rotation & Rate-Limit Bystanders', 'Automated Cron-Job Execution Configs']
  },
  {
    id: 'social-integration',
    title: 'Social Platform & Analytics Linking',
    description: 'Linking detailed client tracking tags, Google Analytics 4 tracking scripts, and interactive social sharing badges into client portals.',
    icon: 'Share2',
    features: ['Google Analytics G-ID bindings', 'Facebook Pixel Conversions', 'Dynamic OpenGraph Previews', 'Custom Share Intent Listeners']
  },
  {
    id: 'wellness-software',
    title: 'Spiritual Wellness & Focus Apps',
    description: 'Designing custom wellness, focus-promoting, or distraction-blocking screen tools utilizing smart notifications and audio meditation rings.',
    icon: 'Sparkles',
    features: ['Daily Quote Rotation Engines', 'Eye-Strain Active Alert Triggers', 'Custom Ambient Synth Oscillators', 'Spiritual Goal Checklists']
  }
];

export const PRICING_CATEGORIES: PricingCategory[] = [
  {
    id: 'landing-page-packages',
    title: 'Single-Page Landing Pages',
    description: 'High-conversion, modern single-page websites designed for products, portfolios, launches, or lead captures. Beautiful interactive layouts optimized for lightning-speed mobile rendering.',
    priceRange: '1,000 Tk - 2,000 Tk',
    plans: [
      {
        name: 'Basic Landing Page',
        price: '1,000',
        priceLabel: 'Tk',
        delivery: '3 Days',
        revisions: '2 Revisions',
        description: 'Single clean modern section with key business information, essential contact info, and fully fluid responsive structure.',
        features: [
          '1 Custom Web Section',
          'Responsive Mobile-First UI',
          'Modern Typography & Spacing',
          'Contact Details Card',
          'Social Profile Links'
        ]
      },
      {
        name: 'Standard Landing Page',
        price: '1,300',
        priceLabel: 'Tk',
        delivery: '2 Days',
        revisions: '3 Revisions',
        description: 'A polished, multi-component layout featuring responsive sections, smooth entering transitions, and contact form integration.',
        features: [
          'Up to 3 Custom Web Sections',
          'Tailwind Motion Animations',
          'Functional Contact Form',
          'Detailed Feature/Service Grid',
          'Secured Asset Caching'
        ]
      },
      {
        name: 'Premium Landing Page',
        price: '1,700',
        priceLabel: 'Tk',
        delivery: '1-2 Days',
        revisions: 'Unlimited Revisions',
        description: 'Full-scope conversion engine including high-end bento grids, Google Analytics setup, and beautiful custom scroll interactions.',
        features: [
          'Up to 5 Fully Rich Sections',
          'Custom Brand Identity Color Pairing',
          'Interactive FAQ Accordions',
          'Google Analytics 4 Bindings',
          'WhatsApp & Call Direct Intents',
          'High SEO Meta Optimization'
        ],
        isPopular: true
      },
      {
        name: 'Ultimate Bento & Analytics Suite',
        price: '2,000',
        priceLabel: 'Tk',
        delivery: '1 Day',
        revisions: 'Unlimited Revisions',
        description: 'The absolute peak of single-page craftsmanship. Highly interactive, tailored layouts with robust client tracking, custom micro-interactions, and priority support.',
        features: [
          'Unlimited Custom Sections',
          'Custom Interactive Bento-Box Layout',
          'Full-Fidelity Framer-style Motion FX',
          'Local/Offline Caching Setup',
          'Instant Google Page Speed Indexing',
          'Premium SVG Custom Accents',
          '1-Month Post-Launch Hotfixes'
        ]
      }
    ]
  },
  {
    id: 'restaurant-packages',
    title: 'Restaurant & Culinary Portals',
    description: 'Stunning interactive online hubs for food joints, cafes, fine diners, or fast-food stores. Features beautiful dynamic digital menu grids, table reservation alerts, and social proof tools.',
    priceRange: '3,500 Tk - 14,500 Tk',
    plans: [
      {
        name: 'Starter Menu Display',
        price: '3,500',
        priceLabel: 'Tk',
        delivery: '4 Days',
        revisions: '3 Revisions',
        description: 'A beautiful single-page responsive digital menu card display showing food items with high-fidelity images, descriptions, prices, and direct location navigation maps.',
        features: [
          'Beautiful Static Digital Menu Card',
          'Categorized Menu Tabs',
          'Location Map & Hours Integration',
          'Call to Order Direct Link',
          'Secure Asset Optimizations'
        ]
      },
      {
        name: 'Bistro Interactive Hub',
        price: '6,500',
        priceLabel: 'Tk',
        delivery: '3 Days',
        revisions: '5 Revisions',
        description: 'An upgraded interactive platform with filtering menus, social customer reviews, and a responsive table reservation inquiry form.',
        features: [
          'Multi-Page Menu View with Tags',
          'Interactive Menu Categories (Veg/Non-Veg filters)',
          'Reservation & Booking Inquiry Form',
          'Social Review & Testimonials Widget',
          'Custom Gallery & Ambient Background'
        ]
      },
      {
        name: 'Premium Order & Reservation Suite',
        price: '10,500',
        priceLabel: 'Tk',
        delivery: '2 Days',
        revisions: 'Unlimited Revisions',
        description: 'A complete custom website incorporating live menu item searches, real-time table availability tracking, and automated email confirmation triggers.',
        features: [
          'Live Instant Menu Search Input',
          'Comprehensive Table Booking Console',
          'Instant Email Notifications on Reservation',
          'Firebase Firestore Backed Admin Dashboard',
          'Beautiful Ambient Food Promos Banner',
          'Custom Menu Tagging (Hot, New, Special)'
        ],
        isPopular: true
      },
      {
        name: 'Enterprise Culinary Order Platform',
        price: '14,500',
        priceLabel: 'Tk',
        delivery: '2-3 Days',
        revisions: 'Unlimited Revisions',
        description: 'A top-tier full-stack restaurant suite. Includes a complete digital ordering checkout experience (cart processing, bKash instructions), administrative menu editor, and analytical charts.',
        features: [
          'Full digital cart & checkout pipeline',
          'WhatsApp/Bkash Automated Order Invoice Generator',
          'Admin Console (Add, Edit, Remove menu items)',
          'Realtime Reservation Alerts with DB Sync',
          'Comprehensive Local SEO Local-Pack Optimization',
          'Interactive customer analytics charts',
          '6-Months Priority Security & Maintenance Updates'
        ]
      }
    ]
  },
  {
    id: 'e-commerce-packages',
    title: 'E-Commerce storefronts',
    description: 'Enterprise-grade online shops optimized for conversions, rapid page-loads, and secure processing. Equipped with detailed carts, multi-category catalogs, discount codes, and local payment pathways.',
    priceRange: '5,000 Tk - 19,000 Tk',
    plans: [
      {
        name: 'Mini E-Shop Starter',
        price: '5,000',
        priceLabel: 'Tk',
        delivery: '5 Days',
        revisions: '4 Revisions',
        description: 'Ideal for small retail startups or single-product campaigns. Includes a neat shopping cart and checkout order routing directly to WhatsApp or bKash.',
        features: [
          'Sleek catalog supporting up to 15 products',
          'Fully Functional Shopping Cart Overlay',
          'Checkout Form with WhatsApp/SMS Order Dispatch',
          'Responsive Product Detail popups',
          'Clean, Minimalist Checkout UI'
        ]
      },
      {
        name: 'Dynamic Retail Shop',
        price: '9,500',
        priceLabel: 'Tk',
        delivery: '4 Days',
        revisions: 'Unlimited Revisions',
        description: 'A robust e-commerce storefront supporting rich features like product category filters, interactive search boards, discount voucher managers, and live inventories.',
        features: [
          'Catalog supporting up to 60 products',
          'Multi-Category Filtering & Live Text Search',
          'Promo Code / Discount Coupon Engine',
          'Realtime Stock Level Indicator Alerts',
          'Customer Account Wishlist (Local Cache)',
          'Interactive Order Email Notifications'
        ]
      },
      {
        name: 'Premium Checkout & Automated Portal',
        price: '14,000',
        priceLabel: 'Tk',
        delivery: '3 Days',
        revisions: 'Unlimited Revisions',
        description: 'Our most sought-after e-commerce engine. Incorporates secure automated mobile wallets checkout API routing, admin panel to track sales, and detailed receipt generation.',
        features: [
          'Catalog supporting up to 200 products',
          'Automated bKash, Nagad & SSLCommerz Sandbox integration',
          'Firebase-backed Admin Sales Dashboard',
          'Auto-Generated PDF Purchase Receipts',
          'Dynamic Customer Review Rating Systems',
          'Highly Optimized Product Image CDN Setup'
        ],
        isPopular: true
      },
      {
        name: 'Enterprise Hyper-Scale Marketplace',
        price: '19,000',
        priceLabel: 'Tk',
        delivery: '3-5 Days',
        revisions: 'Unlimited Revisions',
        description: 'The ultimate bespoke marketplace solution. Fully serverless full-stack portal featuring live analytics charts, multi-vendor support, secure authentication, and infinite product scaling.',
        features: [
          'Infinite Product & Collection Scales',
          'Secure Firebase Authentication (Email/Google signup)',
          'Comprehensive Admin CRM (Customer, Order, & Stock tracker)',
          'Interactive Sales Revenue charts using Recharts',
          'Advanced Algorithmic Search with instant filtering',
          'Custom Progressive Web App (PWA) installation',
          '1-Year Enterprise Grade Security, Backups, and Dev SLA'
        ]
      }
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'umrah-savings',
    title: 'Umrah Savings Planner',
    description: 'A comprehensive visual savings tracking dashboard to help families plan, set targets, and mathematically achieve their goals for the spiritual Umrah journey.',
    longDescription: 'Umrah Savings Planner is a dedicated client-side web application incorporating detailed budgeting, cost estimates, progressive savings graphs, and milestone animations. Styled with a serene emerald-gold Islamic color palette to elevate the spiritual journey.',
    category: 'islamic',
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80', // Beautiful Kaaba/Mecca visual representation
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Tailwind CSS', 'Framer Motion'],
    liveUrl: 'https://raiyan01230.github.io/Umrah-Savings/',
    featured: true,
    stats: { stars: 12, forks: 4, users: 180 }
  },
  {
    id: 'lower-your-gaze',
    title: 'Lower Your Gaze Reminder',
    description: 'An interactive modern workspace utility reminding active web developers and users to guard their gaze, promoting spiritual focus, screen-time moderation, and heart mindfulness.',
    longDescription: 'Lower Your Gaze is an innovative, custom-themed web applet offering timely alerts, interactive quotes from Islamic teachings, eye strain exercises, and structured daily mindfulness logs to shield spiritual focus in the digital age.',
    category: 'islamic',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80', // Abstract visual representing focus/lens guarding
    tech: ['React', 'Tailwind CSS', 'Vite', 'Motion', 'Web Audio API'],
    liveUrl: 'https://raiyan01230.github.io/loweryouregaze/',
    featured: true,
    stats: { stars: 25, forks: 8, users: 340 }
  },
  {
    id: 'way-of-jannah',
    title: 'The Way of Jannah Portal',
    description: 'An advanced, AI-powered interactive spiritual growth center featuring real-time prayer checklists, Quran reflection journals, and Jannah goal planning.',
    longDescription: 'The Way of Jannah serves as a fully integrated digital companion. Utilizing client-side state caching, intelligent reminder engines, and interactive modules to support users on their daily path of spiritual purification.',
    category: 'ai',
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80', // Serene nature pathway
    tech: ['React', 'Gemini AI API', 'Tailwind CSS', 'Firebase DB', 'Vite'],
    liveUrl: 'https://the-way-of-jannah.ai.studio',
    featured: true,
    stats: { stars: 45, forks: 15, users: 890 }
  },
  {
    id: 'raiyan-clothing-elite',
    title: 'Raiyan Clothing Elite',
    description: 'A luxurious fashion e-commerce storefront featuring high-end apparel collections, interactive catalog filters, and sleek shopping cart integration.',
    longDescription: 'Raiyan Clothing Elite is an exclusive online fashion destination designed with high-contrast typography, interactive product viewports, responsive filter drawers, and seamless ordering pipelines.',
    category: 'web',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Tailwind CSS', 'Responsive UI'],
    liveUrl: 'https://monirahman703-bot.github.io/Raiyan-clothing-Elite/',
    featured: true,
    stats: { stars: 38, forks: 11, users: 520 }
  },
  {
    id: 'shm-gadget',
    title: 'SHM Gadget Store',
    description: 'A cutting-edge tech gadgets and electronics marketplace with interactive product showcases, specs comparisons, and responsive ordering workflows.',
    longDescription: 'SHM Gadget Store is an advanced electronic storefront providing users with dynamic gadget spec comparisons, instant stock indicators, responsive cart drawers, and direct contact ordering links.',
    category: 'web',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap', 'E-Commerce'],
    liveUrl: 'https://raiyanusa20-dotcom.github.io/shm-gadget1/',
    featured: true,
    stats: { stars: 31, forks: 9, users: 410 }
  }
];

export const CERTIFICATES: Certificate[] = [
  {
    id: 'cert-programming',
    title: 'C Programming Certificate of Achievement',
    issuer: 'Sololearn / Training Partner',
    issueDate: 'October 2024',
    credentialUrl: 'https://uploads.onecompiler.io/44rq7cdfs/1780938941967/C%20Programming%20Certificate_page-0001.jpg',
    imageUrl: 'https://uploads.onecompiler.io/44rq7cdfs/1780938941967/C%20Programming%20Certificate_page-0001.jpg',
    skills: ['C Programming', 'Memory Management', 'Algorithms', 'Pointers']
  },
  {
    id: 'cert-webdesign',
    title: 'Responsive Web Design Certificate',
    issuer: 'freeCodeCamp',
    issueDate: 'January 2025',
    credentialUrl: 'https://uploads.onecompiler.io/44rq7cdfs/1780938746782/freecodecamp.PDF_page-0001.jpg',
    imageUrl: 'https://uploads.onecompiler.io/44rq7cdfs/1780938746782/freecodecamp.PDF_page-0001.jpg',
    skills: ['HTML5', 'CSS3', 'Responsive Design', 'Flexbox', 'CSS Grid', 'Typography']
  },
  {
    id: 'cert-fullstack',
    title: 'Full-Stack Software Development Specialization',
    issuer: 'The Little Flower School Tech Hub',
    issueDate: 'February 2025',
    credentialUrl: 'https://uploads.onecompiler.io/44rq7cdfs/1780938538039/certificate_page-0001.jpg',
    imageUrl: 'https://uploads.onecompiler.io/44rq7cdfs/1780938538039/certificate_page-0001.jpg',
    skills: ['JavaScript', 'Firebase', 'PHP', 'Database Architecture', 'Security Engineering']
  }
];

export const TIMELINE: TimelineEvent[] = [
  {
    id: 't3',
    year: '2024 - Present',
    role: 'Full-Stack Developer & Programmer',
    company: 'Self-Employed / Independent Builder',
    description: 'Mastered full-stack React ecosystems, Firebase Firestore, and real-time data streaming. Engineered several responsive applets including the Umrah Savings Planner and Lower Your Gaze reminder, incorporating client-side state caching and performance audits.',
    type: 'experience'
  },
  {
    id: 't2',
    year: '2023 - 2024',
    role: 'Algorithmic C Programming & Computer Science Basics',
    company: 'SoloLearn Academy & Self-Learning',
    description: 'Dived deeply into low-level algorithms, data structures, pointer memory maps, and performance optimization in C. Earned Sololearn Certificate of Achievement with high honors.',
    type: 'education'
  },
  {
    id: 't1',
    year: '2022 - 2023',
    role: 'Responsive Frontend Design Specialization',
    company: 'freeCodeCamp Developer Path',
    description: 'Built beautiful responsive websites, establishing solid mastery over semantic HTML5, CSS3 layout engines (Flexbox, CSS Grid), typographic principles, and clean user experience designs.',
    type: 'education'
  }
];

export const SKILLS: Skill[] = [
  // Frontend
  { name: 'React & Vite', category: 'Frontend', level: 92, icon: 'Atom' },
  { name: 'JavaScript (ES6+)', category: 'Frontend', level: 95, icon: 'FileCode' },
  { name: 'Tailwind CSS', category: 'Frontend', level: 98, icon: 'Wind' },
  { name: 'HTML5 & CSS3', category: 'Frontend', level: 99, icon: 'Layout' },
  { name: 'Framer Motion', category: 'Frontend', level: 88, icon: 'Sparkles' },

  // Backend & DB
  { name: 'Firebase Firestore', category: 'Backend', level: 90, icon: 'Database' },
  { name: 'Firebase Realtime DB', category: 'Backend', level: 88, icon: 'Flame' },
  { name: 'PHP Scripting', category: 'Backend', level: 82, icon: 'Server' },
  { name: 'C Programming', category: 'Backend', level: 85, icon: 'Cpu' },

  // AI & Tools
  { name: 'Gemini AI SDK', category: 'AI & Tools', level: 92, icon: 'BrainCircuit' },
  { name: 'Firebase Cloud Functions', category: 'Database/Cloud', level: 85, icon: 'Terminal' },
  { name: 'Insforge & Testing Tools', category: 'AI & Tools', level: 80, icon: 'Activity' },
  { name: 'Git & GitHub Workflows', category: 'Other', level: 90, icon: 'Github' }
];
