import { Github, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-border/40 mt-20 py-8 bg-background/50">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 font-sans text-sm text-muted-foreground">
        <div>&copy; {new Date().getFullYear()} Maddox Krape. Built with React & Shadcn UI.</div>
        <div className="flex items-center gap-4">
          <a href="https://github.com/maddoxk" target="_blank" rel="noreferrer" aria-label="GitHub" className="hover:text-foreground transition-colors">
            <Github className="w-4 h-4" />
          </a>
          <a href="mailto:maddox.krape@gmail.com" aria-label="Email" className="hover:text-foreground transition-colors">
            <Mail className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  )
}
