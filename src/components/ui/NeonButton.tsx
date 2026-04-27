import { Link } from 'react-router-dom'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
  to?: string
  href?: string
  onClick?: () => void
  variant?: 'cyan' | 'magenta'
}

export default function NeonButton({ children, to, href, onClick, variant = 'cyan' }: Props) {
  const color = variant === 'cyan' ? 'var(--neon-cyan)' : 'var(--neon-magenta)'
  const base = (
    <span
      className="inline-flex items-center gap-2 px-5 py-2 font-mono text-sm tracking-widest uppercase cyber-border transition-all hover:scale-105"
      style={{ color, borderColor: color }}
    >
      {children}
    </span>
  )
  if (to) return <Link to={to}>{base}</Link>
  if (href) return <a href={href} target="_blank" rel="noreferrer">{base}</a>
  return <button onClick={onClick}>{base}</button>
}
