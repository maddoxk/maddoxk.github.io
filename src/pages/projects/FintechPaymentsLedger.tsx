import ProjectHero from '@/components/project/ProjectHero'
import CodeBlock from '@/components/project/CodeBlock'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Github, ArrowUpRight, DollarSign, Lock, FileSpreadsheet } from 'lucide-react'

const LEDGER_VALIDATE = `// Double-entry validation: sum(debits) MUST equal sum(credits) per currency
func (t *Transaction) Validate() error {
    totals := make(map[string]int64)
    for _, entry := range t.Entries {
        if entry.Direction == Debit {
            totals[entry.Currency] += entry.Amount
        } else {
            totals[entry.Currency] -= entry.Amount
        }
    }
    for curr, net := range totals {
        if net != 0 {
            return fmt.Errorf("unbalanced transaction for currency %s: net delta %d", curr, net)
        }
    }
    return nil
}`

export default function FintechPaymentsLedger() {
  return (
    <>
      <ProjectHero
        eyebrow="Financial Infrastructure & Systems"
        title="Double-Entry Payments Ledger"
        subtitle="High-precision double-entry accounting engine and payment state machine in Go with strict ISO-20022 modeling."
        thumb="/images/fintech-payments-ledger.jpg"
      />
      <article className="px-6 max-w-4xl mx-auto py-12 text-muted-foreground leading-relaxed">
        <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Architecture & Financial Safety</h2>
        <p className="text-lg text-foreground/90 mb-6">
          Designed for zero-floating-point financial calculations using integer minor units, atomic double-entry transaction boundaries, SHA-256 idempotency key enforcement, and automated bank reconciliation engines.
        </p>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Card className="bg-card/40 border-border/50">
            <CardContent className="p-5">
              <DollarSign className="w-5 h-5 text-primary mb-2" />
              <h4 className="font-semibold text-foreground mb-1">Integer Minor Units</h4>
              <p className="text-xs text-muted-foreground">Eliminates float rounding errors (USD cents, JPY zero-minor, BHD 3-decimal exponent handling).</p>
            </CardContent>
          </Card>

          <Card className="bg-card/40 border-border/50">
            <CardContent className="p-5">
              <Lock className="w-5 h-5 text-primary mb-2" />
              <h4 className="font-semibold text-foreground mb-1">Idempotency Core</h4>
              <p className="text-xs text-muted-foreground">SHA-256 fingerprint validation ensuring duplicate requests produce safe replay responses.</p>
            </CardContent>
          </Card>

          <Card className="bg-card/40 border-border/50">
            <CardContent className="p-5">
              <FileSpreadsheet className="w-5 h-5 text-primary mb-2" />
              <h4 className="font-semibold text-foreground mb-1">Reconciliation Engine</h4>
              <p className="text-xs text-muted-foreground">Automatically categorizes breaks (amount mismatch, currency mismatch, missing entries).</p>
            </CardContent>
          </Card>
        </div>

        <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">Double-Entry Validation Logic</h2>
        <p className="mb-4">
          Guarantees debits equal credits before any entry is written to database storage:
        </p>
        <CodeBlock code={LEDGER_VALIDATE} lang="go" />

        <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">Technical Specs</h2>
        <ul className="list-disc list-inside space-y-2 mb-10 text-muted-foreground">
          <li>Written in Go 1.25+ with pure Go SQLite backend (zero cgo dependency) + PostgreSQL support</li>
          <li>Models ISO-20022 message standard subsets (<code className="text-foreground">pain.001</code> & <code className="text-foreground">pacs.008</code>)</li>
          <li>Includes comprehensive unit & integration test suites</li>
        </ul>

        <div className="flex flex-wrap gap-3">
          <Button size="lg" asChild className="gap-2">
            <a href="https://github.com/maddoxk/fintech-payments-ledger" target="_blank" rel="noreferrer">
              <Github className="w-4 h-4" /> View Repository <ArrowUpRight className="w-4 h-4" />
            </a>
          </Button>
        </div>
      </article>
    </>
  )
}
