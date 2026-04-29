import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

const links = [
  { to: '/', label: 'HOME' },
  { to: '/about', label: 'ABOUT' },
  { to: '/projects', label: 'PROJECTS' },
  { to: '/#contact', label: 'CONTACT' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  return (
    <header className="fixed top-0 left-0 right-0 z-50 panel border-b border-t-0 border-l-0 border-r-0">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <NavLink to="/" className="font-display font-bold text-xl tracking-widest glow-cyan">
          MADDOX_K
        </NavLink>
        <nav className="hidden md:flex gap-8 font-mono text-sm">
          {links.map(l => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `relative py-1 transition-colors ${
                  isActive ? 'text-cyan-neon glow-cyan' : 'text-fg hover:text-cyan-neon'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
        <button
          className="md:hidden text-cyan-neon"
          onClick={() => setOpen(v => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div className="md:hidden panel border-t border-[var(--border-panel)]">
          <nav className="flex flex-col p-6 gap-4 font-mono">
            {links.map(l => (
              <NavLink
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  isActive ? 'text-cyan-neon glow-cyan' : 'text-fg'
                }
              >
                &gt; {l.label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
