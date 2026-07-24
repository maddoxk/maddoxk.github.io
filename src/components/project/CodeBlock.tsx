import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function CodeBlock({ code, lang = 'java' }: { code: string; lang?: string }) {
  const [copied, setCopied] = useState(false)
  const onCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    })
  }

  return (
    <Card className="relative my-6 bg-card/50 border-border/50 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 bg-muted/30 border-b border-border/40 font-mono text-xs text-muted-foreground">
        <span className="font-semibold uppercase tracking-wider">{lang}</span>
        <Button
          variant="ghost"
          size="xs"
          onClick={onCopy}
          className="gap-1.5 text-xs text-muted-foreground hover:text-foreground"
          aria-label="Copy code"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          {copied ? 'Copied' : 'Copy'}
        </Button>
      </div>
      <pre className="p-4 overflow-x-auto font-mono text-sm leading-relaxed text-foreground bg-card/20">
        <code>{code}</code>
      </pre>
    </Card>
  )
}
