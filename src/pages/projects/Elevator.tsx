import ProjectHero from '@/components/project/ProjectHero'
import MediaEmbed from '@/components/project/MediaEmbed'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function Elevator() {
  return (
    <>
      <ProjectHero
        eyebrow="System Simulation"
        title="Elevator Finite State Machine"
        subtitle="Implementing time-driven and event-driven finite state machines."
      />
      <article className="px-6 max-w-4xl mx-auto py-12 text-muted-foreground leading-relaxed">
        <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Overview</h2>
        <p className="text-lg text-foreground/90 mb-6">
          Elevator Simulation models real-world passenger arrivals, floor requests, and dispatching logic in a multi-story building environment using a deterministic Finite State Machine (FSM).
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">Finite State Architecture</h2>
        <blockquote className="border-l-2 border-primary/40 pl-4 py-2 my-6 italic text-muted-foreground bg-muted/20 rounded-r-md">
          "A finite-state machine (FSM) is an abstract model of computation that can exist in exactly one of a finite number of states at any given time."
        </blockquote>
        <MediaEmbed src="/images/elevatorfsm-removebg-preview.png" alt="Elevator FSM diagram" />

        <h3 className="text-xl font-bold text-foreground mt-10 mb-4">Core States</h3>
        <div className="flex flex-wrap gap-2 mb-8">
          {['STOP', 'BOARD', 'OFFLOAD', 'OPENDOOR', 'CLOSEDOOR', 'MOVE_1_FLOOR'].map(s => (
            <Badge key={s} variant="secondary" className="font-mono text-xs px-3 py-1">
              {s}
            </Badge>
          ))}
        </div>

        <h3 className="text-xl font-bold text-foreground mt-10 mb-4">Simulation Timestep Cycle</h3>
        <ol className="list-decimal list-inside space-y-2 mb-8">
          <li>Check scheduled passenger arrival queue at current timestamp</li>
          <li>Execute current elevator state action & resolve transition criteria</li>
          <li>Update visualization layer with new position & state indicators</li>
        </ol>

        <h3 className="text-xl font-bold text-foreground mt-10 mb-4">Design Artifacts</h3>
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <MediaEmbed src="/images/holyC - Elevator Simulation Design Document, v1.pdf" type="pdf" />
          <MediaEmbed src="/images/holyC - Elevator Simulation Design Document, v2.pdf" type="pdf" />
          <MediaEmbed src="/images/holyC - Elevator Simulation Design Document, v3 (1).pdf" type="pdf" />
        </div>

        <h3 className="text-xl font-bold text-foreground mt-10 mb-4">Analysis & Demonstration</h3>
        <div className="space-y-6">
          <MediaEmbed src="/images/holyC - Elevator Analysis.pdf" type="pdf" />
          <MediaEmbed src="/videos/4k_elevator_timelapse.mp4" type="video" caption="Elevator simulation execution run." />
        </div>
      </article>
    </>
  )
}
