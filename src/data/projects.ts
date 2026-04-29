export type ProjectCategory = 'simulation' | 'algorithm' | 'dataviz'

export type Project = {
  slug: string
  title: string
  tagline: string
  category: ProjectCategory
  thumb: string
  href: string
  accent: 'cyan' | 'magenta' | 'violet' | 'amber'
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
  },
  {
    slug: 'elevator',
    title: 'Elevator Simulation',
    tagline: 'Finite state machine modeling elevators with collaborative design iteration.',
    category: 'simulation',
    thumb: '/images/elevatorfsm.jpg',
    href: '/projects/elevator',
    accent: 'magenta',
  },
  {
    slug: 'huffman',
    title: 'Huffman Compression',
    tagline: 'Lossless data compression via variable-length prefix codes and binary trees.',
    category: 'algorithm',
    thumb: '/images/huffman-tree.png',
    href: '/projects/huffman',
    accent: 'violet',
  },
  {
    slug: 'hashes',
    title: 'Hashes',
    tagline: 'Hash table collision strategies: linear/quadratic probing, chaining, cuckoo.',
    category: 'algorithm',
    thumb: '/images/hashes.jpg',
    href: '/projects/hashes',
    accent: 'amber',
  },
  {
    slug: 'covid',
    title: 'COVID-19 Dashboard',
    tagline: 'Live worldwide + per-country data visualization with interactive charts.',
    category: 'dataviz',
    thumb: '/images/covid_graph.png',
    href: '/projects/covid',
    accent: 'cyan',
  },
  {
    slug: 'search',
    title: 'Search Algorithms',
    tagline: 'Visualizations of classic search algorithms — transmission incoming.',
    category: 'algorithm',
    thumb: '',
    href: '/projects/search',
    accent: 'magenta',
  },
]
