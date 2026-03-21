import { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeSlash } from '@phosphor-icons/react';
import { useAuth } from '@/hooks/use-auth';
import { isAppError } from '@/errors/app-error';
import { loginSchema, type LoginFormValues } from '@/schemas/auth.schemas';
import { FormField } from '@/components/FormField';
import { MinimalFooter } from '@/components/MinimalFooter';
import { LandingNav } from '@/pages/home/components/LandingNav';

const inputClass =
  'w-full border border-[#E0D5CC] rounded-brand px-3 py-2 text-sm text-ink bg-white ' +
  'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder:text-muted';

export function LoginPage() {
  const { isAuthenticated, isLoading, login } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({ resolver: zodResolver(loginSchema) });

  if (isLoading) return null;
  if (isAuthenticated) return <Navigate to="/home" replace />;

  const from = (location.state as { from?: { pathname: string } } | null)?.from?.pathname ?? '/home';

  async function onSubmit(values: LoginFormValues) {
    setServerError(null);
    try {
      await login(values.email, values.password);
      navigate(from, { replace: true });
    } catch (err) {
      setServerError(isAppError(err) ? err.userMessage : 'Ocurrió un error inesperado.');
    }
  }

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <LandingNav />

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="card w-full max-w-sm flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl text-ink">Iniciá sesión</h1>
            <p className="text-sm text-muted">Bienvenido de vuelta a Trueke.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
            <FormField label="Email" htmlFor="email" error={errors.email?.message}>
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="tu@email.com"
                className={inputClass}
                {...register('email')}
              />
            </FormField>

            <FormField label="Contraseña" htmlFor="password" error={errors.password?.message}>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="Tu contraseña"
                  className={`${inputClass} pr-10`}
                  {...register('password')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-ink transition-colors"
                  aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                >
                  {showPassword ? (
                    <EyeSlash size={16} weight="duotone" />
                  ) : (
                    <Eye size={16} weight="duotone" />
                  )}
                </button>
              </div>
            </FormField>

            {serverError && <p className="text-sm text-red-600">{serverError}</p>}

            <button type="submit" disabled={isSubmitting} className="btn-primary w-full mt-2">
              {isSubmitting ? 'Ingresando...' : 'Iniciar sesión'}
            </button>
          </form>

          <p className="text-center text-sm text-muted">
            ¿No tenés cuenta?{' '}
            <Link to="/register" className="font-medium text-primary hover:text-primary-dark transition-colors">
              Registrate
            </Link>
          </p>
        </div>
      </div>

      <MinimalFooter />
    </div>
  );
}
