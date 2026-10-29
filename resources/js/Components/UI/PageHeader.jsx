/**
 * Encabezado estándar de página: icono del módulo, antetítulo, título,
 * descripción y acciones principales (por ejemplo, "Nuevo registro").
 */
import IconTile from './IconTile';

/**
 * @param {Object} props
 * @param {string} props.title Título principal de la página.
 * @param {string} [props.eyebrow] Antetítulo en mayúsculas pequeñas.
 * @param {import('react').ReactNode} [props.description] Descripción breve.
 * @param {import('react').ComponentType} [props.icon] Icono del módulo.
 * @param {string} [props.tone='cobalt'] Color de acento del módulo.
 * @param {import('react').ReactNode} [props.actions] Botones alineados a la derecha.
 */
export default function PageHeader({ title, eyebrow, description, icon, tone = 'cobalt', actions }) {
    return (
        <header className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex items-start gap-4">
                {icon && <IconTile icon={icon} tone={tone} size="lg" className="hidden sm:inline-flex" />}
                <div>
                    {eyebrow && <p className="mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-cobalt-600">{eyebrow}</p>}
                    <h1 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">{title}</h1>
                    {description && <p className="mt-1.5 max-w-2xl text-sm leading-6 text-slate-600">{description}</p>}
                </div>
            </div>
            {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
        </header>
    );
}
