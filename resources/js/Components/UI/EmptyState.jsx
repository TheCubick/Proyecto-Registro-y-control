/**
 * Estado vacío: se muestra cuando un listado no tiene registros e invita
 * al usuario a crear el primero.
 */
import { m } from 'framer-motion';
import { bouncySpring, softSpring } from '../../lib/motion';

/**
 * @param {Object} props
 * @param {import('react').ComponentType} props.icon Icono ilustrativo.
 * @param {string} props.title Mensaje principal.
 * @param {string} [props.description] Texto de apoyo.
 * @param {import('react').ReactNode} [props.action] Botón de acción sugerida.
 */
export default function EmptyState({ icon: Icon, title, description, action }) {
    return (
        <div className="flex flex-col items-center px-6 py-16 text-center">
            <m.div className="relative" initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1, transition: bouncySpring }}>
                <span className="absolute inset-0 -m-3 rounded-[28px] bg-cobalt-100/50 blur-md" aria-hidden="true" />
                <span className="relative inline-flex size-20 items-center justify-center rounded-3xl border border-cobalt-100 bg-linear-to-br from-white to-cobalt-50 text-cobalt-600 shadow-lg shadow-cobalt-600/10">
                    <Icon className="size-9" strokeWidth={1.75} aria-hidden="true" />
                </span>
            </m.div>
            <m.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0, transition: { ...softSpring, delay: 0.1 } }}>
                <h3 className="mt-6 text-lg font-bold text-ink">{title}</h3>
                {description && <p className="mx-auto mt-1.5 max-w-sm text-sm leading-6 text-slate-600">{description}</p>}
                {action && <div className="mt-6 flex justify-center">{action}</div>}
            </m.div>
        </div>
    );
}
