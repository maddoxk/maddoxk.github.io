export type ProjectCategory = 'simulation' | 'algorithm' | 'dataviz'

export type Project = {
  slug: string
  title: string
  tagline: string
  category: ProjectCategory
  thumb: string
  href: string
  accent: 'cyan' | 'magenta' | 'violet' | 'amber'
  tags?: string[]
}

export const PROJECTS: Project[] = [
  {
    slug: 'gravity',
    title: 'Gravity Simulator',
    tagline: 'AP Computer Science final — Newton\'s law of universal gravitation in a 3D engine.',
    category: 'simulation',
    thumb: '/images/gravsim.jpg',
    href: '/projects/gravity',
    accent: 'cyan',
    tags: ['Physics', '3D Engine', 'Java'],
  },
  {
    slug: 'elevator',
    title: 'Elevator Simulation',
    tagline: 'Finite state machine modeling elevators with collaborative design iteration.',
    category: 'simulation',
    thumb: '/images/elevatorfsm.jpg',
    href: '/projects/elevator',
    accent: 'magenta',
    tags: ['FSM', 'Simulation', 'OOP'],
  },
  {
    slug: 'huffman',
    title: 'Huffman Compression',
    tagline: 'Lossless data compression via variable-length prefix codes and binary trees.',
    category: 'algorithm',
    thumb: '/images/huffman-tree.png',
    href: '/projects/huffman',
    accent: 'violet',
    tags: ['Compression', 'Binary Trees', 'Algorithms'],
  },
  {
    slug: 'hashes',
    title: 'Hashes',
    tagline: 'Hash table collision strategies: linear/quadratic probing, chaining, cuckoo.',
    category: 'algorithm',
    thumb: '/images/hashes.jpg',
    href: '/projects/hashes',
    accent: 'amber',
    tags: ['Data Structures', 'Performance', 'Hashing'],
  },
  {
    slug: 'covid',
    title: 'COVID-19 Dashboard',
    tagline: 'Live worldwide + per-country data visualization with interactive charts.',
    category: 'dataviz',
    thumb: '/images/covid_graph.png',
    href: '/projects/covid',
    accent: 'cyan',
    tags: ['Data Viz', 'Charts', 'API'],
  },
  {
    slug: 'search',
    title: 'Search Algorithms',
    tagline: 'Visualizations of classic search algorithms — transmission incoming.',
    category: 'algorithm',
    thumb: '/images/search.jpg',
    href: '/projects/search',
    accent: 'magenta',
    tags: ['Graph Search', 'Pathfinding', 'Visualization'],
  },
  {
    slug: 'fullstack-ai-rag-chat',
    title: 'In-Browser RAG Engine',
    tagline: 'Client-side Transformers.js embeddings with vector retrieval and cited AI responses.',
    category: 'algorithm',
    thumb: '/images/fullstack-ai-rag-chat.jpg',
    href: '/projects/fullstack-ai-rag-chat',
    accent: 'cyan',
    tags: ['TypeScript', 'Transformers.js', 'RAG', 'Vector Search'],
  },
  {
    slug: 'backend-job-queue',
    title: 'Distributed Job Queue',
    tagline: 'Durable distributed task queue & scheduler in Rust with tokio worker pool and SQLite WAL.',
    category: 'algorithm',
    thumb: '/images/backend-job-queue.jpg',
    href: '/projects/backend-job-queue',
    accent: 'amber',
    tags: ['Rust', 'Tokio', 'SQLite', 'Axum', 'Async'],
  },
  {
    slug: 'fintech-payments-ledger',
    title: 'Double-Entry Payments Ledger',
    tagline: 'High-precision double-entry financial ledger service in Go with idempotency & reconciliation.',
    category: 'simulation',
    thumb: '/images/fintech-payments-ledger.jpg',
    href: '/projects/fintech-payments-ledger',
    accent: 'violet',
    tags: ['Go', 'Fintech', 'SQLite', 'ISO-20022', 'Ledger'],
  },
]
