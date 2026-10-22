/**
 * Avatar circular con las iniciales de una persona.
 */
import { initials } from '../../lib/format';

const SIZES = {
    sm: 'size-8 text-xs',
    lg: 'size-16 text-xl',
};

/**
 * @param {Object} props
 * @param {string} props.name Nombre completo de la persona.
 * @param {keyof SIZES} [props.size='sm'] Tamaño del avatar.
 */
export default function Avatar({ name, size = 'sm' }) {
    return (
        <span className={`inline-flex shrink-0 items-center justify-center rounded-full bg-linear-to-br from-cobalt-100 to-sky-100 font-semibold text-cobalt-700 ring-2 ring-white ${SIZES[size]}`} aria-hidden="true">
            {initials(name)}
        </span>
    );
}
