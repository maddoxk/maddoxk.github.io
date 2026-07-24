import ProjectHero from '@/components/project/ProjectHero'
import CodeBlock from '@/components/project/CodeBlock'
import MediaEmbed from '@/components/project/MediaEmbed'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Github, ArrowUpRight } from 'lucide-react'

const GRAVITY_CODE = `for (CelestialBody other : allBodies) {
    if (other != this) {
        Vector3f direction = other.getGeometry().getLocalTranslation().subtract(this.getGeometry().getLocalTranslation());
        Vector3f force = direction.mult(UniverseState.G * other.getMass() / direction.lengthSquared()); // Newton's Law of Universal Gravitation
        Vector3f acceleration = force.divide(this.getMass());
        this.currentVelocity = this.currentVelocity.add(acceleration.mult(timeStep));
    }
}`

export default function Gravity() {
  return (
    <>
      <ProjectHero
        eyebrow="Physics Simulation"
        title="3D Gravity Simulator"
        subtitle="Coding the universe with Newton's Law of Universal Gravitation."
      />
      <article className="px-6 max-w-4xl mx-auto py-12 text-muted-foreground leading-relaxed">
        <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Coding the Universe</h2>
        <p className="text-lg text-foreground/90 mb-6">
          To achieve a logically sound gravitational simulation in a 3D environment, I structured the engine into <b>3 core components</b>:
        </p>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Card className="bg-card/40 border-border/50">
            <CardContent className="p-5">
              <h4 className="font-semibold text-foreground mb-1 font-mono text-sm">UniverseState</h4>
              <p className="text-xs text-muted-foreground">Manages global state — engine clock, gravitational constants, and camera view matrix.</p>
            </CardContent>
          </Card>
          <Card className="bg-card/40 border-border/50">
            <CardContent className="p-5">
              <h4 className="font-semibold text-foreground mb-1 font-mono text-sm">UniverseManager</h4>
              <p className="text-xs text-muted-foreground">Handles body list updates, frame step integration, and force calculation cycles.</p>
            </CardContent>
          </Card>
          <Card className="bg-card/40 border-border/50">
            <CardContent className="p-5">
              <h4 className="font-semibold text-foreground mb-1 font-mono text-sm">CelestialBody</h4>
              <p className="text-xs text-muted-foreground">Represents individual bodies storing mass, velocity vector, position, and geometry.</p>
            </CardContent>
          </Card>
        </div>

        <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">Simulating Gravitational Mechanics</h2>
        <p className="mb-4">
          N-body orbital mechanics rely on Newton's law of universal gravitation:
        </p>
        <MediaEmbed src="/images/gravity_equation.svg" alt="Newton's Law of Universal Gravitation" width="340px" />
        <p className="mb-4">
          Iterating through all body pairs in the universe allows computing net acceleration vectors per timestep:
        </p>
        <CodeBlock code={GRAVITY_CODE} lang="java" />

        <h3 className="text-xl font-bold text-foreground mt-12 mb-4">Deep Dive & Behavior</h3>
        <MediaEmbed
          src="/videos/v1gravsim.mp4"
          type="video"
          caption="Initial run — 3 celestial bodies forming a stable circumbinary system."
        />
        <p className="mb-6">
          In early testing, balancing mass distributions and initial velocity vectors yielded a circumbinary system — two central bodies orbiting each other closely while a third body established a wider stable orbit.
        </p>
        <MediaEmbed
          src="/videos/gravsimulato.mp4"
          type="video"
          caption="Final simulation interface featuring real-time parameter tuning."
        />

        <h3 className="text-xl font-bold text-foreground mt-12 mb-4">Key Takeaways</h3>
        <ul className="list-disc list-inside space-y-2 mb-10 text-muted-foreground">
          <li>Applying N-body physics algorithms efficiently in real-time</li>
          <li>Manipulating 3D vector spaces and numerical integration timesteps</li>
          <li>Designing clean object-oriented architectures for real-time graphics</li>
        </ul>

        <Button size="lg" asChild className="gap-2">
          <a href="https://github.com/maddoxk/UniverseSimulator" target="_blank" rel="noreferrer">
            <Github className="w-4 h-4" /> View Source on GitHub <ArrowUpRight className="w-4 h-4" />
          </a>
        </Button>
      </article>
    </>
  )
}
