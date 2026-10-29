/**
 * Contenedores tipo tarjeta: superficie blanca, borde sutil y sombra difusa.
 */
import { m } from 'framer-motion';
import { cardHover, staggerItem } from '../../lib/motion';
import IconTile from './IconTile';

/**
 * Tarjeta base. Participa en animaciones escalonadas si su contenedor las define.
 *
 * @param {Object} props
 * @param {boolean} [props.interactive=false] Se eleva al pasar el cursor.
 * @param {string} [props.className] Clases adicionales.
 * @param {import('react').ReactNode} props.children
 */
export default function Card({ interactive = false, className = '', children }) {
    return (
        <m.div
            variants={staggerItem}
            {...(interactive ? cardHover : {})}
            className={`rounded-2xl border border-slate-200/50 bg-white shadow-sm ${interactive ? 'transition-shadow duration-200 hover:shadow-md hover:shadow-slate-900/10' : ''} ${className}`}
        >
            {children}
        </m.div>
    );
}

/**
 * Encabezado de tarjeta con título, descripción, icono y acciones opcionales.
 *
 * @param {Object} props
 * @param {string} props.title Título de la sección.
 * @param {import('react').ReactNode} [props.description] Texto secundario.
 * @param {import('react').ComponentType} [props.icon] Icono de lucide-react.
 * @param {string} [props.tone='cobalt'] Color del icono.
 * @param {import('react').ReactNode} [props.actions] Elementos a la derecha (badges, botones).
 */
export function CardHeader({ title, description, icon, tone = 'cobalt', actions }) {
    return (
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-5 py-4">
            <div className="flex items-center gap-3">
                {icon && <IconTile icon={icon} tone={tone} size="sm" />}
                <div>
                    <h2 className="text-[15px] font-bold text-ink">{title}</h2>
                    {description && <p className="mt-0.5 text-xs font-medium text-slate-500">{description}</p>}
                </div>
            </div>
            {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
        </div>
    );
}
