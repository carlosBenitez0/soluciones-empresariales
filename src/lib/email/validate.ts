const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Returns the trimmed string if it is a non-empty string up to `max` chars, otherwise null. */
export const cleanString = (value: unknown, max = 200): string | null =>
  typeof value === 'string' && value.trim().length > 0 && value.trim().length <= max ? value.trim() : null;

export const cleanEmail = (value: unknown): string | null => {
  const email = cleanString(value, 254);
  return email && EMAIL_PATTERN.test(email) ? email : null;
};
