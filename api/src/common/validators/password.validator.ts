import { registerDecorator, ValidationOptions } from 'class-validator';

// Password rules per NIST SP 800-63B and OWASP ASVS 2.1:
// - Minimum 12 characters (OWASP ASVS 2.1.1)
// - No maximum length restriction — allow long passphrases (NIST §5.1.1.2, OWASP ASVS 2.1.2)
// - No mandatory complexity (uppercase/numbers/symbols) — explicitly prohibited by both standards
// - Accept any printable Unicode character
//
// Note: bcrypt silently truncates input beyond 72 bytes. This is an implementation detail,
// not a security rule — users can still submit longer passwords; the behavior is documented.

const MIN_LENGTH = 12;

export function IsStrongPassword(options?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isStrongPassword',
      target: object.constructor,
      propertyName,
      options: {
        message: `Password must be at least ${MIN_LENGTH} characters`,
        ...options,
      },
      validator: {
        validate(value: unknown) {
          return typeof value === 'string' && value.length >= MIN_LENGTH;
        },
      },
    });
  };
}
