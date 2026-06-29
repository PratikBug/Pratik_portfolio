export type Project = {
  name: string
  meta: string
  description: string
  stack: string
  metric: string
  metricLabel: string
  link?: string
  featured?: boolean
}

export const PROJECTS: Project[] = [
  {
    name: 'Scan QR Payment',
    meta: 'Paytm Money · Frontend · 2025',
    description:
      'Users could not complete UPI transactions across apps from the Paytm Money web flow. I built a Scan QR payment experience that lets users pay from any UPI app, closing a major usability gap and unlocking smooth payments for millions of users.',
    stack: 'React.js · Axios · UPI · REST APIs',
    metric: 'Millions',
    metricLabel: 'users enabled',
    link: 'https://www.paytmmoney.com/stocks/funds',
    featured: true,
  },
  {
    name: 'MTF Calculator',
    meta: 'Paytm Money · Frontend · 2025',
    description:
      'Traders needed to model leverage-based returns before committing capital. I designed and built a fully responsive Margin Trading Facility calculator with React Hooks and JSON-driven APIs that computes leverage returns, profit/loss, and stock accountability in real time — plus its landing page with no-auth dynamic rendering.',
    stack: 'React Hooks · JSON APIs · Axios · Responsive',
    metric: 'Real-time',
    metricLabel: 'leverage & P&L',
    link: 'https://www.paytmmoney.com/mtf/calculator',
    featured: true,
  },
  {
    name: 'DevPilot',
    meta: 'Personal · AI Agent · 2026',
    description:
      'Code review and frontend debugging are slow and inconsistent across teams. DevPilot is an AI agent that reviews pull requests across GitHub and Bitbucket, performs frontend debugging, explains root cause, suggests fixes, and posts comments directly on the PR.',
    stack: 'Next.js 15 · TypeScript · Vercel AI SDK · Prisma · GitHub/Bitbucket APIs',
    metric: 'GitHub + Bitbucket',
    metricLabel: 'automated PR review',
    link: 'https://github.com/PratikBug/DevPilot',
    featured: true,
  },
  {
    name: 'pratik_ai_eval',
    meta: 'Personal · Eval Suite · 2026',
    description:
      'A workspace to demonstrate coding-agent capabilities end to end. I built an evaluation suite of 24 task deliverables spanning repo discovery, greenfield builds, a FastAPI expense service, an observability stack, and GitHub CI — polyglot across TypeScript, Python, and Rust.',
    stack: 'TypeScript · Python · FastAPI · Rust · Docker · Prometheus / Grafana',
    metric: '24 tasks',
    metricLabel: 'polyglot eval suite',
    link: 'https://github.com/PratikBug/pratik_ai_eval',
    featured: true,
  },
  {
    name: 'PML_Polygot',
    meta: 'Personal · Polyglot Service · 2026',
    description:
      'A polyglot service pair demonstrating cross-language integration. A FastAPI currency-conversion backend paired with a Node.js CLI client and a web demo, backed by 24+ automated tests and a one-command verification script.',
    stack: 'FastAPI · Python · Node.js CLI · Rust · Docker · pytest',
    metric: '24+ tests',
    metricLabel: 'FastAPI + Node',
    link: 'https://github.com/PratikBug/PML_Polygot',
    featured: true,
  },
  {
    name: 'MEDApp',
    meta: 'NIRMAN Hackathon · Mobile · 2024',
    description:
      'People struggle to identify medicines and their correct dosage. I built an app that scans any medicine image and returns full details — composition, dosage requirements, and real-time reminders — so users can take the right medication safely.',
    stack: 'Kotlin · Android Studio · Python',
    metric: 'Scan → Info',
    metricLabel: 'image recognition',
  },
  {
    name: 'MyAnime',
    meta: 'Personal · Full-stack · 2023',
    description:
      'A full-stack anime catalogue with authenticated user accounts. I built the frontend, a Node.js backend with database operations, and secure JWT-based authentication and authorization.',
    stack: 'Next.js · Node.js · MongoDB · JWT',
    metric: 'Full-stack',
    metricLabel: 'auth + data',
  },
]

export const FEATURED_PROJECTS = PROJECTS.filter((p) => p.featured)
