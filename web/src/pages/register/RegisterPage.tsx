import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeSlash } from '@phosphor-icons/react';
import { useAuth } from '@/hooks/use-auth';
import { isAppError } from '@/errors/app-error';
import { registerSchema, type RegisterFormValues } from '@/schemas/auth.schemas';
import { FormField } from '@/components/FormField';
import { MinimalFooter } from '@/components/MinimalFooter';
import { LandingNav } from '@/pages/home/components/LandingNav';

const inputClass =
  'w-full border border-[#E0D5CC] rounded-brand px-3 py-2 text-sm text-ink bg-white ' +
  'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder:text-muted';

export function RegisterPage() {
  const { isAuthenticated, isLoading, register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({ resolver: zodResolver(registerSchema) });

  if (isLoading) return null;
  if (isAuthenticated) return <Navigate to="/home" replace />;

  async function onSubmit(values: RegisterFormValues) {
    setServerError(null);
    try {
      await registerUser(values.name, values.email, values.password);
      navigate('/home', { replace: true });
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
            <h1 className="text-2xl text-ink">Creá tu cuenta</h1>
            <p className="text-sm text-muted">
              Gratis. Siempre.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
            <FormField label="Nombre" htmlFor="name" error={errors.name?.message}>
              <input
                id="name"
                type="text"
                autoComplete="name"
                placeholder="Tu nombre"
                className={inputClass}
                {...register('name')}
              />
            </FormField>

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
                  autoComplete="new-password"
                  placeholder="Mínimo 12 caracteres"
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

            <FormField
              label="Confirmá tu contraseña"
              htmlFor="passwordConfirm"
              error={errors.passwordConfirm?.message}
            >
              <div className="relative">
                <input
                  id="passwordConfirm"
                  type={showPasswordConfirm ? 'text' : 'password'}
                  autoComplete="new-password"
                  placeholder="Repetí tu contraseña"
                  className={`${inputClass} pr-10`}
                  {...register('passwordConfirm')}
                />
                <button
                  type="button"
                  onClick={() => setShowPasswordConfirm((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-ink transition-colors"
                  aria-label={showPasswordConfirm ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                >
                  {showPasswordConfirm ? (
                    <EyeSlash size={16} weight="duotone" />
                  ) : (
                    <Eye size={16} weight="duotone" />
                  )}
                </button>
              </div>
            </FormField>

            {serverError && <p className="text-sm text-red-600">{serverError}</p>}

            <button type="submit" disabled={isSubmitting} className="btn-primary w-full mt-2">
              {isSubmitting ? 'Creando cuenta...' : 'Crear cuenta'}
            </button>
          </form>

          <p className="text-center text-sm text-muted">
            ¿Ya tenés cuenta?{' '}
            <Link to="/login" className="font-medium text-primary hover:text-primary-dark transition-colors">
              Iniciá sesión
            </Link>
          </p>
        </div>
      </div>

      <MinimalFooter />
    </div>
  );
}
