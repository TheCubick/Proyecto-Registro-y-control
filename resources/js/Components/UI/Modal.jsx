/**
 * Ventanas modales con entrada tipo resorte (spring).
 *
 * `Modal` es el contenedor genérico; `ConfirmDialog` es la confirmación de acciones
 * destructivas que sustituye a `window.confirm`.
 */
import { AnimatePresence, m } from 'framer-motion';
import { TriangleAlert } from 'lucide-react';
import { useEffect, useId, useRef } from 'react';
import { createPortal } from 'react-dom';
import { bouncySpring } from '../../lib/motion';
import Button from './Button';

/**
 * Modal accesible: se cierra con Esc o al hacer clic en el fondo, bloquea el
 * desplazamiento de la página y enfoca el primer control al abrirse.
 *
 * @param {Object} props
 * @param {boolean} props.open Controla la visibilidad.
 * @param {() => void} props.onClose Se invoca al cerrar.
 * @param {string} props.labelledBy Id del título del modal.
 * @param {string} [props.maxWidth='max-w-md'] Ancho máximo del panel.
 * @param {import('react').ReactNode} props.children Contenido.
 */
export default function Modal({ open, onClose, labelledBy, maxWidth = 'max-w-md', children }) {
    const panel = useRef(null);

    useEffect(() => {
        if (!open) {
            return undefined;
        }

        const onKey = event => event.key === 'Escape' && onClose();
        const overflow = document.body.style.overflow;

        document.body.style.overflow = 'hidden';
        document.addEventListener('keydown', onKey);
        panel.current?.querySelector('button, [href], input, select, textarea')?.focus();

        return () => {
            document.body.style.overflow = overflow;
            document.removeEventListener('keydown', onKey);
        };
    }, [open, onClose]);

    return createPortal(
        <AnimatePresence>
            {open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <m.div
                        className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={onClose}
                        aria-hidden="true"
                    />
                    <m.div
                        ref={panel}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby={labelledBy}
                        className={`relative w-full overflow-hidden rounded-[20px] border border-slate-200/80 bg-white shadow-2xl shadow-ink/20 ${maxWidth}`}
                        initial={{ opacity: 0, scale: 0.92, y: 24 }}
                        animate={{ opacity: 1, scale: 1, y: 0, transition: bouncySpring }}
                        exit={{ opacity: 0, scale: 0.96, y: 12, transition: { duration: 0.15 } }}
                    >
                        {children}
                    </m.div>
                </div>
            )}
        </AnimatePresence>,
        document.body,
    );
}

/**
 * Diálogo de confirmación para acciones destructivas.
 *
 * @param {Object} props
 * @param {boolean} props.open Controla la visibilidad.
 * @param {() => void} props.onClose Cancela y cierra.
 * @param {() => void} props.onConfirm Ejecuta la acción.
 * @param {string} props.title Pregunta principal.
 * @param {import('react').ReactNode} [props.description] Consecuencias de la acción.
 * @param {string} [props.confirmLabel='Eliminar'] Texto del botón de confirmación.
 * @param {boolean} [props.processing=false] Deshabilita los botones mientras se procesa.
 */
export function ConfirmDialog({ open, onClose, onConfirm, title, description, confirmLabel = 'Eliminar', processing = false }) {
    const titleId = useId();

    // Conserva el último contenido para que no desaparezca durante la animación de salida.
    const content = useRef({ title, description });
    if (open) {
        content.current = { title, description };
    }

    return (
        <Modal open={open} onClose={processing ? () => {} : onClose} labelledBy={titleId}>
            <div className="flex gap-4 p-6">
                <m.span
                    className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-rose-50 text-rose-600 ring-8 ring-rose-50/60"
                    initial={{ scale: 0.4, rotate: -12 }}
                    animate={{ scale: 1, rotate: 0, transition: { ...bouncySpring, delay: 0.08 } }}
                >
                    <TriangleAlert className="size-5" aria-hidden="true" />
                </m.span>
                <div className="min-w-0">
                    <h2 id={titleId} className="text-base font-bold text-ink">
                        {content.current.title}
                    </h2>
                    {content.current.description && <p className="mt-1.5 text-sm leading-6 text-slate-600">{content.current.description}</p>}
                </div>
            </div>
            <div className="flex flex-col-reverse gap-2 border-t border-slate-100 bg-slate-50/70 px-6 py-4 sm:flex-row sm:justify-end">
                <Button variant="secondary" onClick={onClose} disabled={processing}>
                    Cancelar
                </Button>
                <Button variant="dangerSolid" onClick={onConfirm} disabled={processing}>
                    {processing ? 'Eliminando...' : confirmLabel}
                </Button>
            </div>
        </Modal>
    );
}
