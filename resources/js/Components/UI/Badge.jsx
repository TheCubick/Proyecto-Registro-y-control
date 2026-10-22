/**
 * Insignias (badges) para estados, etiquetas y avisos.
 */
import { visitStatus } from '../../lib/visitStatus';

/** Colores semánticos: verde = activo, slate = cerrado, ámbar = alerta, rosa = error. */
const TONES = {
    emerald: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
    slate: 'bg-slate-100 text-slate-600 ring-slate-500/20',
    amber: 'bg-amber-50 text-amber-700 ring-amber-600/25',
    rose: 'bg-rose-50 text-rose-700 ring-rose-600/20',
    cobalt: 'bg-cobalt-50 text-cobalt-700 ring-cobalt-600/20',
    sky: 'bg-sky-50 text-sky-700 ring-sky-600/20',
    violet: 'bg-violet-50 text-violet-700 ring-violet-600/20',
};

const DOTS = {
    emerald: 'bg-emerald-500',
    slate: 'bg-slate-400',
    amber: 'bg-amber-500',
    rose: 'bg-rose-500',
    cobalt: 'bg-cobalt-500',
    sky: 'bg-sky-500',
    violet: 'bg-violet-500',
};

/**
 * Insignia genérica con icono o punto de color opcional.
 *
 * @param {Object} props
 * @param {keyof TONES} [props.tone='slate'] Color semántico.
 * @param {import('react').ComponentType} [props.icon] Icono de lucide-react.
 * @param {boolean} [props.dot=false] Muestra un punto de color en lugar de icono.
 * @param {boolean} [props.pulse=false] Anima el punto (para estados "en vivo").
 * @param {import('react').ReactNode} props.children Texto de la insignia.
 */
export default function Badge({ tone = 'slate', icon: Icon, dot = false, pulse = false, className = '', children }) {
    return (
        <span className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${TONES[tone]} ${className}`}>
            {dot && (
                <span className="relative flex size-1.5">
                    {pulse && <span className={`absolute inline-flex size-full animate-ping rounded-full opacity-60 ${DOTS[tone]}`} />}
                    <span className={`relative inline-flex size-1.5 rounded-full ${DOTS[tone]}`} />
                </span>
            )}
            {!dot && Icon && <Icon className="size-3.5" aria-hidden="true" />}
            {children}
        </span>
    );
}

/**
 * Insignia del estado de una visita: "En edificio" (verde, con pulso),
 * "Salida registrada" (gris) o "Cancelada" (rosa).
 *
 * @param {Object} props
 * @param {string} props.status Valor de `visits.status`.
 */
export function StatusBadge({ status }) {
    const meta = visitStatus(status);
    const active = status === 'dentro';

    return (
        <Badge tone={meta.tone} icon={active ? undefined : meta.icon} dot={active} pulse={active}>
            {meta.label}
        </Badge>
    );
}
