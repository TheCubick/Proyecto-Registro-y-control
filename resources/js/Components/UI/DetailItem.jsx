/**
 * Par etiqueta/valor para las vistas de detalle (`Show.jsx`).
 * Debe usarse dentro de un elemento `<dl>`.
 */

/**
 * @param {Object} props
 * @param {import('react').ComponentType} [props.icon] Icono de lucide-react.
 * @param {string} props.label Nombre del dato.
 * @param {import('react').ReactNode} props.children Valor del dato.
 */
export default function DetailItem({ icon: Icon, label, children }) {
    return (
        <div className="flex gap-3">
            {Icon && (
                <span className="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-slate-400 ring-1 ring-inset ring-slate-200">
                    <Icon className="size-4" aria-hidden="true" />
                </span>
            )}
            <div className="min-w-0">
                <dt className="text-xs font-medium uppercase tracking-[0.06em] text-slate-400">{label}</dt>
                <dd className="mt-1 break-words text-sm font-medium text-ink">{children}</dd>
            </div>
        </div>
    );
}
