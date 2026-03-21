import { AppError } from './app-error';

const DEFAULT_MESSAGES: Record<number, string> = {
  400: 'Los datos enviados no son válidos.',
  401: 'Tu sesión expiró. Por favor ingresá de nuevo.',
  403: 'No tenés permiso para realizar esta acción.',
  404: 'El recurso solicitado no existe.',
  409: 'Ya existe un registro con estos datos.',
  422: 'No pudimos procesar la solicitud. Verificá los datos.',
  429: 'Demasiadas solicitudes. Esperá un momento e intentá de nuevo.',
  500: 'Ocurrió un error en el servidor. Intentá de nuevo más tarde.',
  503: 'El servicio no está disponible en este momento. Intentá más tarde.',
};

// [urlFragment, statusCode, userMessage]
// More specific patterns listed first — first match wins.
const CONTEXTUAL_MESSAGES: Array<[string, number, string]> = [
  ['/auth/login', 401, 'El email o la contraseña son incorrectos.'],
  ['/auth/register', 409, 'Ya existe una cuenta con ese email.'],
  ['/auth/register', 400, 'Verificá los datos. La contraseña debe tener al menos 12 caracteres.'],
  ['/users/me', 404, 'No encontramos tu perfil. Intentá cerrar sesión e ingresar de nuevo.'],
  ['/brands', 403, 'Solo el dueño de la marca puede hacer esta acción.'],
  ['/brands', 404, 'La marca no fue encontrada.'],
  ['/markets', 403, 'Solo el organizador puede modificar esta feria.'],
  ['/markets', 404, 'La feria no fue encontrada.'],
  ['/attendances', 403, 'Necesitás tener una marca para confirmar asistencia.'],
  ['/attendances', 404, 'La feria o la marca no fueron encontradas.'],
  ['/follow', 403, 'No podés seguir tu propia marca.'],
];

export function mapHttpError(
  statusCode: number,
  // Raw backend message intentionally discarded — never shown to users
  _rawMessage: string | string[] | undefined,
  url?: string,
): AppError {
  if (url) {
    const match = CONTEXTUAL_MESSAGES.find(
      ([pattern, code]) => url.includes(pattern) && code === statusCode,
    );
    if (match) {
      return new AppError(statusCode, match[2], url);
    }
  }

  const message = DEFAULT_MESSAGES[statusCode] ?? 'Ocurrió un error inesperado.';
  return new AppError(statusCode, message, url);
}

export function mapNetworkError(): AppError {
  return new AppError(0, 'No pudimos conectarnos al servidor. Verificá tu conexión.', 'network');
}
