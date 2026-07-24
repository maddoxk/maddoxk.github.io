import ProjectHero from '@/components/project/ProjectHero'
import MediaEmbed from '@/components/project/MediaEmbed'
import { Card, CardContent } from '@/components/ui/card'

export default function Hashes() {
  return (
    <>
      <ProjectHero
        eyebrow="Data Structures"
        title="Hash Collision Resolution"
        subtitle="Studying and benchmarking probing, chaining, and cuckoo hashing strategies."
      />
      <article className="px-6 max-w-4xl mx-auto py-12 text-muted-foreground leading-relaxed">
        <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Overview</h2>
        <p className="text-lg text-foreground/90 mb-6">
          This project involved studying and benchmarking various hashing techniques to efficiently store and retrieve keys in constant time O(1) while resolving memory collisions.
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">Implemented Collision Strategies</h2>
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <Card className="bg-card/40 border-border/50">
            <CardContent className="p-5">
              <h4 className="font-semibold text-foreground mb-1">Linear & Quadratic Probing</h4>
              <p className="text-sm text-muted-foreground">Sequentially or quadratically searches adjacent array slots upon collision to find available buckets.</p>
            </CardContent>
          </Card>

          <Card className="bg-card/40 border-border/50">
            <CardContent className="p-5">
              <h4 className="font-semibold text-foreground mb-1">Chaining (Linked Lists)</h4>
              <p className="text-sm text-muted-foreground">Stores colliding keys as linked list nodes at each bucket index, allowing unbounded capacity.</p>
            </CardContent>
          </Card>

          <Card className="bg-card/40 border-border/50 md:col-span-2">
            <CardContent className="p-5">
              <h4 className="font-semibold text-foreground mb-1">Cuckoo Hashing</h4>
              <p className="text-sm text-muted-foreground">Uses dual hash functions and alternate key relocation ("kicking") to guarantee O(1) worst-case lookup performance.</p>
            </CardContent>
          </Card>
        </div>

        <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">Analysis & Document</h2>
        <p className="mb-6">
          Exploring primary and secondary clustering revealed key tradeoffs in load factors, cache locality, and rehash penalties.
        </p>
        <MediaEmbed src="/images/ADEN-Hashes-Analysis.pdf" type="pdf" />
      </article>
    </>
  )
}
