import {
  MagnifyingGlass,
  Heart,
  Sun,
  Storefront,
  CalendarCheck,
  EnvelopeSimple,
} from '@phosphor-icons/react';
import { SectionHeading } from '@/components/SectionHeading';

interface Step {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const visitorSteps: Step[] = [
  {
    icon: <MagnifyingGlass size={28} weight="duotone" />,
    title: 'Buscá tu feria',
    description: 'Encontrá las ferias de tu barrio o zona preferida.',
  },
  {
    icon: <Heart size={28} weight="duotone" />,
    title: 'Seguí a tus vendedores',
    description: 'Seguí tus marcas favoritas para recibir avisos cuando confirman asistencia.',
  },
  {
    icon: <Sun size={28} weight="duotone" />,
    title: '¡A la feria!',
    description: 'Sabé exactamente qué vendedores van a estar antes de salir de tu casa.',
  },
];

const vendorSteps: Step[] = [
  {
    icon: <Storefront size={28} weight="duotone" />,
    title: 'Creá tu marca',
    description: 'Mostrale al mundo quién sos, qué hacés y lo que te hace único.',
  },
  {
    icon: <CalendarCheck size={28} weight="duotone" />,
    title: 'Confirmá tu asistencia',
    description: 'Avisá en cuál feria vas a estar y en qué fecha.',
  },
  {
    icon: <EnvelopeSimple size={28} weight="duotone" />,
    title: 'Llegá a más clientes',
    description: 'Tus seguidores reciben una notificación cuando confirmás.',
  },
];

function StepList({ steps }: { steps: Step[] }) {
  return (
    <div className="flex flex-col gap-6">
      {steps.map((step) => (
        <div key={step.title} className="flex items-start gap-4">
          <div className="text-primary shrink-0 mt-0.5">{step.icon}</div>
          <div>
            <p className="font-semibold text-ink">{step.title}</p>
            <p className="text-sm text-muted mt-0.5">{step.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function HowItWorksSection() {
  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          title="¿Cómo funciona?"
          subtitle="Trueke conecta visitantes con vendedores."
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted mb-6">
              Para visitantes
            </p>
            <StepList steps={visitorSteps} />
          </div>

          <div className="md:border-l md:border-[#E0D5CC] md:pl-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted mb-6">
              Para vendedores
            </p>
            <StepList steps={vendorSteps} />
          </div>
        </div>
      </div>
    </section>
  );
}
