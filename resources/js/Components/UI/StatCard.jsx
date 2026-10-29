/**
 * Tarjeta de indicador (KPI): valor numérico destacado con etiqueta e icono.
 */
import Card from './Card';
import IconTile from './IconTile';

/** Barra de acento superior por tono. */
const ACCENTS = {
    cobalt: 'from-cobalt-500 to-cobalt-300',
    emerald: 'from-emerald-500 to-emerald-300',
    slate: 'from-slate-400 to-slate-200',
    amber: 'from-amber-500 to-amber-300',
    rose: 'from-rose-500 to-rose-300',
};

/**
 * @param {Object} props
 * @param {string} props.label Nombre del indicador.
 * @param {number|string} props.value Valor a mostrar.
 * @param {string} [props.hint] Aclaración breve (p. ej. el alcance del conteo).
 * @param {import('react').ComponentType} props.icon Icono de lucide-react.
 * @param {keyof ACCENTS} [props.tone='cobalt'] Color semántico del indicador.
 */
export default function StatCard({ label, value, hint, icon, tone = 'cobalt' }) {
    return (
        <Card interactive className="relative overflow-hidden p-5">
            <span className={`absolute inset-x-0 top-0 h-1 bg-linear-to-r ${ACCENTS[tone]}`} aria-hidden="true" />
            <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                    <p className="text-sm font-medium text-slate-600">{label}</p>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-ink tabular-nums">{value}</p>
                    {hint && <p className="mt-1 text-xs text-slate-500">{hint}</p>}
                </div>
                <IconTile icon={icon} tone={tone} />
            </div>
        </Card>
    );
}
