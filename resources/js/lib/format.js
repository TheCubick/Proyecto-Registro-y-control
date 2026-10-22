/**
 * Utilidades de formato para fechas, duraciones y nombres en la interfaz.
 */

const dateTimeFormatter = new Intl.DateTimeFormat('es-MX', { dateStyle: 'medium', timeStyle: 'short' });
const dateFormatter = new Intl.DateTimeFormat('es-MX', { dateStyle: 'medium' });

/**
 * Convierte un valor de fecha en un objeto Date válido.
 *
 * @param {string|null|undefined} value Fecha en formato ISO enviada por Laravel.
 * @returns {Date|null} La fecha, o `null` si el valor está vacío o no es válido.
 */
function toDate(value) {
    if (!value) {
        return null;
    }

    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? null : date;
}

/**
 * Formatea fecha y hora en español de México (p. ej. "19 oct 2026, 10:30").
 *
 * @param {string|null|undefined} value Fecha ISO.
 * @param {string} [fallback='—'] Texto a mostrar si no hay fecha.
 * @returns {string}
 */
export function formatDateTime(value, fallback = '—') {
    const date = toDate(value);
    return date ? dateTimeFormatter.format(date) : fallback;
}

/**
 * Formatea solo la fecha (p. ej. "19 oct 2026").
 *
 * @param {string|null|undefined} value Fecha ISO.
 * @param {string} [fallback='—'] Texto a mostrar si no hay fecha.
 * @returns {string}
 */
export function formatDate(value, fallback = '—') {
    const date = toDate(value);
    return date ? dateFormatter.format(date) : fallback;
}

/**
 * Calcula la duración legible entre dos fechas (p. ej. "2 h 15 min").
 * Si no se indica la fecha final, calcula el tiempo transcurrido hasta ahora.
 *
 * @param {string} start Fecha ISO de inicio.
 * @param {string|null} [end] Fecha ISO de fin.
 * @returns {string|null} La duración, o `null` si las fechas no son válidas.
 */
export function formatDuration(start, end = null) {
    const from = toDate(start);
    const to = end ? toDate(end) : new Date();

    if (!from || !to || to < from) {
        return null;
    }

    const minutes = Math.floor((to - from) / 60000);
    const days = Math.floor(minutes / 1440);
    const hours = Math.floor((minutes % 1440) / 60);
    const rest = minutes % 60;

    if (days > 0) {
        return `${days} d ${hours} h`;
    }

    return hours > 0 ? `${hours} h ${rest} min` : `${rest} min`;
}

/**
 * Obtiene las iniciales de un nombre (máximo dos letras) para los avatares.
 *
 * @param {string|null|undefined} name Nombre completo.
 * @returns {string}
 */
export function initials(name) {
    if (!name) {
        return '?';
    }

    return name
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map(part => part[0]?.toUpperCase() ?? '')
        .join('');
}
