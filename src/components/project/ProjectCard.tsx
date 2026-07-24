import { Link } from 'react-router-dom'
import Tilt from 'react-parallax-tilt'
import type { Project } from '@/data/projects'
import { ArrowUpRight } from 'lucide-react'
import { CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import SpotlightCard from '@/components/reactbits/SpotlightCard'

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Tilt tiltMaxAngleX={6} tiltMaxAngleY={6} glareEnable glareMaxOpacity={0.08} scale={1.02} transitionSpeed={1200}>
      <Link to={project.href} className="group block h-full">
        <SpotlightCard className="h-full border-border/50 bg-card/60 backdrop-blur-md hover:border-primary/50 transition-all duration-300 overflow-hidden flex flex-col justify-between hover:shadow-lg hover:shadow-primary/5">
          <div>
            <div className="relative aspect-video overflow-hidden bg-muted/30">
              {project.thumb ? (
                <img
                  src={project.thumb}
                  alt={project.title}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center font-mono text-xs text-muted-foreground">
                  NO PREVIEW
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
            </div>
            
            <CardHeader className="pt-4 pb-2">
              <div className="flex items-start justify-between gap-2">
                <CardTitle className="text-xl font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors">
                  {project.title}
                </CardTitle>
                <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 flex-shrink-0" />
              </div>
              <CardDescription className="line-clamp-2 text-sm text-muted-foreground mt-1">
                {project.tagline}
              </CardDescription>
            </CardHeader>
          </div>

          <CardFooter className="pt-2 pb-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary" className="font-mono text-xs uppercase bg-secondary/80 text-secondary-foreground">
                {project.category}
              </Badge>
              {project.tags?.slice(0, 2).map((tag) => (
                <Badge key={tag} variant="outline" className="font-mono text-xs border-border/60 text-muted-foreground">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardFooter>
        </SpotlightCard>
      </Link>
    </Tilt>
  )
}
