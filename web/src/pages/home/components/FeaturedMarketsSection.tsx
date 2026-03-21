import { isAppError } from '@/errors/app-error';
import { MarketCard } from '@/components/MarketCard';
import { SkeletonCard } from '@/components/SkeletonCard';
import { SectionHeading } from '@/components/SectionHeading';
import type { Market } from '@/types/domain.types';

interface FeaturedMarketsSectionProps {
  markets: Market[];
  isLoading: boolean;
  error: unknown;
}

export function FeaturedMarketsSection({ markets, isLoading, error }: FeaturedMarketsSectionProps) {
  return (
    <section id="ferias" className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          title="Ferias"
          subtitle="Encontrá ferias en tu zona y descubrí qué vendedores van a estar ahí."
        />

        <div className="mt-8">
          {isLoading ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <SkeletonCard count={3} />
            </div>
          ) : error ? (
            <p className="text-muted text-sm text-center py-8">
              {isAppError(error) ? error.userMessage : 'No se pudieron cargar las ferias.'}
            </p>
          ) : markets.length === 0 ? (
            <p className="text-muted text-center py-8">
              Todavía no hay ferias registradas. ¡Próximamente!
            </p>
          ) : (
            <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory -mx-4 px-4 pb-4 lg:grid lg:grid-cols-3 lg:overflow-visible lg:mx-0 lg:px-0">
              {markets.map((market) => (
                <div
                  key={market.id}
                  className="snap-center shrink-0 min-w-[80vw] sm:min-w-85 lg:min-w-0"
                >
                  <MarketCard market={market} />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-6 text-right">
          <a href="/markets" className="text-sm text-primary font-medium hover:text-primary-dark transition-colors">
            Ver todas las ferias →
          </a>
        </div>
      </div>
    </section>
  );
}
