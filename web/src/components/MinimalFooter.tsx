import { Link } from 'react-router-dom';

export function MinimalFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[#E0D5CC] px-4 py-6 text-center">
      <p className="text-xs text-muted">
        © {year > 2026 ? `2026–${year}` : '2026'} Trueke. Todos los derechos reservados.
      </p>
      <div className="flex justify-center gap-4 mt-1 text-xs text-muted">
        <Link to="/terms" className="hover:text-ink transition-colors">
          Términos y condiciones
        </Link>
        <Link to="/privacy" className="hover:text-ink transition-colors">
          Política de privacidad
        </Link>
      </div>
    </footer>
  );
}
