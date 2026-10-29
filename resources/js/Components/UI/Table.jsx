/**
 * Primitivas de tabla: encabezado fijo (sticky), filas que aparecen en cascada
 * y tonos de fila según el estado del registro.
 */
import { m } from 'framer-motion';
import { staggerContainer, staggerItem } from '../../lib/motion';

/**
 * Tabla con desplazamiento propio: el encabezado queda fijo al desplazarse.
 *
 * @param {Object} props
 * @param {string} [props.className] Clases para `<table>` (p. ej. un ancho mínimo).
 */
export default function Table({ className = '', children }) {
    return (
        <div className="max-h-[70vh] overflow-auto">
            <table className={`w-full border-separate border-spacing-0 text-left text-sm ${className}`}>{children}</table>
        </div>
    );
}

/**
 * @typedef {Object} Column
 * @property {string} label Texto del encabezado.
 * @property {import('react').ComponentType} [icon] Icono de lucide-react.
 * @property {'left'|'right'} [align='left'] Alineación.
 */

/**
 * Encabezado fijo de la tabla.
 *
 * @param {Object} props
 * @param {Column[]} props.columns Definición de columnas.
 */
export function TableHead({ columns }) {
    return (
        <thead>
            <tr>
                {columns.map(({ label, icon: Icon, align }) => (
                    <th
                        key={label}
                        scope="col"
                        className={`sticky top-0 z-10 border-b border-slate-200 bg-slate-50/95 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500 backdrop-blur ${align === 'right' ? 'text-right' : ''}`}
                    >
                        <span className={`inline-flex items-center gap-1.5 ${align === 'right' ? 'justify-end' : ''}`}>
                            {Icon && <Icon className="size-3.5 text-slate-400" aria-hidden="true" />}
                            {label}
                        </span>
                    </th>
                ))}
            </tr>
        </thead>
    );
}

/**
 * Cuerpo de tabla cuyas filas aparecen en cascada.
 *
 * @param {Object} props
 * @param {import('react').ReactNode} props.children Filas (`TableRow`).
 */
export function TableBody({ children }) {
    return (
        <m.tbody variants={staggerContainer(0.035)} initial="hidden" animate="show">
            {children}
        </m.tbody>
    );
}

/**
 * Tonos de fila. El acento lateral se dibuja en la primera celda porque
 * `box-shadow` sobre `<tr>` no es consistente entre navegadores.
 */
const ROW_TONES = {
    default: 'bg-white hover:bg-cobalt-50/40',
    emerald: 'bg-emerald-50/40 hover:bg-emerald-50/80 [&>td:first-child]:shadow-[inset_3px_0_0_var(--color-emerald-500)]',
    slate: 'bg-white hover:bg-slate-50 [&>td:first-child]:shadow-[inset_3px_0_0_var(--color-slate-300)]',
    rose: 'bg-rose-50/30 hover:bg-rose-50/70 [&>td:first-child]:shadow-[inset_3px_0_0_var(--color-rose-400)]',
};

/**
 * Fila animada con tono opcional según el estado.
 *
 * @param {Object} props
 * @param {keyof ROW_TONES} [props.tone='default'] Tono de la fila.
 */
export function TableRow({ tone = 'default', children }) {
    return (
        <m.tr variants={staggerItem} className={`transition-colors [&>td]:border-b [&>td]:border-slate-100 ${ROW_TONES[tone]}`}>
            {children}
        </m.tr>
    );
}

/**
 * Celda de datos.
 *
 * @param {Object} props
 * @param {'left'|'right'} [props.align='left'] Alineación.
 * @param {string} [props.className] Clases adicionales.
 */
export function Td({ align = 'left', className = '', children, ...props }) {
    return (
        <td className={`px-5 py-3.5 align-middle ${align === 'right' ? 'text-right' : ''} ${className}`} {...props}>
            {children}
        </td>
    );
}
