/**
 * Tarjeta de indicador (KPI): valor numérico destacado con etiqueta e icono.
 */
import Card from './Card';
import IconTile from './IconTile';

/**
 * @param {Object} props
 * @param {string} props.label Nombre del indicador.
 * @param {number|string} props.value Valor a mostrar.
 * @param {string} [props.hint] Aclaración breve (p. ej. el alcance del conteo).
 * @param {import('react').ComponentType} props.icon Icono de lucide-react.
 * @param {string} [props.tone='cobalt'] Color semántico del indicador.
 */
export default function StatCard({ label, value, hint, icon, tone = 'cobalt' }) {
    return (
        <Card className="flex items-start justify-between gap-4 p-5">
            <div className="min-w-0">
                <p className="text-sm font-medium text-slate-500">{label}</p>
                <p className="mt-2 text-3xl font-bold tracking-tight text-ink tabular-nums">{value}</p>
                {hint && <p className="mt-1 text-xs text-slate-400">{hint}</p>}
            </div>
            <IconTile icon={icon} tone={tone} />
        </Card>
    );
}
