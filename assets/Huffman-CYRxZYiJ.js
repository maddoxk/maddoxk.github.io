import{d as e}from"./charts-BFyy7DZ_.js";import{t}from"./ProjectHero-I_JQfF1p.js";import{t as n}from"./CodeBlock-BUR2VYUr.js";import{c as r,f as i,p as a}from"./index-C4Y4Sd27.js";import{t as o}from"./MediaEmbed-DAZa1UTl.js";var s=e(),c=`void generateWeights(String infName) {
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
}`,l=`void buildHuffmanTree(boolean minimize) {
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
}`;function u(){return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t,{eyebrow:`Algorithmic Compression`,title:`Huffman Compression Engine`,subtitle:`Data structures, prefix tree encoding, and variable-length lossless compression.`}),(0,s.jsxs)(`article`,{className:`px-6 max-w-4xl mx-auto py-12 text-muted-foreground leading-relaxed`,children:[(0,s.jsx)(`h2`,{className:`text-2xl font-bold text-foreground mt-8 mb-4`,children:`Background`}),(0,s.jsx)(`p`,{className:`text-lg text-foreground/90 mb-6`,children:`Huffman compression (David A. Huffman, 1952) assigns shorter binary codes to more frequent symbols in a dataset, generating optimal prefix-free codes that minimize average bit length without data loss.`}),(0,s.jsx)(`h2`,{className:`text-2xl font-bold text-foreground mt-10 mb-4`,children:`Implementation: Building the Frequency Weights`}),(0,s.jsx)(`p`,{className:`mb-4`,children:`The first phase parses character distributions across the file stream to build frequency weights:`}),(0,s.jsx)(n,{code:c,lang:`java`}),(0,s.jsx)(`h2`,{className:`text-2xl font-bold text-foreground mt-10 mb-4`,children:`Building the Huffman Tree`}),(0,s.jsx)(`p`,{className:`mb-4`,children:`Using a Priority Queue, pairs of lowest-weight nodes are repeatedly combined into subtree nodes until a single root remains:`}),(0,s.jsx)(o,{src:`/images/Huffman_huff_demo.gif`,alt:`Huffman compression demo animation`,caption:`Tree construction in action.`}),(0,s.jsx)(n,{code:l,lang:`java`}),(0,s.jsx)(`h2`,{className:`text-2xl font-bold text-foreground mt-10 mb-4`,children:`Decoding Process`}),(0,s.jsxs)(`ol`,{className:`list-decimal list-inside space-y-2 mb-8 text-muted-foreground`,children:[(0,s.jsx)(`li`,{children:`Read tree header serialized at beginning of compressed file`}),(0,s.jsx)(`li`,{children:`Traverse from root downward for each bit (0 = Left, 1 = Right)`}),(0,s.jsx)(`li`,{children:`Output character symbol upon reaching leaf node & reset to root`})]}),(0,s.jsx)(`h2`,{className:`text-2xl font-bold text-foreground mt-10 mb-4`,children:`Key Takeaways`}),(0,s.jsxs)(`ul`,{className:`list-disc list-inside space-y-2 mb-10 text-muted-foreground`,children:[(0,s.jsx)(`li`,{children:`Greedy algorithms for optimal prefix-free binary trees`}),(0,s.jsx)(`li`,{children:`Efficient bitwise I/O streaming & priority queue management`}),(0,s.jsx)(`li`,{children:`Lossless compression mechanics applied across web formats`})]}),(0,s.jsx)(r,{size:`lg`,asChild:!0,className:`gap-2`,children:(0,s.jsxs)(`a`,{href:`https://github.com/maddoxk/`,target:`_blank`,rel:`noreferrer`,children:[(0,s.jsx)(i,{className:`w-4 h-4`}),` View Source on GitHub `,(0,s.jsx)(a,{className:`w-4 h-4`})]})})]})]})}export{u as default};