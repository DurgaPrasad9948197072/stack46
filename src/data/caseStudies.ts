/* Shared case-study data: powers the pinned Case Studies strip on the home
   page and the /work/[slug] detail pages. */

export interface CaseStudy {
  slug: string
  n: string
  title: string
  tag: string
  result: string
  img: string
  accent: string
  client: string
  industry: string
  year: string
  duration: string
  services: string[]
  stack: string[]
  challenge: string
  solution: string
  outcomes: string[]
  kpis: { value: string; label: string }[]
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: 'logiflow', n: '01', title: 'LogiFlow', tag: 'FinTech · Supply Chain',
    result: '25% operating cost cut across an 800-vehicle network.',
    img: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=900&q=80', accent: '#2AACE2',
    client: 'LogiFlow Ltd', industry: 'FinTech / Logistics', year: '2025', duration: '14 weeks',
    services: ['Platform Engineering', 'Data Pipelines', 'Fleet Telematics', 'DevOps'],
    stack: ['Next.js', 'Node.js', 'PostgreSQL', 'Kafka', 'AWS', 'Kubernetes'],
    challenge: 'LogiFlow ran an 800-vehicle freight network on a patchwork of spreadsheets, a legacy dispatch system and three disconnected telematics vendors. Dispatchers had no live view of the fleet, invoicing lagged deliveries by up to nine days, and fuel spend was untraceable at route level.',
    solution: 'We built a unified operations platform: a real-time telematics ingestion pipeline on Kafka streaming every vehicle position and fuel event into a single ledger, a dispatcher console with live route optimisation, and automated invoicing triggered by proof-of-delivery. The legacy system was strangled route-by-route with zero downtime over fourteen weeks.',
    outcomes: [
      'Live positions and fuel telemetry for all 800 vehicles in one console',
      'Invoicing latency cut from 9 days to under 4 hours',
      'Route-level fuel analytics identified 11% recoverable waste',
      'Dispatcher headcount redeployed — no layoffs, 2× throughput',
    ],
    kpis: [
      { value: '25%', label: 'Operating cost reduction' },
      { value: '800+', label: 'Vehicles tracked live' },
      { value: '4 hrs', label: 'Invoice turnaround (was 9 days)' },
    ],
  },
  {
    slug: 'nexusai', n: '02', title: 'NexusAI', tag: 'SaaS · AI Platform',
    result: '3× data throughput. 50TB migrated in one weekend, zero loss.',
    img: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=900&q=80', accent: '#FFC845',
    client: 'NexusAI Inc', industry: 'SaaS / AI & ML', year: '2025', duration: '10 weeks',
    services: ['Data Engineering', 'ML Infrastructure', 'Cloud Migration', 'SRE'],
    stack: ['Python', 'PyTorch', 'Airflow', 'GCP', 'BigQuery', 'Terraform'],
    challenge: 'NexusAI\'s training pipeline was buckling: 50TB of customer data sat in a self-managed cluster at 96% capacity, nightly ETL jobs overran into business hours, and every model retrain meant a day of engineer babysitting. Growth was gated by infrastructure, not ideas.',
    solution: 'We re-architected the entire data plane on GCP — BigQuery as the warehouse, Airflow-orchestrated pipelines with automatic backfill, and GPU training jobs that spin up on demand and tear down on completion. The 50TB migration ran over a single weekend behind a dual-write shim, verified checksum-by-checksum.',
    outcomes: [
      '50TB migrated in 61 hours with zero data loss',
      'Nightly ETL window cut from 11 hours to 3.5 hours',
      'Model retrains fully automated — no engineer supervision',
      'Infrastructure cost per training run down 42%',
    ],
    kpis: [
      { value: '3×', label: 'Data throughput' },
      { value: '50TB', label: 'Migrated in one weekend' },
      { value: '0', label: 'Records lost' },
    ],
  },
  {
    slug: 'retailhub', n: '03', title: 'RetailHub', tag: 'E-Commerce · Mobile',
    result: '4.9★ App Store rating and 2M DAU within ninety days.',
    img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900&q=80', accent: '#22c55e',
    client: 'RetailHub Group', industry: 'E-Commerce / Retail', year: '2024', duration: '16 weeks',
    services: ['Mobile Development', 'Design System', 'Checkout Optimisation', 'App Store Launch'],
    stack: ['React Native', 'TypeScript', 'GraphQL', 'Stripe', 'Firebase', 'Fastlane'],
    challenge: 'RetailHub\'s web-wrapped mobile app scored 2.3 stars: checkout took eleven taps, product images loaded in seconds not milliseconds, and cart abandonment on mobile ran 84%. A holiday-season deadline gave us sixteen weeks to replace it end-to-end.',
    solution: 'We shipped a ground-up React Native app with a native-feel design system: 60fps product browsing, offline-first cart sync, one-tap Stripe checkout with saved payment methods, and personalised home feeds served over GraphQL. CI shipped builds to both stores daily via Fastlane from week two.',
    outcomes: [
      'Checkout reduced from 11 taps to 3',
      'Mobile cart abandonment down from 84% to 51%',
      '2M daily active users within 90 days of launch',
      'Featured by the App Store in Shopping — twice',
    ],
    kpis: [
      { value: '4.9★', label: 'App Store rating (was 2.3)' },
      { value: '2M', label: 'Daily active users in month 3' },
      { value: '-33pt', label: 'Cart abandonment' },
    ],
  },
  {
    slug: 'medtrack', n: '04', title: 'MedTrack', tag: 'HealthTech · Compliance',
    result: 'HIPAA-compliant mobile platform shipped in ten weeks.',
    img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=900&q=80', accent: '#a855f7',
    client: 'MedTrack Health', industry: 'HealthTech', year: '2024', duration: '10 weeks',
    services: ['Mobile Development', 'Compliance Engineering', 'Security Audit', 'Cloud Architecture'],
    stack: ['Flutter', 'Node.js', 'PostgreSQL', 'AWS', 'Vanta', 'Twilio'],
    challenge: 'MedTrack needed a patient-engagement app — appointment scheduling, secure messaging, medication reminders — but every previous vendor had stalled on HIPAA: PHI encryption, audit trails, BAA-compliant infrastructure. Their Series A depended on a compliant launch inside a quarter.',
    solution: 'Compliance was designed in, not bolted on: field-level PHI encryption, immutable audit logging on every data access, BAA-covered AWS services only, and SSO with automatic session expiry. We ran the penetration test and compliance audit in parallel with development, not after it — and shipped in ten weeks.',
    outcomes: [
      'Passed independent HIPAA audit on first attempt',
      'Secure messaging adopted by 78% of patients in month one',
      'Missed-appointment rate down 31% via smart reminders',
      'SOC 2 Type I achieved on the same infrastructure',
    ],
    kpis: [
      { value: '10 wks', label: 'Idea to compliant launch' },
      { value: '100%', label: 'First-attempt audit pass' },
      { value: '-31%', label: 'Missed appointments' },
    ],
  },
  {
    slug: 'cloudbase', n: '05', title: 'CloudBase', tag: 'Enterprise · Platform',
    result: 'Legacy monolith to microservices with zero downtime.',
    img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=900&q=80', accent: '#06b6d4',
    client: 'CloudBase Systems', industry: 'Enterprise Software', year: '2025', duration: '20 weeks',
    services: ['Legacy Modernisation', 'Microservices', 'DevOps', 'Observability'],
    stack: ['Go', 'gRPC', 'Kubernetes', 'Istio', 'Prometheus', 'Azure'],
    challenge: 'A 1.2-million-line Java monolith served 86 enterprise clients — and deploys had become quarterly events with all-hands war rooms. A single bad merge could take the platform down for every customer. The board mandate: modernise without a single minute of scheduled downtime.',
    solution: 'We applied the strangler-fig pattern with surgical discipline: domain-by-domain extraction into Go microservices behind an Istio service mesh, dual-running each domain until parity was proven by traffic mirroring, then cutting over silently. Twenty weeks, forty-one services, and no customer noticed a thing.',
    outcomes: [
      'Deploy cadence from quarterly to 30+ per week',
      'Zero minutes of downtime across the entire migration',
      'P95 API latency improved 58% on extracted services',
      'New-engineer onboarding from 6 weeks to 8 days',
    ],
    kpis: [
      { value: '0 min', label: 'Downtime during migration' },
      { value: '41', label: 'Services extracted' },
      { value: '30+/wk', label: 'Deploys (was quarterly)' },
    ],
  },
  {
    slug: 'eduspark', n: '06', title: 'EduSpark', tag: 'EdTech · Web Platform',
    result: '400k students onboarded in the first enrolment season.',
    img: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=900&q=80', accent: '#4DD0C4',
    client: 'EduSpark Education', industry: 'EdTech', year: '2024', duration: '12 weeks',
    services: ['Web Platform', 'Load Engineering', 'Design System', 'Accessibility'],
    stack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Redis', 'Vercel', 'Cloudflare'],
    challenge: 'EduSpark won a national enrolment contract — then reality hit: 400,000 students would register in a three-week window, with traffic spiking 40× on results day. Their existing platform fell over at 2,000 concurrent users, and accessibility compliance (WCAG 2.2 AA) was a contractual requirement.',
    solution: 'We rebuilt the enrolment flow on Next.js with edge-rendered pages, Redis-backed queueing for write bursts, and a waiting-room pattern that kept the experience calm under 40× spikes. Every component in the new design system shipped WCAG 2.2 AA compliant, verified with automated and manual audits.',
    outcomes: [
      '412,000 students enrolled in the first season',
      'Survived a 40× results-day traffic spike at 99.98% uptime',
      'Full WCAG 2.2 AA compliance — zero contractual penalties',
      'Median enrolment completion time: 6 minutes',
    ],
    kpis: [
      { value: '400k+', label: 'Students onboarded' },
      { value: '40×', label: 'Peak traffic absorbed' },
      { value: 'AA', label: 'WCAG 2.2 compliance' },
    ],
  },
  {
    slug: 'paynest', n: '07', title: 'PayNest', tag: 'FinTech · Payments',
    result: 'PCI-DSS payment rails processing £2M/day at 99.99% uptime.',
    img: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=900&q=80', accent: '#f97316',
    client: 'PayNest Financial', industry: 'FinTech / Payments', year: '2025', duration: '18 weeks',
    services: ['Payments Engineering', 'PCI-DSS Compliance', 'Ledger Design', 'SRE'],
    stack: ['Rust', 'PostgreSQL', 'Kafka', 'AWS', 'Datadog', 'Stripe Connect'],
    challenge: 'PayNest was scaling marketplace payouts through a third-party aggregator that took 2.9% of every transaction and settled in T+3 days. Building their own rails meant PCI-DSS Level 1, double-entry ledger correctness, and five-nines-adjacent reliability — territory where most startups fail audits for a year.',
    solution: 'We engineered the money path in Rust: an append-only double-entry ledger with invariant checking on every write, idempotent payment orchestration over Kafka, and tokenised card data that never touches PayNest servers. PCI-DSS scope was minimised by design, and the Level 1 audit passed first time.',
    outcomes: [
      'PCI-DSS Level 1 certified on first audit',
      '£2M/day processed at 99.99% measured uptime',
      'Settlement improved from T+3 to T+1',
      'Per-transaction cost down 71% vs the aggregator',
    ],
    kpis: [
      { value: '£2M', label: 'Processed per day' },
      { value: '99.99%', label: 'Uptime' },
      { value: '-71%', label: 'Transaction cost' },
    ],
  },
  {
    slug: 'terragrid', n: '08', title: 'TerraGrid', tag: 'Energy · IoT',
    result: '12,000 smart meters streaming live telemetry, 40% grid savings.',
    img: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=900&q=80', accent: '#ec4899',
    client: 'TerraGrid Energy', industry: 'Energy / IoT', year: '2025', duration: '15 weeks',
    services: ['IoT Platform', 'Time-Series Engineering', 'Grid Analytics', 'Edge Computing'],
    stack: ['Go', 'MQTT', 'TimescaleDB', 'Grafana', 'AWS IoT', 'React'],
    challenge: 'TerraGrid deployed 12,000 smart meters across three regional grids — but the vendor cloud they relied on sampled readings every 15 minutes, far too coarse to catch the demand spikes that forced expensive peak-plant activation. They needed second-level telemetry and real-time load balancing.',
    solution: 'We built an MQTT ingestion layer terminating at regional edge gateways, streaming one-second meter telemetry into TimescaleDB. On top: a live grid console with demand forecasting that flags spikes minutes before they materialise, letting operators shift load instead of spinning up peak plants.',
    outcomes: [
      '12,000 meters streaming at 1-second resolution',
      'Peak-plant activations down 40% in the first quarter',
      'Demand forecast accuracy within 3% at 15-minute horizon',
      'Grid console adopted as the primary NOC screen in all 3 regions',
    ],
    kpis: [
      { value: '12,000', label: 'Meters streaming live' },
      { value: '40%', label: 'Grid cost savings' },
      { value: '1 sec', label: 'Telemetry resolution' },
    ],
  },
]

export const getCaseStudy = (slug: string) =>
  CASE_STUDIES.find(c => c.slug === slug)
