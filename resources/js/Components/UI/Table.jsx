/**
 * Primitivas de tabla con estilo uniforme: contenedor con desplazamiento
 * horizontal, encabezados con icono y celdas con espaciado consistente.
 */

/**
 * Tabla con desplazamiento horizontal en pantallas pequeñas.
 *
 * @param {Object} props
 * @param {string} [props.className] Clases para `<table>` (p. ej. un ancho mínimo).
 */
export default function Table({ className = '', children }) {
    return (
        <div className="overflow-x-auto">
            <table className={`w-full text-left text-sm ${className}`}>{children}</table>
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
 * Encabezado de la tabla.
 *
 * @param {Object} props
 * @param {Column[]} props.columns Definición de columnas.
 */
export function TableHead({ columns }) {
    return (
        <thead className="border-b border-slate-200 bg-slate-50/80">
            <tr>
                {columns.map(({ label, icon: Icon, align }) => (
                    <th key={label} scope="col" className={`px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500 ${align === 'right' ? 'text-right' : ''}`}>
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

/** Clases compartidas para el cuerpo y las filas de tabla. */
export const tbodyClass = 'divide-y divide-slate-100';
export const rowClass = 'transition-colors hover:bg-cobalt-50/40';
