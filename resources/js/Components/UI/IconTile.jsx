/**
 * Mosaico cuadrado con un icono sobre un fondo de color suave.
 * Se usa para identificar visualmente cada módulo (encabezados, tarjetas, KPIs).
 */

/** Paleta de acentos por módulo o estado. Las clases deben ser literales para Tailwind. */
const TONES = {
    cobalt: 'bg-cobalt-50 text-cobalt-600 ring-cobalt-600/10',
    violet: 'bg-violet-50 text-violet-600 ring-violet-600/10',
    sky: 'bg-sky-50 text-sky-600 ring-sky-600/10',
    emerald: 'bg-emerald-50 text-emerald-600 ring-emerald-600/10',
    amber: 'bg-amber-50 text-amber-600 ring-amber-600/10',
    rose: 'bg-rose-50 text-rose-600 ring-rose-600/10',
    slate: 'bg-slate-100 text-slate-500 ring-slate-500/10',
};

const SIZES = {
    sm: 'size-8 rounded-lg [&>svg]:size-4',
    md: 'size-10 rounded-xl [&>svg]:size-5',
    lg: 'size-12 rounded-2xl [&>svg]:size-6',
};

/**
 * @param {Object} props
 * @param {import('react').ComponentType} props.icon Icono de lucide-react.
 * @param {keyof TONES} [props.tone='cobalt'] Color del mosaico.
 * @param {keyof SIZES} [props.size='md'] Tamaño del mosaico.
 * @param {string} [props.className]
 */
export default function IconTile({ icon: Icon, tone = 'cobalt', size = 'md', className = '' }) {
    return (
        <span className={`inline-flex shrink-0 items-center justify-center ring-1 ring-inset ${TONES[tone]} ${SIZES[size]} ${className}`}>
            <Icon aria-hidden="true" strokeWidth={2} />
        </span>
    );
}
