export const projects = [
  {
    "slug": "qrprofile",
    "title": "QR_Profile",
    "screenshot": "/images/projects/qrprofile/screenshots/01-login.jpg",
    "screenshotFit": "contain",
    "type": "Web Apps",
    "category": "Digital Profiles & QR Management",
    "description": "A full-stack platform for creating branded digital profiles, publishing restaurant menus and business links, generating QR codes, and tracking engagement from one workspace.",
    "tags": [
      "Vue.js",
      "Laravel",
      "PostgreSQL",
      "Docker",
      "Oracle Cloud"
    ],
    "accent": "blue",
    "demoUrl": "https://qrprofile.live/login",
    "githubUrl": null,
    "overview": "I built QR_Profile to connect a printed QR code with an editable digital presence. A restaurant or business owner can create a public profile, add branding and useful links, publish menu content, and share everything through one QR code. The main QR points to the profile page rather than an individual external destination, so links can change without replacing printed material. The owner workspace brings together profile editing, QR exports, engagement statistics, and account settings, while administrators manage account approvals and plan limits.",
    "features": [
      "Custom digital profiles with branding, public slugs, themes, and business links",
      "Restaurant menu image uploads and public menu access",
      "Main profile QR generation and downloadable exports",
      "Analytics for page views, QR scans, and link clicks",
      "Free, Premium, and Pro page and link allowances",
      "Administrator account approval, user management, and plan controls",
      "AI-assisted design and content tools within the profile editor"
    ],
    "stack": [
      {
        "name": "Vue.js 3",
        "category": "Frontend",
        "icon": "fa-brands fa-vuejs",
        "color": "#42b883"
      },
      {
        "name": "Laravel 12",
        "category": "REST API",
        "icon": "fa-brands fa-laravel",
        "color": "#ff2d20"
      },
      {
        "name": "PostgreSQL",
        "category": "Database",
        "icon": "fa-solid fa-database",
        "color": "#336791"
      },
      {
        "name": "Docker",
        "category": "Containers",
        "icon": "fa-brands fa-docker",
        "color": "#1296db"
      },
      {
        "name": "Oracle Cloud",
        "category": "VPS Hosting",
        "icon": "fa-solid fa-cloud",
        "color": "#f04438"
      },
      {
        "name": "Nginx",
        "category": "Web Server",
        "icon": "fa-solid fa-server",
        "color": "#009639"
      },
      {
        "name": "GitHub Actions",
        "category": "CI/CD",
        "icon": "fa-brands fa-github",
        "color": "#64748b"
      },
      {
        "name": "Tailwind CSS",
        "category": "Styling",
        "icon": "fa-solid fa-wind",
        "color": "#38bdf8"
      },
      {
        "name": "Pinia & Axios",
        "category": "State & Requests",
        "icon": "fa-solid fa-layer-group",
        "color": "#d99a21"
      }
    ],
    "process": [
      {
        "title": "A reactive owner workspace",
        "description": "I used Vue 3, Vue Router, Pinia, and Axios for the client application, with Tailwind CSS for the interface. The workspace lets owners move between profile creation, link management, QR tools, and analytics without duplicating business data across screens."
      },
      {
        "title": "A Laravel API and relational data",
        "description": "Laravel handles authentication with Sanctum, request validation, profile and link operations, uploads, analytics, and administrative workflows. PostgreSQL stores the application records, and Eloquent models connect users with their pages and links."
      },
      {
        "title": "A stable QR destination",
        "description": "The QR code resolves to the public profile URL. That page acts as a stable entry point for restaurant menus and business links, while the owner edits its content. The frontend uses a QR-generation library, and the API exposes QR generation and export routes."
      }
    ],
    "deployment": [
      {
        "title": "Package the application with Docker",
        "description": "I separated the Vue frontend, Laravel backend, and PostgreSQL database into services managed with Docker Compose. A multi-stage frontend build produces static assets served by Nginx, which also forwards API and uploaded-file requests to the backend. Database data is kept in persistent storage."
      },
      {
        "title": "Build and verify with GitHub Actions",
        "description": "The repository includes CI jobs for frontend and backend checks, plus a deployment workflow that builds and publishes multi-architecture Docker images. Supporting both AMD64 and ARM64 makes the images compatible with the Oracle server architecture."
      },
      {
        "title": "Deploy on Oracle Cloud",
        "description": "I deployed the application on an Oracle Cloud VPS. The delivery workflow connects to the server over SSH and updates the Docker Compose services using the published images. The public application is available at qrprofile.live; the demo link opens its sign-in page."
      }
    ],
    "gallery": [
      {
        "title": "Sign In",
        "src": "/images/projects/qrprofile/screenshots/01-login.jpg",
        "description": "Account sign-in screen with email and password fields.",
        "fit": "contain"
      },
      {
        "title": "Create an Account",
        "src": "/images/projects/qrprofile/screenshots/02-register.jpg",
        "description": "Registration workflow for a new digital profile owner.",
        "fit": "contain"
      },
      {
        "title": "Plan Selection",
        "src": "/images/projects/qrprofile/screenshots/03-plan-selection.jpg",
        "description": "Free, Premium, and Pro plan options with page and link limits.",
        "fit": "contain"
      },
      {
        "title": "Workspace Dashboard",
        "src": "/images/projects/qrprofile/screenshots/04-dashboard.jpg",
        "description": "An overview of owned pages and plan usage, with quick access to recent profiles.",
        "fit": "contain"
      },
      {
        "title": "Profile Editor",
        "src": "/images/projects/qrprofile/screenshots/05-editor.jpg",
        "description": "A workspace for editing profile details, branding, public links, and menu content.",
        "fit": "contain"
      },
      {
        "title": "QR Code Management",
        "src": "/images/projects/qrprofile/screenshots/06-qr-codes.jpg",
        "description": "QR generation for a public profile. This capture shows a local development URL.",
        "fit": "contain"
      },
      {
        "title": "Profile Analytics",
        "src": "/images/projects/qrprofile/screenshots/07-analytics.jpg",
        "description": "Per-profile page views, QR scans, and link click counts.",
        "fit": "contain"
      },
      {
        "title": "Account Settings",
        "src": "/images/projects/qrprofile/screenshots/08-settings.jpg",
        "description": "A local demonstration account showing account information and role.",
        "fit": "contain"
      },
      {
        "title": "Administration",
        "src": "/images/projects/qrprofile/screenshots/09-admin-management-demo.png",
        "description": "User search, account approval, and plan management. Personal details replaced with demonstration data.",
        "fit": "contain"
      },
      {
        "title": "Public Restaurant Profile",
        "src": "/images/projects/qrprofile/screenshots/10-public-profile.jpg",
        "description": "A mobile restaurant page with menu, social, location, and contact links.",
        "fit": "contain"
      },
      {
        "title": "Restaurant QR Preview",
        "src": "/images/projects/qrprofile/screenshots/11-4-saisons-qr.jpg",
        "description": "The restaurant QR card as shown in the local development workspace.",
        "fit": "contain"
      },
      {
        "title": "Example QR Export",
        "src": "/images/projects/qrprofile/screenshots/4-saisons-qr.png",
        "description": "A sample PNG export from local development. Use the Live Demo button to explore the deployed platform.",
        "fit": "contain"
      }
    ],
    "resources": [
      {
        "title": "Example QR · PNG",
        "href": "/images/projects/qrprofile/screenshots/4-saisons-qr.png"
      },
      {
        "title": "Example QR · SVG",
        "href": "/images/projects/qrprofile/screenshots/4-saisons-qr.svg"
      }
    ]
  },
  {
    "slug": "vitalmind",
    "title": "Vital Mind",
    "screenshot": "/images/projects/vitalmind/screenshots/01-home.png",
    "type": "Web Apps",
    "category": "Cognitive Wellness & Interactive Games",
    "description": "A live educational platform bringing together readable wellness articles, five interactive brain games, and ebook resources for adults 50+ and caregivers.",
    "tags": [
      "Astro",
      "React",
      "Tailwind CSS",
      "Netlify"
    ],
    "accent": "blue",
    "demoUrl": "https://vitalmind.me/",
    "githubUrl": null,
    "overview": "I built Vital Mind to make educational content and daily memory activities easy to discover and use. The site brings articles, games, and digital guides into one consistent experience, with clear navigation, readable typography, large controls, and layouts that adapt to phones and desktops. Visitors can explore topics such as memory habits, focus, sleep, and nutrition, or move straight into a short interactive activity. The project combines content publishing with custom game interfaces, while keeping most pages statically generated for a lightweight browsing experience.",
    "features": [
      "Five interactive games covering number recall, pair matching, visual attention, personal memories, and spatial recall",
      "Article library with categories, author information, reading times, and individual article pages",
      "Ebook catalogue and online preview of the 30-Day Brain Boost Plan",
      "Reusable layouts with readable text and large game controls",
      "Markdown content collections and a Decap CMS configuration for editorial management",
      "Page metadata, canonical URLs, social previews, structured data, and a generated sitemap"
    ],
    "stack": [
      {
        "name": "Astro",
        "category": "Static Pages",
        "icon": "fa-solid fa-rocket",
        "color": "#bc52ee"
      },
      {
        "name": "React",
        "category": "Interactive Games",
        "icon": "fa-brands fa-react",
        "color": "#149eca"
      },
      {
        "name": "Tailwind CSS",
        "category": "Styling",
        "icon": "fa-solid fa-wind",
        "color": "#0891b2"
      },
      {
        "name": "Netlify",
        "category": "Hosting",
        "icon": "fa-solid fa-cloud",
        "color": "#009e93"
      },
      {
        "name": "Markdown",
        "category": "Content",
        "icon": "fa-brands fa-markdown",
        "color": "#64748b"
      },
      {
        "name": "Decap CMS",
        "category": "Editorial Setup",
        "icon": "fa-solid fa-pen-to-square",
        "color": "#c86434"
      }
    ],
    "process": [
      {
        "title": "Content and reusable page structure",
        "description": "I used Astro layouts and reusable components for navigation, article cards, game introductions, and ebook calls to action. Articles and ebook entries live in typed Markdown collections, so content can be maintained without duplicating page markup."
      },
      {
        "title": "Interactive games with React",
        "description": "I built the game interfaces as React components inside Astro pages. This keeps the article and catalogue pages static while adding client-side interaction where games need state, timers, scoring, and user input. The spatial memory game uses dnd-kit for drag-and-drop placement."
      },
      {
        "title": "Readable design and discoverability",
        "description": "Tailwind CSS provides the visual system and responsive layouts. Shared page metadata includes descriptions, canonical URLs, social cards, and website structured data; the Astro sitemap integration generates the public sitemap. The source also includes Decap CMS configuration for articles and ebooks."
      }
    ],
    "deployment": [
      {
        "title": "Build a static production site",
        "description": "The project is configured with Astro static output. Running npm run build generates the production pages and assets in dist, which is also the publish directory declared in netlify.toml."
      },
      {
        "title": "Serve on Netlify with a custom domain",
        "description": "The live website is hosted on Netlify at https://vitalmind.me/ over HTTPS. The deployment configuration defines the build command and publish folder, security response headers, and long-lived caching for the assets directory."
      },
      {
        "title": "Keep publishing maintainable",
        "description": "Content and application code share the same project structure. Article or game changes can be rebuilt into the static output and published through the same Netlify setup, without a separate application server for content pages."
      }
    ],
    "gallery": [
      {
        "title": "Home",
        "src": "/images/projects/vitalmind/screenshots/01-home.png",
        "description": "A clear introduction to the platform, recent articles, and the brain boost ebook preview."
      },
      {
        "title": "Article Library",
        "src": "/images/projects/vitalmind/screenshots/02-blog.png",
        "description": "A Markdown-powered article library with categories, reading times, and illustrated cards."
      },
      {
        "title": "Brain Games",
        "src": "/images/projects/vitalmind/screenshots/03-games.png",
        "description": "A central hub for five interactive memory and attention activities."
      },
      {
        "title": "Daily Number-Span Test",
        "src": "/images/projects/vitalmind/screenshots/04-brain-gym.png",
        "description": "A progressive number recall game with large controls and increasing sequence length."
      },
      {
        "title": "Brain Food Memory Match",
        "src": "/images/projects/vitalmind/screenshots/05-memory-match.png",
        "description": "A card matching game built around healthy food illustrations."
      },
      {
        "title": "The Odd One Out",
        "src": "/images/projects/vitalmind/screenshots/06-odd-one-out.png",
        "description": "A visual scanning challenge that asks players to find the different item."
      },
      {
        "title": "Memory Lane Quiz",
        "src": "/images/projects/vitalmind/screenshots/07-memory-lane.png",
        "description": "A gentle guided activity built around personal milestones and memories."
      },
      {
        "title": "Spatial Memory",
        "src": "/images/projects/vitalmind/screenshots/08-spatial-memory.png",
        "description": "A football pitch game for remembering and restoring player positions."
      },
      {
        "title": "Ebook Library",
        "src": "/images/projects/vitalmind/screenshots/09-ebooks.png",
        "description": "Digital reading resources, including an online preview of the 30-Day Brain Boost Plan."
      },
      {
        "title": "About Vital Mind",
        "src": "/images/projects/vitalmind/screenshots/10-about.png",
        "description": "The purpose, audience, and educational scope of the website."
      }
    ]
  },
  {
    "slug": "bricoletrust",
    "title": "BricoleTrust",
    "screenshot": "/images/projects/bricoletrust/screenshots/01-home.png",
    "type": "Web Apps",
    "category": "Artisan Services Platform",
    "description": "A platform connecting clients with local artisans through service search, professional portfolios, reviews, and service requests.",
    "tags": [
      "Vue.js",
      "Laravel",
      "TailwindCSS",
      "REST API"
    ],
    "accent": "blue",
    "demoUrl": null,
    "githubUrl": "https://github.com/noureddinezn/Bricole_trust",
    "overview": "BricoleTrust helps clients find local professionals by service, city, and district, compare artisan profiles and portfolios, and use ratings and reviews to choose who to contact. Clients can send service requests, publish job posts, and follow their requests. Artisans manage their profiles, showcase completed work, and accept, reject, or complete incoming requests. Administrators oversee users, approve or ban artisan accounts, manage service categories, and review reports. The application combines a Vue 3 frontend with a Laravel REST API.",
    "features": [
      "Search artisans by name, service, city, and district",
      "Public artisan profiles and portfolio galleries",
      "Client ratings, reviews, and artisan leaderboard",
      "Client service requests and public job posts",
      "Artisan profile and incoming request management",
      "Admin user management, artisan approval, and report moderation"
    ],
    "stack": [
      {
        "name": "Vue.js 3",
        "category": "Frontend",
        "icon": "fa-brands fa-vuejs",
        "color": "#42b883"
      },
      {
        "name": "Laravel 12",
        "category": "Backend",
        "icon": "fa-brands fa-laravel",
        "color": "#ff2d20"
      },
      {
        "name": "Tailwind CSS",
        "category": "Styling",
        "icon": "fa-solid fa-wind",
        "color": "#38bdf8"
      },
      {
        "name": "SQLite",
        "category": "Database",
        "icon": "fa-solid fa-database",
        "color": "#336791"
      },
      {
        "name": "Pinia",
        "category": "State Management",
        "icon": "fa-solid fa-layer-group",
        "color": "#d99a21"
      },
      {
        "name": "REST API",
        "category": "Integration",
        "icon": "fa-solid fa-plug",
        "color": "#4285f4"
      }
    ],
    "gallery": [
      {
        "title": "Home",
        "src": "/images/projects/bricoletrust/screenshots/01-home.png",
        "description": "Landing page with location and service search, platform statistics, and popular trades."
      },
      {
        "title": "Find Artisans",
        "src": "/images/projects/bricoletrust/screenshots/02-artisans.png",
        "description": "Artisan directory with filters, approval badges, services, experience, and profile links. Personal photographs replaced for this portfolio."
      },
      {
        "title": "Artisan Details",
        "src": "/images/projects/bricoletrust/screenshots/03-artisan-details.png",
        "description": "Public professional profile with contact details, experience, approval status, portfolio, and reviews. Personal photograph replaced for this portfolio."
      },
      {
        "title": "Artisan Portfolio",
        "src": "/images/projects/bricoletrust/screenshots/04-artisan-portfolio.png",
        "description": "An artisan work showcase with a project description, client comment, and rating."
      },
      {
        "title": "Services",
        "src": "/images/projects/bricoletrust/screenshots/05-services.png",
        "description": "Service categories help clients browse professionals by trade."
      },
      {
        "title": "Job Posts",
        "src": "/images/projects/bricoletrust/screenshots/06-job-posts.png",
        "description": "Public marketplace where clients describe work and artisans discover new requests."
      },
      {
        "title": "Leaderboard",
        "src": "/images/projects/bricoletrust/screenshots/07-leaderboard.png",
        "description": "Artisan ranking with service filters, ratings, and a podium. Personal photographs replaced for this portfolio."
      },
      {
        "title": "Login",
        "src": "/images/projects/bricoletrust/screenshots/08-login.png",
        "description": "Account login for clients, artisans, and administrators."
      },
      {
        "title": "Register",
        "src": "/images/projects/bricoletrust/screenshots/09-register.png",
        "description": "Registration with role selection and artisan city and district fields."
      },
      {
        "title": "My Service Requests",
        "src": "/images/projects/bricoletrust/screenshots/10-client-my-requests.png",
        "description": "Client workspace for following service requests and reviewing completed work. Captured while loading."
      },
      {
        "title": "Create Service Request",
        "src": "/images/projects/bricoletrust/screenshots/11-client-create-service-request.png",
        "description": "Entry point for sending a request to a selected artisan. Captured while loading."
      },
      {
        "title": "Create Job Post",
        "src": "/images/projects/bricoletrust/screenshots/12-client-create-job-post.png",
        "description": "Client workflow for describing a problem and publishing a job post. Captured while loading."
      },
      {
        "title": "My Job Posts",
        "src": "/images/projects/bricoletrust/screenshots/13-client-my-job-posts.png",
        "description": "Client workspace for tracking published jobs and adding a new post. Captured while loading."
      },
      {
        "title": "Artisan Profile",
        "src": "/images/projects/bricoletrust/screenshots/14-artisan-my-profile.png",
        "description": "Artisan workspace with links to profile editing, public profile, and portfolio creation. Captured while loading."
      },
      {
        "title": "Edit Artisan Profile",
        "src": "/images/projects/bricoletrust/screenshots/15-artisan-edit-profile.png",
        "description": "Profile editing workspace for artisan information and services. Captured while loading."
      },
      {
        "title": "Incoming Requests",
        "src": "/images/projects/bricoletrust/screenshots/16-artisan-requests.png",
        "description": "Artisan request queue for accepting, rejecting, and completing client work. Captured while loading."
      },
      {
        "title": "Create Portfolio Item",
        "src": "/images/projects/bricoletrust/screenshots/17-artisan-create-portfolio.png",
        "description": "Portfolio publishing workflow for a project title, image, and description. Captured while loading."
      },
      {
        "title": "Admin Dashboard",
        "src": "/images/projects/bricoletrust/screenshots/18-admin-dashboard.png",
        "description": "Administration workspace for users, artisans, reports, and service categories. Captured while loading."
      },
      {
        "title": "Clients Management",
        "src": "/images/projects/bricoletrust/screenshots/19-admin-clients.png",
        "description": "Client account directory for administrators. Captured while loading."
      },
      {
        "title": "Users Management",
        "src": "/images/projects/bricoletrust/screenshots/20-admin-users.png",
        "description": "User directory with account roles for administrators. Captured while loading."
      },
      {
        "title": "Artisan Moderation",
        "src": "/images/projects/bricoletrust/screenshots/21-admin-moderation.png",
        "description": "Artisan approval and account moderation workspace. Captured while loading."
      },
      {
        "title": "Reports Management",
        "src": "/images/projects/bricoletrust/screenshots/22-admin-reports.png",
        "description": "Client report review and resolution workspace. Captured while loading."
      },
      {
        "title": "Services Administration",
        "src": "/images/projects/bricoletrust/screenshots/23-admin-services.png",
        "description": "Service category administration with an add-service action. Captured while loading."
      }
    ]
  },
  {
    slug: 'pixelquest',
    title: 'PixelQuest',
    screenshot: '/images/projects/pixelquest/previews/01-discover.png',
    screenshotAlt: 'PixelQuest generated catalogue design preview',
    galleryLabel: 'Design Previews',
    galleryNote: 'AI-generated interface concepts illustrating the project features.',
    type: 'Web Apps',
    category: 'Game Catalog',
    description: 'Web app to explore games using RAWG API with search, filters and favorites.',
    tags: ['Vue.js', 'TailwindCSS', 'API'],
    accent: 'violet',
    demoUrl: null,
    githubUrl: 'https://github.com/noureddinezn/Quiz_App',
    overview:
      'PixelQuest is a game catalog project built to practice API integration, search, filtering, and clean UI organization.',
    features: ['Game search', 'Category filtering', 'Favorites workflow', 'Responsive catalog layout'],
    stack: [
      { name: 'Vue.js', category: 'Frontend', icon: 'fa-brands fa-vuejs', color: '#42b883' },
      { name: 'Tailwind CSS', category: 'Styling', icon: 'fa-solid fa-wind', color: '#38bdf8' },
      { name: 'RAWG API', category: 'Game Data', icon: 'fa-solid fa-plug', color: '#8b5cf6' },
    ],
    gallery: [
      { title: 'Discover Games', src: '/images/projects/pixelquest/previews/01-discover.png', description: 'Generated concept of the discovery page, with a featured game and trending titles.' },
      { title: 'Search & Filters', src: '/images/projects/pixelquest/previews/02-search.png', description: 'Generated concept showing game search, genre and platform filters, and sorted results.' },
      { title: 'Game Details', src: '/images/projects/pixelquest/previews/03-game-details.png', description: 'Generated concept of an individual game page with cover artwork, information, and screenshots.' },
      { title: 'Favorites', src: '/images/projects/pixelquest/previews/04-favorites.png', description: 'Generated concept of a personal collection of saved games.' },
    ],
  },
  {
    slug: 'easycoloc',
    title: 'EasyColoc',
    screenshot: '/images/projects/easycoloc/screenshots/01-home.png',
    type: 'Web Apps',
    category: 'Colocation Management',
    description:
      'A modern web application to manage shared expenses between roommates with automatic balance calculation.',
    tags: ['Laravel', 'PostgreSQL', 'Docker', 'TailwindCSS'],
    accent: 'blue',
    demoUrl: null,
    githubUrl: 'https://github.com/noureddinezn/EasyColoc1',
    overview:
      'EasyColoc helps roommates manage shared expenses, split costs, track balances, and settle debts. The goal is to make shared living more transparent, organized, and fair.',
    features: [
      'Add, edit and delete expenses',
      'Automatic debt calculation',
      'Members management',
      'Expense categories',
      'Settlement tracking',
      'Responsive design',
    ],
    stack: [
      { name: 'Laravel', category: 'Backend', icon: 'fa-brands fa-laravel', color: '#ff2d20' },
      { name: 'PostgreSQL', category: 'Database', icon: 'fa-solid fa-database', color: '#336791' },
      { name: 'Docker', category: 'DevOps', icon: 'fa-brands fa-docker', color: '#1296db' },
      { name: 'Tailwind CSS', category: 'Styling', icon: 'fa-solid fa-wind', color: '#38bdf8' },
    ],
    gallery: [
      { title: 'Home', src: '/images/projects/easycoloc/screenshots/01-home.png' },
      { title: 'Login', src: '/images/projects/easycoloc/screenshots/02-login.png' },
      { title: 'Register', src: '/images/projects/easycoloc/screenshots/03-register.png' },
      { title: 'Owner Dashboard', src: '/images/projects/easycoloc/screenshots/04-owner-dashboard.png' },
      { title: 'Colocation Overview', src: '/images/projects/easycoloc/screenshots/05-colocation-show.png' },
      { title: 'Categories', src: '/images/projects/easycoloc/screenshots/06-categories.png' },
      { title: 'Add Expense', src: '/images/projects/easycoloc/screenshots/07-expense-create.png' },
      { title: 'Create Colocation', src: '/images/projects/easycoloc/screenshots/08-colocation-create.png' },
      { title: 'Profile Settings', src: '/images/projects/easycoloc/screenshots/09-profile.png' },
      { title: 'Admin Dashboard', src: '/images/projects/easycoloc/screenshots/10-admin-dashboard.png' },
      { title: 'Admin Users', src: '/images/projects/easycoloc/screenshots/11-admin-users.png' },
      { title: 'Admin Colocations', src: '/images/projects/easycoloc/screenshots/12-admin-colocations.png' },
      { title: 'Admin Expenses', src: '/images/projects/easycoloc/screenshots/13-admin-expenses.png' },
    ],
  },
  {
    slug: 'bibliotheque',
    title: 'Bibliotheque',
    type: 'Web Apps',
    category: 'Library Management',
    description: 'Manage books, users and borrows with an admin dashboard.',
    tags: ['PHP', 'MySQL', 'MVC'],
    accent: 'slate',
    demoUrl: null,
    githubUrl: 'https://github.com/Noureddine203',
    overview:
      'Bibliotheque is a library management project focused on books, users, borrow records, and administrative workflows.',
    features: ['Book management', 'Borrow tracking', 'User management', 'Admin dashboard'],
  },
]
