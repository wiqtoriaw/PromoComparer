// src/utils/formatDate.js

/**
 * Spróbuj sparsować datę z różnych formatów.
 * Obsługa: ISO (2025-06-21T23:59:59) oraz DD-MM-YYYY (29-06-2025)
 * @param {string} date
 * @returns {Date|null}
 */
export function parseDateSmart(date) {
  if (!date) return null;

  // Spróbuj ISO (domyślny parser)
  let parsed = new Date(date);
  if (!isNaN(parsed.getTime())) return parsed;

  // Spróbuj DD-MM-YYYY (np. z TopPromotions)
  const match = /^(\d{2})-(\d{2})-(\d{4})$/.exec(date);
  if (match) {
    const [, dd, mm, yyyy] = match;
    // new Date("2025-06-29") - uniwersalny format ISO
    return new Date(`${yyyy}-${mm}-${dd}`);
  }

  // Nieznany format
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
