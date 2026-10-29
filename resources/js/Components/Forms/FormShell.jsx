/**
 * Estructura de los formularios de alta/edición según Cobalt Flow:
 * tarjeta blanca con banner azul cobalto, secciones agrupadas y pie de acciones.
 * La tarjeta entra con un resorte suave, como un panel modal.
 */
import { m } from 'framer-motion';
import { ArrowLeft, LoaderCircle, Save } from 'lucide-react';
import { bouncySpring } from '../../lib/motion';
import Button, { ButtonLink } from '../UI/Button';

/**
 * Tarjeta contenedora con banner. Se usa tanto en formularios como en el Wizard.
 *
 * @param {Object} props
 * @param {string} props.title Título del banner.
 * @param {string} [props.subtitle] Subtítulo del banner.
 * @param {import('react').ComponentType} props.icon Icono del módulo.
 * @param {string} [props.maxWidth='max-w-xl'] Ancho máximo de la tarjeta.
 * @param {import('react').ReactNode} props.children Contenido bajo el banner.
 */
export function FormPanel({ title, subtitle, icon: Icon, maxWidth = 'max-w-xl', children }) {
    return (
        <m.section
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0, transition: bouncySpring }}
            className={`mx-auto w-full overflow-hidden rounded-[20px] border border-slate-200/80 bg-white shadow-xl shadow-ink/5 ${maxWidth}`}
        >
            <div className="relative overflow-hidden bg-cobalt-600 px-6 py-7 text-center text-white">
                <div className="pointer-events-none absolute -right-10 -top-16 size-48 rounded-full bg-white/10 blur-2xl" aria-hidden="true" />
                <div className="pointer-events-none absolute -bottom-20 -left-10 size-48 rounded-full bg-cobalt-400/40 blur-2xl" aria-hidden="true" />
                <m.span
                    className="relative mx-auto mb-3 inline-flex size-11 items-center justify-center rounded-xl bg-white/15 ring-1 ring-inset ring-white/25"
                    initial={{ scale: 0.5, rotate: -10 }}
                    animate={{ scale: 1, rotate: 0, transition: { ...bouncySpring, delay: 0.1 } }}
                >
                    <Icon className="size-5" aria-hidden="true" />
                </m.span>
                <h1 className="relative text-[22px] font-bold tracking-tight">{title}</h1>
                {subtitle && <p className="relative mt-1.5 text-[13px] text-cobalt-100">{subtitle}</p>}
            </div>
            {children}
        </m.section>
    );
}

/**
 * Tarjeta de formulario estándar (banner + `<form>`).
 *
 * @param {Object} props
 * @param {string} props.title Título del banner.
 * @param {string} [props.subtitle] Subtítulo del banner.
 * @param {import('react').ComponentType} props.icon Icono del módulo.
 * @param {string} [props.maxWidth='max-w-xl'] Ancho máximo de la tarjeta.
 * @param {(event: import('react').FormEvent) => void} props.onSubmit Envío del formulario.
 * @param {import('react').ReactNode} props.children Campos y acciones.
 */
export default function FormShell({ onSubmit, children, ...panel }) {
    return (
        <FormPanel {...panel}>
            <form onSubmit={onSubmit} className="space-y-6 p-6 sm:p-8">
                {children}
            </form>
        </FormPanel>
    );
}

/**
 * Agrupa campos relacionados bajo un subtítulo con icono o número de paso.
 *
 * @param {Object} props
 * @param {string} props.title Título de la sección.
 * @param {import('react').ComponentType} [props.icon] Icono de la sección.
 * @param {number} [props.step] Número de paso (muestra un indicador numérico).
 */
export function FormSection({ title, icon: Icon, step, children }) {
    return (
        <fieldset className="space-y-4">
            <legend className="mb-4 flex items-center gap-2.5 text-sm font-bold text-ink">
                {step ? (
                    <span className="inline-flex size-6 items-center justify-center rounded-full border-2 border-cobalt-600 text-xs font-semibold text-cobalt-600">{step}</span>
                ) : (
                    Icon && <Icon className="size-4 text-cobalt-600" aria-hidden="true" />
                )}
                {title}
            </legend>
            {children}
        </fieldset>
    );
}

/**
 * Pie del formulario con "Cancelar" y "Guardar/Actualizar".
 *
 * @param {Object} props
 * @param {string} props.cancelHref Ruta a la que regresa "Cancelar".
 * @param {boolean} props.processing Indica si la petición está en curso (`form.processing`).
 * @param {boolean} props.editing Cambia el texto a "Actualizar" en modo edición.
 */
export function FormActions({ cancelHref, processing, editing }) {
    return (
        <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-between">
            <ButtonLink href={cancelHref} variant="secondary" icon={ArrowLeft}>
                Cancelar
            </ButtonLink>
            <Button type="submit" disabled={processing} icon={processing ? LoaderCircle : Save} className={processing ? '[&>svg]:animate-spin' : ''}>
                {processing ? 'Guardando...' : editing ? 'Actualizar' : 'Guardar'}
            </Button>
        </div>
    );
}
