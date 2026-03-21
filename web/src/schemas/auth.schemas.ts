import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().min(1, 'El email es requerido.').email('Ingresá un email válido.'),
  password: z.string().min(1, 'La contraseña es requerida.'),
});

export const registerSchema = z
  .object({
    name: z.string().min(1, 'El nombre es requerido.').max(100),
    email: z.string().min(1, 'El email es requerido.').email('Ingresá un email válido.'),
    password: z
      .string()
      .min(1, 'La contraseña es requerida.')
      .min(12, 'La contraseña debe tener al menos 12 caracteres.'),
    passwordConfirm: z.string().min(1, 'La contraseña es requerida.'),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: 'Las contraseñas no coinciden.',
    path: ['passwordConfirm'],
  });

export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;
