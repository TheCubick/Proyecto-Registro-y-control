/**
 * Estado vacío: se muestra cuando un listado no tiene registros e invita
 * al usuario a crear el primero.
 */
import IconTile from './IconTile';

/**
 * @param {Object} props
 * @param {import('react').ComponentType} props.icon Icono ilustrativo.
 * @param {string} props.title Mensaje principal.
 * @param {string} [props.description] Texto de apoyo.
 * @param {import('react').ReactNode} [props.action] Botón de acción sugerida.
 */
export default function EmptyState({ icon, title, description, action }) {
    return (
        <div className="flex flex-col items-center px-6 py-14 text-center">
            <IconTile icon={icon} tone="slate" size="lg" />
            <h3 className="mt-4 text-base font-semibold text-ink">{title}</h3>
            {description && <p className="mt-1 max-w-sm text-sm text-slate-500">{description}</p>}
            {action && <div className="mt-5">{action}</div>}
        </div>
    );
}
