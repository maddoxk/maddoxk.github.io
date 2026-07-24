import { useState } from 'react'
import ProjectCard from '@/components/project/ProjectCard'
import GlitchText from '@/components/fx/GlitchText'
import { PROJECTS, type ProjectCategory } from '@/data/projects'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Search } from 'lucide-react'

type Filter = 'all' | ProjectCategory

export default function Projects() {
  const [filter, setFilter] = useState<Filter>('all')
  const [search, setSearch] = useState('')

  const items = PROJECTS.filter(p => {
    const matchesCategory = filter === 'all' || p.category === filter
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) || 
                          p.tagline.toLowerCase().includes(search.toLowerCase()) ||
                          p.tags?.some(t => t.toLowerCase().includes(search.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  return (
    <div className="px-6 max-w-5xl mx-auto py-16 pt-20">
      <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider block mb-3">
        Portfolio Showcase
      </span>
      <h1 className="font-sans font-bold text-4xl sm:text-5xl tracking-tight text-foreground mb-3">
        Projects
      </h1>
      <p className="text-muted-foreground text-lg max-w-2xl mb-10">
        A collection of simulation systems, algorithmic tools, graphics experiments, and software applications.
      </p>

      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between mb-10">
        <Tabs defaultValue="all" onValueChange={(v) => setFilter(v as Filter)} className="w-full md:w-auto">
          <TabsList className="bg-muted/40 border border-border/50 p-1">
            <TabsTrigger value="all">All Projects</TabsTrigger>
            <TabsTrigger value="simulation">Simulations</TabsTrigger>
            <TabsTrigger value="algorithm">Algorithms</TabsTrigger>
            <TabsTrigger value="dataviz">Data Viz</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="relative max-w-xs w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search projects or tech..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-card/40 border-border/50"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map(p => <ProjectCard key={p.slug} project={p} />)}
      </div>

      {items.length === 0 && (
        <div className="text-center py-20 bg-card/20 rounded-xl border border-dashed border-border/50 mt-6">
          <p className="text-muted-foreground text-base">No matching projects found for your search query.</p>
        </div>
      )}
    </div>
  )
}
