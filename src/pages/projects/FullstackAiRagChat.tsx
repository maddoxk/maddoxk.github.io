import ProjectHero from '@/components/project/ProjectHero'
import CodeBlock from '@/components/project/CodeBlock'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Github, ArrowUpRight, Cpu, Layers, Database } from 'lucide-react'

const EMBED_EXAMPLE = `import { pipeline } from '@xenova/transformers'

// Initialize 384-dimensional feature extraction pipeline
const embedder = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2')

// Compute normalized vector embedding in-browser
const output = await embedder(text, { pooling: 'mean', normalize: true })
const vector = Array.from(output.data)`

export default function FullstackAiRagChat() {
  return (
    <>
      <ProjectHero
        eyebrow="Artificial Intelligence & Retrieval"
        title="In-Browser RAG Engine"
        subtitle="Zero-server retrieval augmented generation running directly inside the client using Transformers.js and ONNX runtime."
        thumb="/images/fullstack-ai-rag-chat.jpg"
      />
      <article className="px-6 max-w-4xl mx-auto py-12 text-muted-foreground leading-relaxed">
        <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Architecture Overview</h2>
        <p className="text-lg text-foreground/90 mb-6">
          This system performs full text chunking, vector embedding, and top-K cosine similarity retrieval entirely in the user's browser, eliminating backend vector database overhead for localized document corpora.
        </p>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Card className="bg-card/40 border-border/50">
            <CardContent className="p-5">
              <Cpu className="w-5 h-5 text-primary mb-2" />
              <h4 className="font-semibold text-foreground mb-1">Transformers.js</h4>
              <p className="text-xs text-muted-foreground">Runs quantized <code className="text-foreground">all-MiniLM-L6-v2</code> ONNX models client-side with zero per-query API cost.</p>
            </CardContent>
          </Card>

          <Card className="bg-card/40 border-border/50">
            <CardContent className="p-5">
              <Layers className="w-5 h-5 text-primary mb-2" />
              <h4 className="font-semibold text-foreground mb-1">Vector Indexing</h4>
              <p className="text-xs text-muted-foreground">Generates mean-pooled 384-dimensional L2-normalized embeddings for fast cosine similarity matches.</p>
            </CardContent>
          </Card>

          <Card className="bg-card/40 border-border/50">
            <CardContent className="p-5">
              <Database className="w-5 h-5 text-primary mb-2" />
              <h4 className="font-semibold text-foreground mb-1">Source Grounding</h4>
              <p className="text-xs text-muted-foreground">Extracts exact paragraph citations and document snippets alongside generated answers.</p>
            </CardContent>
          </Card>
        </div>

        <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">Embedding Generation Code</h2>
        <p className="mb-4">
          Client-side feature extraction pipeline setup:
        </p>
        <CodeBlock code={EMBED_EXAMPLE} lang="typescript" />

        <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">Key Features & Highlights</h2>
        <ul className="list-disc list-inside space-y-2 mb-10 text-muted-foreground">
          <li>Zero server dependencies — works offline after initial ONNX model cache</li>
          <li>Comprehensive unit test suite powered by Vitest (21 automated tests)</li>
          <li>Dual architecture design: Includes documented Next.js 14 + pgvector production API fallback</li>
        </ul>

        <div className="flex flex-wrap gap-3">
          <Button size="lg" asChild className="gap-2">
            <a href="https://github.com/maddoxk/fullstack-ai-rag-chat" target="_blank" rel="noreferrer">
              <Github className="w-4 h-4" /> View Repository <ArrowUpRight className="w-4 h-4" />
            </a>
          </Button>
        </div>
      </article>
    </>
  )
}
