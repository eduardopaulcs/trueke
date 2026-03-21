import { Link } from 'react-router-dom';

export function VendorCtaSection() {
  return (
    <section className="bg-primary px-4 py-16 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl text-white">
          ¿Tenés un emprendimiento?
        </h2>
        <p className="text-white/80 mt-4 text-lg">
          Registrá tu marca, confirmá tu próxima feria y llegá a cientos de clientes que ya te
          están buscando. Gratis. Siempre.
        </p>
        <Link
          to="/register"
          className="inline-block mt-8 bg-white text-primary font-medium px-6 py-3 rounded-brand hover:bg-primary-light transition-colors"
        >
          Empezá gratis →
        </Link>
      </div>
    </section>
  );
}
