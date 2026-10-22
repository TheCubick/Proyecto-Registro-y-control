/**
 * Campos de formulario accesibles: etiqueta visible, icono a la izquierda,
 * texto de ayuda y mensaje de error enviado por las FormRequests de Laravel.
 */
import { ChevronDown, CircleAlert } from 'lucide-react';

const CONTROL = 'h-10.5 w-full rounded-[10px] border bg-white text-sm text-ink transition placeholder:text-slate-400 focus:outline-none focus:ring-4';
const VALID = 'border-slate-300 hover:border-slate-400 focus:border-cobalt-600 focus:ring-cobalt-600/20';
const INVALID = 'border-rose-300 bg-rose-50/40 focus:border-rose-500 focus:ring-rose-500/20';

/**
 * Contenedor del campo: etiqueta, control, ayuda y error.
 *
 * @param {Object} props
 * @param {string} props.id Identificador del control (enlaza la etiqueta).
 * @param {string} props.label Texto de la etiqueta.
 * @param {string} [props.error] Mensaje de validación del servidor.
 * @param {string} [props.hint] Texto de ayuda bajo el control.
 * @param {boolean} [props.optional=false] Muestra la marca "Opcional".
 * @param {import('react').ReactNode} props.children Control (TextInput o SelectInput).
 */
export default function FormField({ id, label, error, hint, optional = false, children }) {
    return (
        <div>
            <label htmlFor={id} className="mb-1.5 flex items-center justify-between text-[13px] font-semibold text-slate-700">
                {label}
                {optional && <span className="text-xs font-normal text-slate-400">Opcional</span>}
            </label>
            {children}
            {error ? (
                <p id={`${id}-error`} className="mt-1.5 flex items-center gap-1 text-xs font-medium text-rose-600">
                    <CircleAlert className="size-3.5 shrink-0" aria-hidden="true" />
                    {error}
                </p>
            ) : (
                hint && <p className="mt-1.5 text-xs text-slate-400">{hint}</p>
            )}
        </div>
    );
}

/**
 * Icono decorativo posicionado dentro del control.
 *
 * @param {Object} props
 * @param {import('react').ComponentType} props.icon
 * @param {boolean} props.invalid
 */
function LeadingIcon({ icon: Icon, invalid }) {
    return (
        <Icon
            className={`pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 transition-colors ${invalid ? 'text-rose-400' : 'text-slate-400 group-focus-within:text-cobalt-600'}`}
            aria-hidden="true"
        />
    );
}

/**
 * Campo de texto (input) con icono opcional.
 *
 * @param {Object} props
 * @param {string} props.id Identificador del control.
 * @param {import('react').ComponentType} [props.icon] Icono de lucide-react.
 * @param {string} [props.error] Error de validación (cambia el estilo a inválido).
 */
export function TextInput({ id, icon, error, className = '', ...props }) {
    return (
        <div className="group relative">
            {icon && <LeadingIcon icon={icon} invalid={Boolean(error)} />}
            <input
                id={id}
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? `${id}-error` : undefined}
                className={`${CONTROL} ${error ? INVALID : VALID} ${icon ? 'pl-10 pr-3.5' : 'px-3.5'} ${className}`}
                {...props}
            />
        </div>
    );
}

/**
 * Selector nativo (select) con icono a la izquierda y flecha personalizada.
 *
 * @param {Object} props
 * @param {string} props.id Identificador del control.
 * @param {import('react').ComponentType} [props.icon] Icono de lucide-react.
 * @param {string} [props.error] Error de validación.
 * @param {import('react').ReactNode} props.children Elementos `<option>`.
 */
export function SelectInput({ id, icon, error, className = '', children, ...props }) {
    return (
        <div className="group relative">
            {icon && <LeadingIcon icon={icon} invalid={Boolean(error)} />}
            <select
                id={id}
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? `${id}-error` : undefined}
                className={`${CONTROL} ${error ? INVALID : VALID} appearance-none pr-10 ${icon ? 'pl-10' : 'pl-3.5'} ${className}`}
                {...props}
            >
                {children}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
        </div>
    );
}
