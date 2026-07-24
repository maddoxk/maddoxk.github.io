import ProjectHero from '@/components/project/ProjectHero'
import CodeBlock from '@/components/project/CodeBlock'
import MediaEmbed from '@/components/project/MediaEmbed'
import { Button } from '@/components/ui/button'
import { Github, ArrowUpRight } from 'lucide-react'

const WEIGHTS_CODE = `void generateWeights(String infName) {
    File inf = fio.getFileHandle(infName);
    int status = fio.getFileStatus(inf, true);
    if (readErrorCheck(status)) return;

    initWeights();
    BufferedReader br = fio.openBufferedReader(inf);
    int c = 0;
    try {
        while ((c = br.read()) != -1) {
            try { weights[c]++; } 
            catch (ArrayIndexOutOfBoundsException e) {}
        }
        weights[0]++; // EOF marker
        br.close();
    } catch (IOException e) {
        e.printStackTrace();
    }
}`

const TREE_CODE = `void buildHuffmanTree(boolean minimize) {
    HuffmanTreeNode left, right;
    root = null;
    encodeMap = new String[NUM_ASCII];
    initializeHuffmanQueue(minimize);

    while (!queue.isEmpty()) {
        left = queue.poll();
        if (queue.isEmpty()) {
            root = left;
            return;
        }
        right = queue.poll();
        queue.add(new HuffmanTreeNode(left.getWeight() + right.getWeight(), left, right));
    }
}`

export default function Huffman() {
  return (
    <>
      <ProjectHero
        eyebrow="Algorithmic Compression"
        title="Huffman Compression Engine"
        subtitle="Data structures, prefix tree encoding, and variable-length lossless compression."
      />
      <article className="px-6 max-w-4xl mx-auto py-12 text-muted-foreground leading-relaxed">
        <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Background</h2>
        <p className="text-lg text-foreground/90 mb-6">
          Huffman compression (David A. Huffman, 1952) assigns shorter binary codes to more frequent symbols in a dataset, generating optimal prefix-free codes that minimize average bit length without data loss.
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">Implementation: Building the Frequency Weights</h2>
        <p className="mb-4">
          The first phase parses character distributions across the file stream to build frequency weights:
        </p>
        <CodeBlock code={WEIGHTS_CODE} lang="java" />

        <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">Building the Huffman Tree</h2>
        <p className="mb-4">
          Using a Priority Queue, pairs of lowest-weight nodes are repeatedly combined into subtree nodes until a single root remains:
        </p>
        <MediaEmbed src="/images/Huffman_huff_demo.gif" alt="Huffman compression demo animation" caption="Tree construction in action." />
        <CodeBlock code={TREE_CODE} lang="java" />

        <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">Decoding Process</h2>
        <ol className="list-decimal list-inside space-y-2 mb-8 text-muted-foreground">
          <li>Read tree header serialized at beginning of compressed file</li>
          <li>Traverse from root downward for each bit (0 = Left, 1 = Right)</li>
          <li>Output character symbol upon reaching leaf node & reset to root</li>
        </ol>

        <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">Key Takeaways</h2>
        <ul className="list-disc list-inside space-y-2 mb-10 text-muted-foreground">
          <li>Greedy algorithms for optimal prefix-free binary trees</li>
          <li>Efficient bitwise I/O streaming & priority queue management</li>
          <li>Lossless compression mechanics applied across web formats</li>
        </ul>

        <Button size="lg" asChild className="gap-2">
          <a href="https://github.com/maddoxk/" target="_blank" rel="noreferrer">
            <Github className="w-4 h-4" /> View Source on GitHub <ArrowUpRight className="w-4 h-4" />
          </a>
        </Button>
      </article>
    </>
  )
}
