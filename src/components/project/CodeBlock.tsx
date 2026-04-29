import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

export default function CodeBlock({ code, lang = 'java' }: { code: string; lang?: string }) {
  const [copied, setCopied] = useState(false)
  const onCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    })
  }
  return (
    <div className="relative my-6 panel cyber-border" style={{ borderColor: 'var(--neon-cyan)' }}>
      <div className="flex items-center justify-between px-4 py-2 border-b border-[var(--border-panel)] font-mono text-xs">
        <span className="text-cyan-neon">// {lang}</span>
        <button
          data-cursor="hover"
          onClick={onCopy}
          className="flex items-center gap-1 text-muted hover:text-cyan-neon transition-colors"
          aria-label="Copy code"
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? 'COPIED' : 'COPY'}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto font-mono text-sm leading-relaxed text-fg">
        <code>{code}</code>
      </pre>
    </div>
  )
}
