import { Link } from 'react-router-dom'
import { ReactNode } from 'react'

type Props = {
  children: ReactNode
  to?: string
  href?: string
  onClick?: () => void
  variant?: 'cyan' | 'magenta'
}

// Treat absolute http(s) URLs as external — they get target="_blank".
// mailto:, tel:, and relative paths stay in the same tab.
function isExternalHref(href: string) {
  return /^https?:\/\//i.test(href)
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
  if (href) {
    const external = isExternalHref(href)
    return (
      <a href={href} {...(external && { target: '_blank', rel: 'noreferrer' })}>
        {base}
      </a>
    )
  }
  return (
    <button type="button" onClick={onClick}>
      {base}
    </button>
  )
}
