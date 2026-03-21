import { Link } from 'react-router-dom';
import type { Market } from '@/types/domain.types';

interface MarketCardProps {
  market: Market;
}

export function MarketCard({ market }: MarketCardProps) {
  return (
    <div className="card flex flex-col gap-2 min-h-[140px]">
      <h3 className="font-semibold text-ink text-base leading-tight">{market.name}</h3>
      <p className="text-sm text-muted truncate">{market.address}</p>
      <p className="text-xs text-muted">{market.location.name}</p>
      <div className="flex gap-2 flex-wrap mt-1">
        {market.verified && <span className="tag tag-active">Verificada</span>}
        {!market.active && <span className="tag tag-pending">Inactiva</span>}
      </div>
      <Link
        to={`/markets/${market.id}`}
        className="text-sm text-primary font-medium mt-auto pt-2 hover:text-primary-dark transition-colors"
      >
        Ver feria →
      </Link>
    </div>
  );
}
