import ProjectHero from '@/components/project/ProjectHero'
import CodeBlock from '@/components/project/CodeBlock'
import MediaEmbed from '@/components/project/MediaEmbed'
import NeonButton from '@/components/ui/NeonButton'

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
        eyebrow="SIMULATION // AP_CS_FINAL"
        title="GRAVITY SIMULATION"
        subtitle="Coding the Universe with Newton's Law of Universal Gravitation."
      />
      <article className="px-6 max-w-4xl mx-auto py-12 prose-cyber">
        <h2 className="font-display text-2xl text-cyan-neon mt-10 mb-4">Coding the Universe</h2>
        <p className="text-lg mb-4">
          For this simulation, I used <b>3 main classes</b> to achieve a functional and logically
          sound simulation.
        </p>

        <h3 className="font-display text-xl text-magenta-neon mt-8 mb-3">Classes</h3>
        <ul className="space-y-4 mb-6">
          <li>
            <div className="text-cyan-neon font-mono mb-1">&gt; UniverseState</div>
            <p className="text-muted">
              Since this simulation was technically built inside a game engine, we need a class to
              take care of the current state of the universe — camera, windows, GUI, time,
              gravitational constant, etc.
            </p>
          </li>
          <li>
            <div className="text-cyan-neon font-mono mb-1">&gt; UniverseManager</div>
            <p className="text-muted">
              Computes and updates the state of the universe. It also stores the ArrayLists of
              celestial bodies and updates them.
            </p>
          </li>
          <li>
            <div className="text-cyan-neon font-mono mb-1">&gt; CelestialBody</div>
            <p className="text-muted">
              The most essential class. Used as an object to store a body's mass, velocity, and
              geometry.
            </p>
          </li>
        </ul>

        <h2 className="font-display text-2xl text-cyan-neon mt-12 mb-4">Simulating Gravity</h2>
        <p className="mb-4">
          Simulating a universe with gravity can be done using one formula: Newton's law of universal
          gravitation.
        </p>
        <MediaEmbed src="/images/gravity_equation.svg" alt="Newton's Law of Universal Gravitation" width="340px" />
        <p className="mb-4">
          Converting this formula into code can be quite simple. I iterate through the ArrayList of
          celestial bodies and calculate the total effect of gravitational pull from each body on
          each other:
        </p>
        <CodeBlock code={GRAVITY_CODE} lang="java" />

        <h3 className="font-display text-xl text-magenta-neon mt-12 mb-3">Deep Dive</h3>
        <MediaEmbed
          src="/videos/v1gravsim.mp4"
          type="video"
          caption="First instance — 3 bodies with similar mass but different starting positions and velocities forming a circumbinary system (two bodies dance together; a third orbits them)."
        />
        <p className="mb-6">
          Here is the first example of me getting gravity to work. There are initially 3 bodies with
          similar mass but different starting positions and velocity. Tweaking numbers produced two
          bodies that dance together as a binary pair with a third body orbiting them — a
          "circumbinary system" that's pretty cool to watch.
        </p>
        <p className="mb-6">
          If you'd like to create your own, I highly recommend it — this taught me multiple valuable
          lessons in my software engineering journey. Try experimenting with different starting
          positions, velocities, and masses for the bodies. Adjust the gravitational constant to see
          how it affects motion. Simulate more complex scenarios, such as a system of multiple
          planets orbiting a star, or a galaxy with multiple stars.
        </p>
        <MediaEmbed
          src="/videos/gravsimulato.mp4"
          type="video"
          caption="Final version with controls for time, gravity, camera, and custom celestial body creation."
        />
        <p className="mb-10">
          As you continue to develop a gravity simulator, research the latest advances in celestial
          mechanics. Overall, building this was a fun and educational experience — it shows how
          difficult it is to get planets to orbit.
        </p>

        <h3 className="font-display text-xl text-magenta-neon mt-12 mb-3">Key Takeaways</h3>
        <ul className="space-y-2 text-muted mb-10">
          <li>&gt; Using object-oriented programming to store and manage data as objects</li>
          <li>&gt; Fundamental physics applied in astrophysics</li>
          <li>&gt; Working with 3D mathematics — vectors and how to manipulate them</li>
        </ul>

        <NeonButton href="https://github.com/maddoxk/UniverseSimulator">
          &gt; VIEW_ON_GITHUB
        </NeonButton>
      </article>
    </>
  )
}
