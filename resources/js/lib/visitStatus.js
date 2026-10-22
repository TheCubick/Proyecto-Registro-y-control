/**
 * Catálogo de estados de una visita (`visits.status`) y su representación visual.
 *
 * Las claves coinciden exactamente con el enum de la migración y con
 * `Rule::in(['dentro', 'completado', 'cancelado'])` de las FormRequests.
 */
import { CircleCheck, CircleX, DoorOpen } from 'lucide-react';

/**
 * @typedef {Object} VisitStatusMeta
 * @property {string} label Etiqueta para el usuario.
 * @property {string} option Texto que se muestra en el selector del formulario.
 * @property {'emerald'|'slate'|'rose'} tone Color semántico del estado.
 * @property {import('react').ComponentType} icon Icono de lucide-react.
 */

/** @type {Record<string, VisitStatusMeta>} */
export const VISIT_STATUSES = {
    dentro: { label: 'En edificio', option: 'Dentro', tone: 'emerald', icon: DoorOpen },
    completado: { label: 'Salida registrada', option: 'Completado', tone: 'slate', icon: CircleCheck },
    cancelado: { label: 'Cancelada', option: 'Cancelado', tone: 'rose', icon: CircleX },
};

/**
 * Devuelve los metadatos de un estado; si el valor no existe, usa un estado neutro.
 *
 * @param {string} status Valor de `visits.status`.
 * @returns {VisitStatusMeta}
 */
export function visitStatus(status) {
    return VISIT_STATUSES[status] ?? { label: status ?? 'Sin estado', option: status, tone: 'slate', icon: CircleCheck };
}
