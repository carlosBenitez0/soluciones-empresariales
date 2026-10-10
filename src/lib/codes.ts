// Unambiguous alphabet (no 0/O, 1/I/L) so codes are easy to read and type.
const ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';

/**
 * Generates a random code like `APP-7K3QXM`.
 * Uses crypto.getRandomValues so codes cannot be guessed by enumerating short numbers.
 */
export const generateCode = (prefix: string, length = 6): string => {
  const bytes = new Uint8Array(length);
  crypto.getRandomValues(bytes);
  const body = Array.from(bytes, (b) => ALPHABET[b % ALPHABET.length]).join('');
  return `${prefix}-${body}`;
};

export const normalizeCode = (code: string): string => code.trim().toUpperCase();
