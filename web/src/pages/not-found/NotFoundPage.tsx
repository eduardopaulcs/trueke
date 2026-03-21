import { Link } from 'react-router-dom';
import { LandingNav } from '@/pages/home/components/LandingNav';
import { MinimalFooter } from '@/components/MinimalFooter';

export function NotFoundPage() {
  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <LandingNav />

      <div className="flex-1 flex flex-col items-center justify-center px-4 text-center gap-4">
        <p className="font-display text-8xl text-primary leading-none">404</p>
        <h1 className="text-2xl text-ink">Esta página no existe</h1>
        <p className="text-muted">El link puede estar roto o la página fue eliminada.</p>
        <Link to="/" className="btn-primary mt-4">
          Volver al inicio
        </Link>
      </div>

      <MinimalFooter />
    </div>
  );
}
