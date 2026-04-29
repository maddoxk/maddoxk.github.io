import ProjectHero from '@/components/project/ProjectHero'
import NeonButton from '@/components/ui/NeonButton'

export default function Search() {
  return (
    <>
      <ProjectHero
        eyebrow="ALGORITHM // INCOMING"
        title="SEARCH ALGORITHMS"
        subtitle="Transmission incoming — this project is still compiling."
      />
      <article className="px-6 max-w-3xl mx-auto py-24 text-center">
        <div className="panel cyber-border p-10 md:p-16 relative overflow-hidden">
          <div
            aria-hidden
            className="absolute inset-0 opacity-20"
            style={{
              background: 'repeating-linear-gradient(0deg, transparent 0, transparent 6px, var(--neon-cyan) 6px, var(--neon-cyan) 7px)',
            }}
          />
          <div className="relative">
            <div className="font-mono text-xs tracking-widest text-cyan-neon mb-4 animate-pulse">
              &gt; SIGNAL_ACQUIRED [░░░░░░░░░░ 13%]
            </div>
            <h2 className="font-display text-3xl md:text-5xl mb-6 glow-cyan">
              COMING ONLINE
            </h2>
            <p className="text-muted mb-6 max-w-xl mx-auto">
              Visualizations of classic search algorithms — binary search, breadth-first / depth-first
              search, A*, Dijkstra, and more. Check back soon for interactive demos.
            </p>
            <NeonButton to="/projects">&gt; BACK_TO_ARCHIVE</NeonButton>
          </div>
        </div>
      </article>
    </>
  )
}
