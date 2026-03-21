import type { Brand } from '@/types/domain.types';

const MAX_VISIBLE_CATEGORIES = 3;

interface BrandCardProps {
  brand: Brand;
}

export function BrandCard({ brand }: BrandCardProps) {
  const visibleCategories = brand.categories.slice(0, MAX_VISIBLE_CATEGORIES);
  const overflowCount = brand.categories.length - MAX_VISIBLE_CATEGORIES;

  return (
    <div className="card flex flex-col gap-2 min-h-[140px]">
      <h3 className="font-semibold text-ink text-base leading-tight">{brand.name}</h3>
      {brand.description && (
        <p className="text-sm text-muted line-clamp-2">{brand.description}</p>
      )}
      {brand.categories.length > 0 && (
        <div className="flex gap-1 flex-wrap mt-1">
          {visibleCategories.map((cat) => (
            <span key={cat} className="tag tag-primary">
              {cat}
            </span>
          ))}
          {overflowCount > 0 && (
            <span className="tag tag-primary">+{overflowCount}</span>
          )}
        </div>
      )}
      <p className="text-xs text-muted mt-auto pt-2">por {brand.owner.name}</p>
    </div>
  );
}
