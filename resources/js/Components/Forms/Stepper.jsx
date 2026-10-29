/**
 * Indicador de progreso para formularios por pasos (especificación Cobalt Flow):
 * círculos numerados, conectores que se rellenan y etiqueta bajo cada paso.
 */
import { m } from 'framer-motion';
import { Check } from 'lucide-react';
import { snappySpring, softSpring } from '../../lib/motion';

/**
 * @param {Object} props
 * @param {{ label: string }[]} props.steps Pasos del flujo.
 * @param {number} props.current Índice del paso activo (base 0).
 * @param {number[]} [props.withErrors=[]] Índices de pasos con errores de validación.
 */
export default function Stepper({ steps, current, withErrors = [] }) {
    return (
        <ol className="flex items-start px-4 pb-2 pt-6 sm:px-8" aria-label="Progreso del registro">
            {steps.map((step, index) => {
                const done = index < current;
                const active = index === current;
                const error = withErrors.includes(index);

                return (
                    <li key={step.label} className="relative flex flex-1 flex-col items-center" aria-current={active ? 'step' : undefined}>
                        {index > 0 && (
                            <span className="absolute right-1/2 top-4 h-0.5 w-full -translate-y-1/2 bg-slate-200" aria-hidden="true">
                                <m.span
                                    className="block h-full origin-left bg-cobalt-600"
                                    initial={false}
                                    animate={{ scaleX: index <= current ? 1 : 0 }}
                                    transition={softSpring}
                                />
                            </span>
                        )}
                        <m.span
                            initial={false}
                            animate={{ scale: active ? 1.08 : 1 }}
                            transition={snappySpring}
                            className={`relative z-10 inline-flex size-8 items-center justify-center rounded-full border-2 text-[13px] font-semibold transition-colors ${
                                error
                                    ? 'border-rose-500 bg-rose-50 text-rose-600'
                                    : done
                                      ? 'border-cobalt-600 bg-cobalt-600 text-white'
                                      : active
                                        ? 'border-cobalt-600 bg-white text-cobalt-600 shadow-[0_0_0_4px_rgb(61_82_213/0.15)]'
                                        : 'border-slate-200 bg-white text-slate-400'
                            }`}
                        >
                            {done && !error ? <Check className="size-4" strokeWidth={3} aria-hidden="true" /> : index + 1}
                        </m.span>
                        <span className={`mt-1.5 text-center text-xs ${active ? 'font-semibold text-cobalt-600' : error ? 'font-medium text-rose-600' : 'font-medium text-slate-500'}`}>
                            {step.label}
                        </span>
                    </li>
                );
            })}
        </ol>
    );
}
