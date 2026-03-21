import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';

export function LandingFooter() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <footer className="bg-cream border-t border-[#E0D5CC] px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto flex flex-col items-center gap-6 md:flex-row md:justify-between">
        <div className="text-center md:text-left">
          <p className="font-display text-xl text-ink">Trueke</p>
          <p className="text-sm text-muted mt-0.5">La feria en tu bolsillo</p>
        </div>

        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted">
          <a href="#ferias" className="hover:text-ink transition-colors">
            Ferias
          </a>
          <a href="#marcas" className="hover:text-ink transition-colors">
            Marcas
          </a>
          {isAuthenticated ? (
            <>
              <Link to="/profile" className="hover:text-ink transition-colors">
                Mi perfil
              </Link>
              <button
                onClick={() => void logout()}
                className="hover:text-ink transition-colors"
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-ink transition-colors">
                Iniciar sesión
              </Link>
              <Link to="/register" className="hover:text-ink transition-colors">
                Registrarse
              </Link>
            </>
          )}
        </nav>

        <div className="flex flex-col items-center md:items-end gap-1">
          <p className="text-xs text-muted">
            © {new Date().getFullYear() > 2026 ? `2026–${new Date().getFullYear()}` : '2026'} Trueke.
            Todos los derechos reservados.
          </p>
          <div className="flex gap-4 text-xs text-muted">
            <Link to="/terms" className="hover:text-ink transition-colors">
              Términos y condiciones
            </Link>
            <Link to="/privacy" className="hover:text-ink transition-colors">
              Política de privacidad
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
