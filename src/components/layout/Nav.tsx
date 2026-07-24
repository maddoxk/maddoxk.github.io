import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import { Menu, X, Terminal, ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/#contact', label: 'Contact' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/40">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <NavLink to="/" className="font-sans font-semibold text-lg tracking-tight text-foreground hover:opacity-80 transition-opacity">
          Maddox Krape
        </NavLink>

        <nav className="hidden md:flex items-center gap-1 font-sans text-sm font-medium">
          {links.map(l => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `px-4 py-2 rounded-md transition-all duration-200 ${
                  isActive 
                    ? 'text-primary bg-primary/10 font-semibold' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Button variant="outline" size="sm" asChild className="gap-1.5 text-xs font-mono">
            <a href="https://github.com/maddoxk" target="_blank" rel="noreferrer">
              GitHub <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </Button>
        </div>

        <button
          className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
          onClick={() => setOpen(v => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border/40 px-6 py-4">
          <nav className="flex flex-col gap-2 font-sans font-medium">
            {links.map(l => (
              <NavLink
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-2.5 rounded-md transition-colors ${
                    isActive ? 'text-primary bg-primary/10 font-semibold' : 'text-muted-foreground hover:text-foreground'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
