import { isAppError } from '@/errors/app-error';
import { BrandCard } from '@/components/BrandCard';
import { SkeletonCard } from '@/components/SkeletonCard';
import { SectionHeading } from '@/components/SectionHeading';
import type { Brand } from '@/types/domain.types';

interface FeaturedBrandsSectionProps {
  brands: Brand[];
  isLoading: boolean;
  error: unknown;
}

export function FeaturedBrandsSection({ brands, isLoading, error }: FeaturedBrandsSectionProps) {
  return (
    <section id="marcas" className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          title="Marcas"
          subtitle="Emprendedores, artesanos y comerciantes que ya usan Trueke."
        />

        <div className="mt-8">
          {isLoading ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <SkeletonCard count={3} />
            </div>
          ) : error ? (
            <p className="text-muted text-sm text-center py-8">
              {isAppError(error) ? error.userMessage : 'No se pudieron cargar las marcas.'}
            </p>
          ) : brands.length === 0 ? (
            <p className="text-muted text-center py-8">Todavía no hay marcas registradas.</p>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {brands.map((brand) => (
                <BrandCard key={brand.id} brand={brand} />
              ))}
            </div>
          )}
        </div>

        <div className="mt-6 text-right">
          <a href="/brands" className="text-sm text-primary font-medium hover:text-primary-dark transition-colors">
            Conocé más marcas →
          </a>
        </div>
      </div>
    </section>
  );
}
