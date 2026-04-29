import ProjectHero from '@/components/project/ProjectHero'
import MediaEmbed from '@/components/project/MediaEmbed'

export default function Elevator() {
  return (
    <>
      <ProjectHero
        eyebrow="SIMULATION // A.D.E.N"
        title="ELEVATOR SIMULATION"
        subtitle="Implementing finite state machines and collaborative programming."
      />
      <article className="px-6 max-w-4xl mx-auto py-12">
        <h2 className="font-display text-2xl text-cyan-neon mt-10 mb-4">Introduction</h2>
        <p className="text-lg mb-4">
          Elevator Simulation is a group project from the course A.D.E.N. (Advanced Data Structures,
          Embedded Systems, and Networking). It's a time-driven and event-driven simulation. The
          elevator's functionality is modeled using a finite state machine, and passengers arrive at
          specified times with intended destinations — just like they would in a real building.
        </p>

        <h2 className="font-display text-2xl text-cyan-neon mt-12 mb-4">Programming Deep-Dive</h2>
        <p className="mb-4">
          An elevator is a finite state machine — no randomness, fixed number of states.
        </p>
        <blockquote className="panel cyber-border p-6 my-6 italic text-muted" style={{ borderColor: 'var(--neon-magenta)' }}>
          "Finite-state machine (FSM), or finite-state automaton, is a mathematical model of
          computation. It is an abstract machine that can be in exactly one of a finite number of
          states at any given time."
          <footer className="text-xs mt-3 not-italic">— wikipedia.com</footer>
        </blockquote>
        <p className="mb-6">Here is the FSM diagram for the elevator simulation:</p>
        <MediaEmbed src="/images/elevatorfsm-removebg-preview.png" alt="Elevator FSM diagram" />

        <h3 className="font-display text-xl text-magenta-neon mt-10 mb-3">States</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-8">
          {['STOP', 'BOARD', 'OFFLOAD', 'OPENDOOR', 'CLOSEDOOR', 'MOVE_1_FLOOR'].map(s => (
            <div key={s} className="panel p-3 text-center font-mono text-sm text-cyan-neon border border-[var(--border-panel)]">
              {s}
            </div>
          ))}
        </div>

        <h3 className="font-display text-xl text-magenta-neon mt-10 mb-3">Each Tick Has 3 Phases</h3>
        <ol className="space-y-3 mb-6">
          <li>&gt; Check for the arrival of new passengers</li>
          <li>&gt; Execute the state and determine the next state</li>
          <li>&gt; Update the GUI if there are changes</li>
        </ol>
        <p className="text-muted mb-6">
          Executing the state has 2 sub-phases: (1) performing state actions — actions occur in the
          Elevator, Floor, and Building classes; (2) determining the next state — requires
          information from the Elevator, CallManager, and Building classes. We recommend building a
          document for each state that defines the action(s) and where they take place, plus the
          decision criteria for each possible next state and where it comes from.
        </p>

        <h3 className="font-display text-xl text-magenta-neon mt-10 mb-3">Design Stages</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <MediaEmbed src="/images/holyC - Elevator Simulation Design Document, v1.pdf" type="pdf" />
          <MediaEmbed src="/images/holyC - Elevator Simulation Design Document, v2.pdf" type="pdf" />
          <MediaEmbed src="/images/holyC - Elevator Simulation Design Document, v3 (1).pdf" type="pdf" />
        </div>

        <h3 className="font-display text-xl text-magenta-neon mt-10 mb-3">Analysis</h3>
        <MediaEmbed src="/images/holyC - Elevator Analysis.pdf" type="pdf" />

        <h3 className="font-display text-xl text-magenta-neon mt-10 mb-3">4K Timelapse</h3>
        <MediaEmbed src="/videos/4k_elevator_timelapse.mp4" type="video" caption="Note: file path contains spaces — served from public/videos/." />
      </article>
    </>
  )
}
