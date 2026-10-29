/**
 * Botones del sistema de diseño Cobalt Flow.
 *
 * `Button` genera un `<button>` y `ButtonLink` un `<Link>` de Inertia con la misma
 * apariencia. Ambos tienen micro-interacciones de framer-motion: se elevan al pasar
 * el cursor y se comprimen al presionarlos.
 */
import { Link } from '@inertiajs/react';
import { m } from 'framer-motion';
import { buttonMotion } from '../../lib/motion';

const MotionLink = m.create(Link);

const BASE = 'inline-flex items-center justify-center whitespace-nowrap rounded-[10px] font-semibold transition-colors duration-150 focus-visible:outline-none focus-visible:ring-4 disabled:pointer-events-none disabled:opacity-60';

const VARIANTS = {
    primary: 'bg-cobalt-600 text-white shadow-md shadow-cobalt-600/20 hover:bg-cobalt-700 hover:shadow-lg hover:shadow-cobalt-600/25 focus-visible:ring-cobalt-600/30',
    secondary: 'border border-slate-300 bg-white text-cobalt-700 shadow-sm shadow-slate-900/5 hover:border-slate-400 hover:bg-slate-50 focus-visible:ring-cobalt-600/20',
    danger: 'border border-rose-200 bg-white text-rose-600 hover:border-rose-300 hover:bg-rose-50 focus-visible:ring-rose-500/20',
    dangerSolid: 'bg-rose-600 text-white shadow-md shadow-rose-600/20 hover:bg-rose-700 focus-visible:ring-rose-500/30',
    ghost: 'text-slate-600 hover:bg-slate-100 hover:text-ink focus-visible:ring-cobalt-600/20',
    light: 'bg-white text-cobalt-700 shadow-md shadow-cobalt-900/10 hover:bg-cobalt-50 focus-visible:ring-white/40',
    outlineLight: 'border border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 focus-visible:ring-white/40',
};

const SIZES = {
    sm: 'h-8 gap-1.5 px-3 text-xs [&>svg]:size-3.5',
    md: 'h-10 gap-2 px-4 text-sm [&>svg]:size-4',
    lg: 'h-11 gap-2 px-5 text-sm [&>svg]:size-4',
};

/**
 * Construye las clases de un botón.
 *
 * @param {keyof VARIANTS} variant
 * @param {keyof SIZES} size
 * @param {string} className Clases adicionales.
 * @returns {string}
 */
function classes(variant, size, className) {
    return `${BASE} ${VARIANTS[variant]} ${SIZES[size]} ${className}`;
}

/**
 * Botón de acción.
 *
 * @param {Object} props
 * @param {keyof VARIANTS} [props.variant='primary'] Estilo visual.
 * @param {keyof SIZES} [props.size='md'] Tamaño.
 * @param {import('react').ComponentType} [props.icon] Icono a la izquierda.
 * @param {import('react').ComponentType} [props.iconRight] Icono a la derecha.
 * @param {'button'|'submit'} [props.type='button'] Tipo nativo del botón.
 */
export default function Button({ variant = 'primary', size = 'md', icon: Icon, iconRight: IconRight, type = 'button', className = '', disabled, children, ...props }) {
    return (
        <m.button type={type} disabled={disabled} className={classes(variant, size, className)} {...(disabled ? {} : buttonMotion)} {...props}>
            {Icon && <Icon aria-hidden="true" />}
            {children}
            {IconRight && <IconRight aria-hidden="true" />}
        </m.button>
    );
}

/**
 * Enlace de navegación de Inertia con apariencia de botón.
 *
 * @param {Object} props
 * @param {string} props.href Ruta destino.
 * @param {keyof VARIANTS} [props.variant='primary'] Estilo visual.
 * @param {keyof SIZES} [props.size='md'] Tamaño.
 * @param {import('react').ComponentType} [props.icon] Icono a la izquierda.
 * @param {import('react').ComponentType} [props.iconRight] Icono a la derecha.
 */
export function ButtonLink({ href, variant = 'primary', size = 'md', icon: Icon, iconRight: IconRight, className = '', children, ...props }) {
    return (
        <MotionLink href={href} className={classes(variant, size, className)} {...buttonMotion} {...props}>
            {Icon && <Icon aria-hidden="true" />}
            {children}
            {IconRight && <IconRight aria-hidden="true" />}
        </MotionLink>
    );
}
