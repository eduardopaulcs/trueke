// Centralized date formatting for backend dates.
// The backend always sends UTC datetimes ("2024-11-15T00:00:00.000Z").
// All date parsing and formatting in the app must go through this module.

const DATE_FORMATTER = new Intl.DateTimeFormat('es-AR', {
  dateStyle: 'long',
  timeZone: 'UTC',
});

const DATETIME_FORMATTER = new Intl.DateTimeFormat('es-AR', {
  dateStyle: 'short',
  timeStyle: 'short',
  timeZone: 'America/Argentina/Buenos_Aires',
});

// Extracts the date portion from a UTC ISO string.
// Use for fields stored as @db.Date (e.g. Attendance.date).
// "2024-11-15T00:00:00.000Z" → "2024-11-15"
export function toDateString(iso: string): string {
  return iso.split('T')[0];
}

// Human-readable date in es-AR, interpreted as UTC to avoid day offset.
// "2024-11-15T00:00:00.000Z" → "15 de noviembre de 2024"
export function formatDate(iso: string): string {
  return DATE_FORMATTER.format(new Date(iso));
}

// Human-readable datetime in Buenos Aires timezone.
// "2024-11-15T13:30:00.000Z" → "15/11/2024, 10:30"
export function formatDateTime(iso: string): string {
  return DATETIME_FORMATTER.format(new Date(iso));
}
