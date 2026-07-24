import ProjectHero from '@/components/project/ProjectHero'
import CodeBlock from '@/components/project/CodeBlock'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Github, ArrowUpRight, Server, ShieldCheck, Clock } from 'lucide-react'

const ENQUEUE_CODE = `// Axum API route handler for job submission
pub async fn enqueue_job(
    State(store): State<Arc<JobStore>>,
    Json(payload): Json<NewJob>,
) -> Result<Json<Job>, ApiError> {
    let job = store.enqueue(
        &payload.kind,
        &payload.payload,
        payload.priority,
        payload.max_attempts,
        payload.delay_seconds,
    ).await?;
    
    Ok(Json(job))
}`

export default function BackendJobQueue() {
  return (
    <>
      <ProjectHero
        eyebrow="Distributed Systems & Async Tasking"
        title="Distributed Job Queue & Scheduler"
        subtitle="High-concurrency task processing queue in Rust built with tokio worker pools, Axum HTTP API, and SQLite WAL durability."
        thumb="/images/backend-job-queue.jpg"
      />
      <article className="px-6 max-w-4xl mx-auto py-12 text-muted-foreground leading-relaxed">
        <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">System Overview</h2>
        <p className="text-lg text-foreground/90 mb-6">
          A production-grade distributed task queue implementing atomic worker leasing, exponential backoff retries, dead-letter queueing (DLQ), and delayed execution schedules.
        </p>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Card className="bg-card/40 border-border/50">
            <CardContent className="p-5">
              <Server className="w-5 h-5 text-primary mb-2" />
              <h4 className="font-semibold text-foreground mb-1">Tokio Worker Pool</h4>
              <p className="text-xs text-muted-foreground">Configurable async worker concurrency executing atomic state transitions.</p>
            </CardContent>
          </Card>

          <Card className="bg-card/40 border-border/50">
            <CardContent className="p-5">
              <ShieldCheck className="w-5 h-5 text-primary mb-2" />
              <h4 className="font-semibold text-foreground mb-1">Lease Redelivery</h4>
              <p className="text-xs text-muted-foreground">Automatic lease expiry recovery for worker crash fault tolerance.</p>
            </CardContent>
          </Card>

          <Card className="bg-card/40 border-border/50">
            <CardContent className="p-5">
              <Clock className="w-5 h-5 text-primary mb-2" />
              <h4 className="font-semibold text-foreground mb-1">Delayed & Cron Jobs</h4>
              <p className="text-xs text-muted-foreground">Built-in cron parser and priority scheduling using SQLite WAL persistence.</p>
            </CardContent>
          </Card>
        </div>

        <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">Rust Task Enqueue Handler</h2>
        <p className="mb-4">
          Axum HTTP handler for enqueuing async jobs:
        </p>
        <CodeBlock code={ENQUEUE_CODE} lang="rust" />

        <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">Performance Metrics</h2>
        <ul className="list-disc list-inside space-y-2 mb-10 text-muted-foreground">
          <li>Sustained ~18 jobs/sec throughput with 6 concurrent Tokio workers</li>
          <li>Complete integration test suite covering DLQ, leases, retries, and priority ordering</li>
          <li>Includes live HTML5 dashboard with real-time metrics charts</li>
        </ul>

        <div className="flex flex-wrap gap-3">
          <Button size="lg" asChild className="gap-2">
            <a href="https://github.com/maddoxk/backend-job-queue" target="_blank" rel="noreferrer">
              <Github className="w-4 h-4" /> View Repository <ArrowUpRight className="w-4 h-4" />
            </a>
          </Button>
        </div>
      </article>
    </>
  )
}
