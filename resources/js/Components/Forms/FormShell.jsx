/**
 * Estructura de los formularios de alta/edición según Cobalt Flow:
 * tarjeta blanca con banner azul cobalto, secciones agrupadas y pie de acciones.
 */
import { ArrowLeft, LoaderCircle, Save } from 'lucide-react';
import Button, { ButtonLink } from '../UI/Button';

/**
 * Tarjeta contenedora del formulario.
 *
 * @param {Object} props
 * @param {string} props.title Título del banner.
 * @param {string} [props.subtitle] Subtítulo del banner.
 * @param {import('react').ComponentType} props.icon Icono del módulo.
 * @param {string} [props.maxWidth='max-w-xl'] Ancho máximo de la tarjeta.
 * @param {(event: import('react').FormEvent) => void} props.onSubmit Envío del formulario.
 * @param {import('react').ReactNode} props.children Campos y acciones.
 */
export default function FormShell({ title, subtitle, icon: Icon, maxWidth = 'max-w-xl', onSubmit, children }) {
    return (
        <section className={`mx-auto w-full overflow-hidden rounded-[20px] border border-slate-200/80 bg-white shadow-elevated ${maxWidth}`}>
            <div className="relative overflow-hidden bg-cobalt-600 px-6 py-7 text-center text-white">
                <div className="pointer-events-none absolute -right-10 -top-16 size-48 rounded-full bg-white/10 blur-2xl" aria-hidden="true" />
                <div className="pointer-events-none absolute -bottom-20 -left-10 size-48 rounded-full bg-cobalt-400/40 blur-2xl" aria-hidden="true" />
                <span className="relative mx-auto mb-3 inline-flex size-11 items-center justify-center rounded-xl bg-white/15 ring-1 ring-inset ring-white/25">
                    <Icon className="size-5" aria-hidden="true" />
                </span>
                <h1 className="relative text-[22px] font-bold tracking-tight">{title}</h1>
                {subtitle && <p className="relative mt-1.5 text-[13px] text-cobalt-100">{subtitle}</p>}
            </div>
            <form onSubmit={onSubmit} className="space-y-6 p-6 sm:p-8" noValidate={false}>
                {children}
            </form>
        </section>
    );
}

/**
 * Agrupa campos relacionados bajo un subtítulo con icono.
 *
 * @param {Object} props
 * @param {string} props.title Título de la sección.
 * @param {import('react').ComponentType} [props.icon] Icono de la sección.
 * @param {number} [props.step] Número de paso (muestra un indicador numérico).
 */
export function FormSection({ title, icon: Icon, step, children }) {
    return (
        <fieldset className="space-y-4">
            <legend className="mb-4 flex items-center gap-2.5 text-sm font-semibold text-ink">
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
