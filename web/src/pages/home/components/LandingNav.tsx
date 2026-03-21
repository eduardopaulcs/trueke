import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';

export function LandingNav() {
  const { user, isAuthenticated, isLoading, logout } = useAuth();

  return (
    <header className="sticky top-0 z-10 bg-cream/90 backdrop-blur border-b border-[#E0D5CC] px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto flex items-center justify-between h-14">
        <Link to="/" className="font-display text-xl text-primary">
          Trueke
        </Link>

        {!isLoading && (
          <nav className="flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <span className="text-sm text-muted hidden sm:inline">
                  Hola, {user!.name.split(' ')[0]}
                </span>
                <button
                  onClick={() => void logout()}
                  className="text-sm text-muted font-medium hover:text-ink transition-colors"
                >
                  Cerrar sesión
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm text-muted font-medium hover:text-ink transition-colors"
                >
                  Iniciar sesión
                </Link>
                <Link to="/register" className="btn-primary text-sm py-2">
                  Registrarse
                </Link>
              </>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}
