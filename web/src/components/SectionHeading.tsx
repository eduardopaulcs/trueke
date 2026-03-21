interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

export function SectionHeading({ title, subtitle, align = 'left' }: SectionHeadingProps) {
  return (
    <div className={align === 'center' ? 'text-center' : ''}>
      <h2 className="text-2xl md:text-3xl text-ink font-bold">{title}</h2>
      {subtitle && <p className="text-muted mt-2 text-base">{subtitle}</p>}
    </div>
  );
}
