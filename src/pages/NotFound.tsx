import GlitchText from '@/components/fx/GlitchText'
import NeonButton from '@/components/ui/NeonButton'

export default function NotFound() {
  return (
    <section className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center">
      <div className="font-mono text-xs tracking-widest text-magenta-neon mb-4 animate-pulse">
        &gt; SIGNAL_LOST [CONNECTION_TIMEOUT]
      </div>
      <h1 className="font-display text-6xl md:text-9xl mb-4">
        <GlitchText text="404" as="span" />
      </h1>
      <p className="text-muted mb-8 max-w-md">
        The path you requested doesn't exist in this grid. Return to origin.
      </p>
      <NeonButton to="/">&gt; RETURN_HOME</NeonButton>
    </section>
  )
}
