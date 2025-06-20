// src/utils/formatDate.js

/**
 * Parsowanie date z różnych formatów.
 * Obsługa: ISO (2025-06-21T23:59:59) oraz DD-MM-YYYY (29-06-2025)
 * @param {string} date
 * @returns {Date|null}
 */
export function parseDateSmart(date) {
  if (!date) return null;

  let parsed = new Date(date);
  if (!isNaN(parsed.getTime())) return parsed;

  const match = /^(\d{2})-(\d{2})-(\d{4})$/.exec(date);
  if (match) {
    const [, dd, mm, yyyy] = match;
    return new Date(`${yyyy}-${mm}-${dd}`);
  }

  return null;
}

/**
 * Formatowanie daty do "dd-mm-yyyy" lub "Brak informacji"
 * @param {string} date
 * @returns {string}
 */
export function formatDate(date) {
  const parsed = parseDateSmart(date);
  if (!parsed) return 'Brak informacji';
  const dd = String(parsed.getDate()).padStart(2, '0');
  const mm = String(parsed.getMonth() + 1).padStart(2, '0');
  return `${dd}-${mm}-${parsed.getFullYear()}`;
}
