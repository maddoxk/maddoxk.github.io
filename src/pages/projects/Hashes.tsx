import ProjectHero from '@/components/project/ProjectHero'
import MediaEmbed from '@/components/project/MediaEmbed'

export default function Hashes() {
  return (
    <>
      <ProjectHero
        eyebrow="ALGORITHM // COLLISION_RESOLUTION"
        title="HASHES"
        subtitle="Data structures and algorithms: probing, chaining, and cuckoo hashing."
      />
      <article className="px-6 max-w-4xl mx-auto py-12">
        <h2 className="font-display text-2xl text-cyan-neon mt-10 mb-4">Description</h2>
        <p className="text-lg mb-4">
          In this project, the objective was to study and implement various hashing algorithms to
          efficiently store and retrieve data in a hash table. Hashing algorithms are widely used
          in computer science to provide fast access to data by mapping keys to array indices.
        </p>

        <h2 className="font-display text-2xl text-cyan-neon mt-12 mb-4">Hash Implementation</h2>
        <p className="mb-4">
          <b className="text-magenta-neon">Linear probing</b> is a technique where, if a collision
          occurs (i.e., two keys hash to the same index), the algorithm searches for the next
          available slot in the hash table sequentially. <b className="text-magenta-neon">Quadratic
          probing</b> uses a quadratic function to determine the next available slot.
        </p>
        <p className="mb-4">
          <b className="text-magenta-neon">Linked list hashing</b> handles collisions by creating a
          linked list at each index of the hash table. If multiple keys hash to the same index,
          they are stored as nodes in the linked list — a chain-like structure for collision
          resolution.
        </p>
        <p className="mb-4">
          <b className="text-magenta-neon">Cuckoo hashing</b> uses two separate hash functions to
          compute two different indices for each key. If a collision occurs at one index, the key
          is "kicked out" to its alternate index. This process continues until either an empty slot
          is found or a maximum number of kicks is reached.
        </p>

        <h2 className="font-display text-2xl text-cyan-neon mt-12 mb-4">Reflection</h2>
        <p className="mb-4">
          This project taught me different hashing algorithms and their benefits. Understanding the
          pros and cons of each helps with choosing one for a given application. Personally,
          understanding how to avoid clustering was a challenge. I wonder what other hashing
          algorithms are still undiscovered.
        </p>
        <p className="mb-6">You can browse the full analysis here:</p>
        <MediaEmbed src="/images/ADEN-Hashes-Analysis.pdf" type="pdf" />
      </article>
    </>
  )
}
