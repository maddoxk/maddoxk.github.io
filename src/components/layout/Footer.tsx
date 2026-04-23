import { Code, Briefcase, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border-panel)] mt-24 py-8">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-sm text-muted">
        <div>&copy; {new Date().getFullYear()} MADDOX_K // ALL SYSTEMS NOMINAL</div>
        <div className="flex gap-4">
          <a href="https://github.com/maddoxk" target="_blank" rel="noreferrer" aria-label="GitHub" className="hover:text-cyan-neon">
            <Code size={18} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hover:text-cyan-neon">
            <Briefcase size={18} />
          </a>
          <a href="mailto:maddox.krape@gmail.com" aria-label="Email" className="hover:text-cyan-neon">
            <Mail size={18} />
          </a>
        </div>
      </div>
    </footer>
  )
}
