import SectionHeading from '@/components/ui/SectionHeading'
import StatsHUD from '@/components/ui/StatsHUD'
import NeonButton from '@/components/ui/NeonButton'
import GlitchText from '@/components/fx/GlitchText'

const TIMELINE = [
  { year: '7+ yrs ago', title: 'First lines of code', body: 'Started tinkering and never stopped.' },
  { year: 'High school', title: 'AP Computer Science A', body: 'Earned a perfect 5/5 on the exam.' },
  { year: 'Ongoing', title: 'Simulation & algorithms', body: 'Built gravity simulators, FSM-driven elevators, Huffman compressors, and hash table experiments.' },
  { year: 'College', title: 'Pursuing a BS in Computer Science', body: 'Currently enrolled and deepening my foundations across systems, theory, and software engineering.' },
  { year: 'Now', title: 'Exploring the web in 3D', body: 'Learning new technologies and bringing cyberpunk aesthetics and real-time 3D to the browser.' },
]

export default function About() {
  return (
    <div className="px-6 max-w-5xl mx-auto py-16">
      <div className="font-mono text-xs tracking-widest text-cyan-neon mb-4">
        &gt; IDENTITY.file
      </div>
      <h1 className="font-display text-4xl md:text-6xl mb-10">
        <GlitchText text="ABOUT ME" as="span" />
      </h1>

      <section className="grid md:grid-cols-[240px_1fr] gap-10 items-start mb-20">
        <img
          src="/images/profile.jpeg"
          alt="Maddox Krape"
          className="w-60 h-60 object-cover cyber-border"
          style={{ borderColor: 'var(--neon-cyan)' }}
        />
        <div className="space-y-4 text-lg">
          <p>
            I'm a developer and problem solver with a passion for creating solutions. I have
            years of experience in software engineering and have worked on a variety of projects.
          </p>
          <p className="text-muted">
            I love to brainstorm and solve complex problems, and I have a knack for finding
            innovative solutions. I am constantly looking for new challenges and am always on
            the lookout for interesting opportunities.
          </p>
          <p className="text-muted">
            My projects span simulation (gravity, elevators), classic algorithms (Huffman
            compression, hash tables, search), and data visualization (COVID-19 dashboards).
            When I'm not coding, I play chess (1600+ ELO and climbing).
          </p>
        </div>
      </section>

      <section className="mb-20">
        <SectionHeading eyebrow="ACHIEVEMENTS.log" title="By The Numbers" />
        <StatsHUD />
      </section>

      <section className="mb-20">
        <SectionHeading eyebrow="TIMELINE.log" title="Journey" />
        <ol className="relative border-l border-[var(--border-panel)] pl-8 space-y-8">
          {TIMELINE.map((t, i) => (
            <li key={i} className="relative">
              <div
                className="absolute -left-10 top-1 w-3 h-3 rounded-full"
                style={{ background: 'var(--neon-cyan)', boxShadow: 'var(--glow-cyan-sm)' }}
              />
              <div className="font-mono text-xs tracking-widest text-cyan-neon mb-1">
                &gt; {t.year}
              </div>
              <h3 className="font-display text-xl mb-2">{t.title}</h3>
              <p className="text-muted">{t.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section>
        <SectionHeading eyebrow="NOW.sys" title="What I'm Working On" />
        <div className="panel cyber-border p-6">
          <p className="text-lg mb-4">
            Currently focused on this cyberpunk portfolio rebuild: Three.js shaders, AI behaviors
            (see the lightcycles behind this text), and modern React patterns.
          </p>
          <NeonButton to="/projects">&gt; BROWSE_PROJECTS</NeonButton>
        </div>
      </section>
    </div>
  )
}
