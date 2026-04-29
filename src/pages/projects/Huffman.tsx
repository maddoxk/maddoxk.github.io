import ProjectHero from '@/components/project/ProjectHero'
import CodeBlock from '@/components/project/CodeBlock'
import MediaEmbed from '@/components/project/MediaEmbed'
import NeonButton from '@/components/ui/NeonButton'

const WEIGHTS_CODE = `void generateWeights(String infName) {
    // Open the input file
    File inf = fio.getFileHandle(infName);
    int status = fio.getFileStatus(inf, true);

    // Make sure file is readable
    if(readErrorCheck(status)) return;

    // reset weights
    initWeights();
    BufferedReader br = fio.openBufferedReader(inf);
    int c = 0;
    try {
        // Read the input file one character at a time until EOF
        while ((c = br.read()) != -1) {
            try {
                weights[c]++;
            } catch (ArrayIndexOutOfBoundsException e) {
                // Ignore the character if it is not in the ASCII range
            }
        }
        // Increment the count for the EOF character
        weights[0]++;
        br.close();
    } catch (IOException e) {
        e.printStackTrace();
    }
    outf = fio.getFileHandle(infName + ".csv");
    saveWeightsToFile(outf.getName());
}`

const TREE_CODE = `/**
 * Builds the huffman tree. Make sure to:
 * 1) initialize root to null (cleanup any prior conversions)
 * 2) re-initialize the encodeMap
 * 3) initialize the queue
 * 4) build the tree:
 *    while the queue is not empty:
 *       pop the head of the queue into the left HuffmanTreeNode.
 *       if the queue is empty - set root = left, and return;
 *       pop the head of the queue into the right HuffmanTreeNode
 *       create a new non-leaf HuffmanTreeNode whose children are left and right,
 *       and whose weight is the sum of the weight of the left and right children
 *       add the new node back to the queue.
 */
void buildHuffmanTree(boolean minimize) {

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
        eyebrow="ALGORITHM // COMPRESSION"
        title="HUFFMAN COMPRESSION"
        subtitle="Data structures, algorithms, and variable-length prefix encoding."
      />
      <article className="px-6 max-w-4xl mx-auto py-12">
        <h2 className="font-display text-2xl text-cyan-neon mt-10 mb-4">History</h2>
        <p className="text-lg mb-4">
          Huffman compression, invented by David A. Huffman in 1952, revolutionized data encoding
          through its innovative variable-length prefix coding system. Inspired by a challenge from
          his MIT professor, Huffman developed an algorithm that efficiently allocated shorter codes
          to more frequently occurring symbols. This groundbreaking technique drastically reduced
          the average code length for messages, transforming the digital landscape and becoming
          widely adopted in various applications.
        </p>

        <h2 className="font-display text-2xl text-cyan-neon mt-12 mb-4">How Does Compression Work?</h2>
        <p className="mb-4">
          File compression is the process of reducing the size of a file to save disk space and make
          it easier to transfer. One popular method takes advantage of the fact that some characters
          appear more frequently in a file than others. By replacing frequently occurring characters
          with shorter codes, the overall size of the file can be reduced without losing any of the
          original information.
        </p>

        <h2 className="font-display text-2xl text-cyan-neon mt-12 mb-4">Implementation — Part 1: Encoding</h2>
        <p className="mb-4">
          Weights in Huffman Compression refer to the frequencies of characters in the input data.
          The algorithm assigns shorter codes to more frequently occurring characters and longer
          codes to less frequent ones, resulting in an efficient compression scheme. To utilize a
          balanced tree, follow these steps:
        </p>
        <ol className="list-decimal list-inside space-y-2 text-muted mb-6">
          <li>Determine the frequency (weight) of each character in the input data. <b className="text-fg">Characters with more frequency have more "Weight".</b></li>
          <li>Create a leaf node for each character and add it to a priority queue based on its frequency.</li>
          <li>While there is more than one node in the queue, remove the two nodes with the lowest frequencies.</li>
          <li>Create a new internal node with the sum of the two removed nodes' frequencies as its weight. This new node becomes the parent of the removed nodes.</li>
          <li>Insert the new internal node back into the priority queue.</li>
          <li>Repeat steps 3-5 until there is only one node left in the queue, which becomes the root of the balanced Huffman tree.</li>
          <li>Traverse the tree from the root to each leaf node, assigning a binary code (0 or 1) to each edge along the path. The final code for each character is the sequence of edge codes followed from the root to the corresponding leaf node.</li>
        </ol>
        <MediaEmbed src="/images/Huffman_huff_demo.gif" alt="Huffman compression demo animation" caption="Tree building in action." />

        <p className="mb-4">The following code reads an ASCII file and produces the weights:</p>
        <CodeBlock code={WEIGHTS_CODE} lang="java" />

        <p className="mb-4">The following code takes the weights and file and builds a Huffman tree:</p>
        <CodeBlock code={TREE_CODE} lang="java" />

        <h2 className="font-display text-2xl text-cyan-neon mt-12 mb-4">Implementation — Part 2: Decoding</h2>
        <p className="mb-4">
          The main objective is to restore the original data from the compressed version. Here's how
          Huffman decompression works:
        </p>
        <ol className="list-decimal list-inside space-y-2 text-muted mb-6">
          <li><b className="text-fg">Retrieve the Huffman tree:</b> To decode, you need the same tree used during compression. It's typically stored at the beginning of the compressed file.</li>
          <li><b className="text-fg">Traverse the Huffman tree:</b> Start at the root. Read bit by bit — 0 goes left, 1 goes right.</li>
          <li><b className="text-fg">Identify the character:</b> Continue until a leaf node is reached — that's a character. Append it to the output.</li>
          <li><b className="text-fg">Repeat:</b> Go back to the root and continue reading until end of compressed data.</li>
          <li><b className="text-fg">Terminate the output:</b> Some implementations use an EOF marker to signal end of data.</li>
        </ol>

        <h2 className="font-display text-2xl text-cyan-neon mt-12 mb-4">Key Takeaways</h2>
        <ol className="list-decimal list-inside space-y-3 text-muted mb-8">
          <li><b className="text-fg">Importance of data compression:</b> Huffman compression is a widely used lossless algorithm that highlights the significance of efficient data storage and transmission.</li>
          <li><b className="text-fg">Adaptive nature:</b> The algorithm adapts to the input, creating a unique tree and encoding for each file.</li>
          <li><b className="text-fg">Lossless compression:</b> No information is lost — the original data can be perfectly reconstructed.</li>
          <li><b className="text-fg">Binary tree structure:</b> The use of a binary tree is key, enabling efficient encoding and decoding.</li>
          <li><b className="text-fg">Greedy approach:</b> Huffman coding is greedy — most frequent characters get the shortest codes for optimal compression.</li>
          <li><b className="text-fg">Broad applications:</b> Used in image/audio/text compression and some network protocols like HTTP/2.</li>
          <li><b className="text-fg">Learning experience:</b> Implementing this teaches valuable lessons in data structures, algorithms, and programming.</li>
        </ol>

        <NeonButton href="https://github.com/maddoxk/">&gt; VIEW_ON_GITHUB</NeonButton>
      </article>
    </>
  )
}
