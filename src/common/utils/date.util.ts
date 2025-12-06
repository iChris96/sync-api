/*
 * return the current date in the format YYYY-MM-DD
 * from: 2025-12-06T00:00:00.000Z
 * to: 2025-12-06
 */
export function getTodayDateString(): string {
  return new Date().toISOString().split('T')[0];
}
