type Props = {
  src: string
  type?: 'image' | 'video' | 'pdf'
  caption?: string
  alt?: string
  width?: string
}

export default function MediaEmbed({ src, type = 'image', caption, alt = '', width = '100%' }: Props) {
  return (
    <figure className="my-8" style={{ width }}>
      <div className="panel cyber-border overflow-hidden" style={{ borderColor: 'var(--neon-cyan)' }}>
        {type === 'image' && (
          <img src={src} alt={alt} loading="lazy" className="w-full h-auto block" />
        )}
        {type === 'video' && (
          <video src={src} autoPlay muted loop playsInline className="w-full h-auto block" />
        )}
        {type === 'pdf' && (
          <div className="p-6 flex flex-col gap-3">
            <div className="font-mono text-sm text-cyan-neon">&gt; DOCUMENT.pdf</div>
            <div className="text-muted text-sm truncate">{src.split('/').pop()}</div>
            <a
              href={src}
              target="_blank"
              rel="noreferrer"
              className="self-start inline-flex items-center gap-2 px-4 py-2 border border-cyan-neon text-cyan-neon font-mono text-xs tracking-widest hover:glow-cyan transition-all"
            >
              &gt; OPEN_DOCUMENT
            </a>
          </div>
        )}
      </div>
      {caption && <figcaption className="mt-3 text-muted text-sm font-mono">// {caption}</figcaption>}
    </figure>
  )
}
