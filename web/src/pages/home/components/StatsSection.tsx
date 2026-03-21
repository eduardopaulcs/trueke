interface StatsSectionProps {
  marketsTotal: number | undefined;
  brandsTotal: number | undefined;
  isLoading: boolean;
}

interface StatBlockProps {
  value: string;
  label: string;
  isLoading: boolean;
}

function StatBlock({ value, label, isLoading }: StatBlockProps) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span
        className={`text-4xl font-bold text-primary ${isLoading ? 'animate-pulse opacity-50' : ''}`}
      >
        {value}
      </span>
      <span className="text-sm text-muted">{label}</span>
    </div>
  );
}

export function StatsSection({ marketsTotal, brandsTotal, isLoading }: StatsSectionProps) {
  return (
    <section className="px-4 py-10 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-3 gap-4 text-center">
          <StatBlock
            value={marketsTotal != null ? `${marketsTotal}+` : '—'}
            label="ferias"
            isLoading={isLoading}
          />
          <StatBlock
            value={brandsTotal != null ? `${brandsTotal}+` : '—'}
            label="marcas"
            isLoading={isLoading}
          />
          <StatBlock value="0%" label="comisión" isLoading={false} />
        </div>
      </div>
    </section>
  );
}
