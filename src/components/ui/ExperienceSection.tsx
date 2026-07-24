import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Users, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function ExperienceSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Western Union Intern */}
      <Card className="bg-card/40 border-border/50 backdrop-blur-md hover:border-primary/40 transition-colors">
        <CardContent className="p-6 flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center justify-between gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-yellow-400/10 border border-yellow-400/20 p-2 flex items-center justify-center shrink-0">
                <img src="/images/western-union.svg" alt="Western Union" className="w-full h-full object-contain" />
              </div>
              <span className="font-mono text-xs text-muted-foreground">Internship</span>
            </div>
            <h3 className="font-semibold text-lg text-foreground tracking-tight">Software Engineer Intern</h3>
            <p className="text-xs font-mono text-primary mb-3">Western Union</p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Engineered payment integration services, optimized backend routines, and collaborated with cross-functional software teams.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* DU CS Major */}
      <Card className="bg-card/40 border-border/50 backdrop-blur-md hover:border-primary/40 transition-colors">
        <CardContent className="p-6 flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center justify-between gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-rose-500/10 border border-rose-500/20 p-2 flex items-center justify-center shrink-0">
                <img src="/images/du-logo.svg" alt="University of Denver" className="w-full h-full object-contain" />
              </div>
              <span className="font-mono text-xs text-muted-foreground">Junior Year</span>
            </div>
            <h3 className="font-semibold text-lg text-foreground tracking-tight">Junior CS Major (B.S.)</h3>
            <p className="text-xs font-mono text-primary mb-3">University of Denver (DU)</p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Pursuing a Bachelor of Science in Computer Science focusing on data structures, system architecture, and algorithm design.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* DU AI Club Treasurer */}
      <Card className="bg-card/40 border-border/50 backdrop-blur-md hover:border-primary/40 transition-colors">
        <CardContent className="p-6 flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center justify-between gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 p-2 flex items-center justify-center shrink-0 text-primary">
                <Users className="w-5 h-5" />
              </div>
              <span className="font-mono text-xs text-muted-foreground">Leadership</span>
            </div>
            <h3 className="font-semibold text-lg text-foreground tracking-tight">Treasurer</h3>
            <p className="text-xs font-mono text-primary mb-3">DU AI Club</p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Managing club finances, budgeting workshops/hackathons, and supporting student AI learning initiatives across campus.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
