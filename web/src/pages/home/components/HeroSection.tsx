export function HeroSection() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8 bg-cream">
      <div className="max-w-5xl mx-auto flex flex-col items-center text-center md:items-start md:text-left gap-6">
        <h1 className="text-5xl md:text-7xl text-ink leading-tight">
          ¿Quién va a estar en la{' '}
          <span className="text-primary">feria</span> este finde?
        </h1>

        <p className="text-muted text-lg md:text-xl">
          Seguí a tus vendedores favoritos y enterate antes que nadie dónde van a estar.{' '}
          <span className="font-medium text-ink">Gratis. Siempre.</span>
        </p>

        <div className="flex flex-wrap gap-3 justify-center md:justify-start w-full sm:w-auto">
          <a href="#ferias" className="btn-primary text-center">
            Explorá ferias
          </a>
          <a href="#marcas" className="btn-secondary text-center">
            Explorá marcas
          </a>
        </div>
      </div>
    </section>
  );
}
