export default function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return (
    <div className="mb-8">
      <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider block mb-1">
        {eyebrow}
      </span>
      <h2 className="font-sans text-2xl sm:text-4xl font-bold tracking-tight text-foreground">
        {title}
      </h2>
      {description && (
        <p className="mt-2 text-muted-foreground text-base max-w-xl">
          {description}
        </p>
      )}
    </div>
  )
}
