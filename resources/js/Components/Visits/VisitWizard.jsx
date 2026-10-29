/**
 * Wizard de registro de visitas en 4 pasos (especificación Cobalt Flow):
 * 1. Visitante · 2. Destino · 3. Gafete y entrada · 4. Confirmación.
 *
 * Envía exactamente los mismos campos que el formulario clásico a `POST /visitas`,
 * por lo que la validación sigue a cargo de `StoreVisitRequest`. Si el servidor
 * devuelve errores, el Wizard regresa al primer paso que contiene un campo inválido.
 */
import { Link, useForm } from '@inertiajs/react';
import { AnimatePresence, m } from 'framer-motion';
import { ArrowLeft, ArrowRight, Building2, CalendarClock, Check, ClipboardList, LoaderCircle, LogIn, MessageSquareText, Ticket, UserCheck, UserPlus, Users, X } from 'lucide-react';
import { useState } from 'react';
import { formatDateTime } from '../../lib/format';
import { softSpring } from '../../lib/motion';
import Avatar from '../UI/Avatar';
import Badge from '../UI/Badge';
import Button, { ButtonLink } from '../UI/Button';
import FormField, { SelectInput, TextInput } from '../Forms/FormField';
import { FormPanel } from '../Forms/FormShell';
import Stepper from '../Forms/Stepper';

/** Pasos del Wizard y los campos que valida cada uno. */
const STEPS = [
    { label: 'Visitante', fields: ['visitor_id'] },
    { label: 'Destino', fields: ['department_id', 'reason', 'user_id'] },
    { label: 'Gafete', fields: ['badge_number', 'entry_time', 'exit_time', 'status'] },
    { label: 'Confirmación', fields: [] },
];

/** Campos obligatorios según `StoreVisitRequest`. */
const REQUIRED = ['visitor_id', 'department_id', 'user_id', 'reason', 'entry_time'];

/** Animación direccional entre pasos. */
const SLIDE = {
    enter: direction => ({ opacity: 0, x: direction * 32 }),
    center: { opacity: 1, x: 0, transition: softSpring },
    exit: direction => ({ opacity: 0, x: direction * -32, transition: { duration: 0.12 } }),
};

/**
 * Fecha y hora local actual en formato `datetime-local` (AAAA-MM-DDTHH:mm).
 *
 * @returns {string}
 */
function nowLocal() {
    const now = new Date();
    return new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
}

/**
 * Índice del primer paso que contiene alguno de los campos con error.
 *
 * @param {Record<string, string>} errors
 * @returns {number}
 */
function firstStepWithError(errors) {
    const index = STEPS.findIndex(step => step.fields.some(field => errors[field]));
    return index === -1 ? 0 : index;
}

/**
 * @param {Object} props
 * @param {Object[]} props.visitors Catálogo de visitantes.
 * @param {Object[]} props.departments Catálogo de departamentos.
 * @param {Object[]} props.users Usuarios que pueden figurar como responsables.
 */
export default function VisitWizard({ visitors, departments, users }) {
    const [step, setStep] = useState(0);
    const [direction, setDirection] = useState(1);
    const [localErrors, setLocalErrors] = useState({});
    const form = useForm({
        visitor_id: '',
        department_id: '',
        user_id: '',
        reason: '',
        badge_number: '',
        entry_time: nowLocal(),
        exit_time: '',
        status: 'dentro',
    });

    const last = STEPS.length - 1;
    const errorFor = name => localErrors[name] ?? form.errors[name];
    const stepsWithErrors = STEPS.map((s, i) => (s.fields.some(field => errorFor(field)) ? i : -1)).filter(i => i >= 0);

    /**
     * Actualiza un campo y limpia su error.
     *
     * @param {string} name
     * @param {string} value
     */
    const set = (name, value) => {
        form.setData(name, value);
        form.clearErrors(name);
        setLocalErrors(({ [name]: _removed, ...rest }) => rest);
    };

    /**
     * Valida en el navegador los campos obligatorios del paso actual.
     *
     * @returns {boolean} true si se puede avanzar.
     */
    const validateStep = () => {
        const missing = STEPS[step].fields.filter(field => REQUIRED.includes(field) && !String(form.data[field]).trim());
        setLocalErrors(Object.fromEntries(missing.map(field => [field, 'Este campo es obligatorio.'])));
        return missing.length === 0;
    };

    /** @param {number} target */
    const goTo = target => {
        setDirection(target > step ? 1 : -1);
        setStep(target);
    };

    const next = () => validateStep() && goTo(Math.min(step + 1, last));
    const back = () => goTo(Math.max(step - 1, 0));

    /** @param {import('react').FormEvent} event */
    const submit = event => {
        event.preventDefault();

        if (step < last) {
            next();
            return;
        }

        form.post('/visitas', {
            onError: errors => goTo(firstStepWithError(errors)),
        });
    };

    const find = (list, id) => list.find(item => String(item.id) === String(id));
    const visitor = find(visitors, form.data.visitor_id);
    const department = find(departments, form.data.department_id);
    const user = find(users, form.data.user_id);

    /**
     * Selector ligado a un campo del formulario.
     *
     * @param {string} label
     * @param {string} name
     * @param {Object[]} options
     * @param {(item: Object) => string} text
     * @param {import('react').ComponentType} icon
     */
    const select = (label, name, options, text, icon) => (
        <FormField id={name} label={label} error={errorFor(name)}>
            <SelectInput id={name} icon={icon} value={form.data[name]} onChange={e => set(name, e.target.value)} error={errorFor(name)}>
                <option value="">Selecciona una opción</option>
                {options.map(item => (
                    <option key={item.id} value={item.id}>
                        {text(item)}
                    </option>
                ))}
            </SelectInput>
        </FormField>
    );

    return (
        <FormPanel title="Registrar visita" subtitle="Completa el registro en cuatro pasos." icon={ClipboardList} maxWidth="max-w-2xl">
            <Stepper steps={STEPS} current={step} withErrors={stepsWithErrors} />

            <form onSubmit={submit} noValidate className="p-6 pt-4 sm:p-8 sm:pt-4">
                <div className="relative min-h-[260px] overflow-hidden px-1 py-1">
                    <AnimatePresence mode="wait" initial={false} custom={direction}>
                        <m.div key={step} custom={direction} variants={SLIDE} initial="enter" animate="center" exit="exit" className="space-y-5">
                            {step === 0 && (
                                <>
                                    <StepTitle title="¿Quién nos visita?" text="Selecciona a la persona registrada en el catálogo de visitantes." />
                                    {select('Visitante', 'visitor_id', visitors, item => `${item.full_name} - ${item.identification_number}`, Users)}
                                    <div className="flex items-center gap-3 rounded-xl border border-dashed border-slate-300 bg-slate-50/70 px-4 py-3 text-sm text-slate-600">
                                        <UserPlus className="size-4 shrink-0 text-cobalt-600" aria-hidden="true" />
                                        <span>
                                            ¿La persona no aparece?{' '}
                                            <Link href="/visitantes/crear" className="font-semibold text-cobalt-600 hover:text-cobalt-700 hover:underline">
                                                Registrar visitante
                                            </Link>
                                        </span>
                                    </div>
                                </>
                            )}

                            {step === 1 && (
                                <>
                                    <StepTitle title="¿A dónde se dirige?" text="Indica el área destino, el motivo y quién registra el acceso." />
                                    {select('Departamento', 'department_id', departments, item => `${item.name} - ${item.building_floor}`, Building2)}
                                    <FormField id="reason" label="Motivo de la visita" error={errorFor('reason')}>
                                        <TextInput
                                            id="reason"
                                            icon={MessageSquareText}
                                            value={form.data.reason}
                                            onChange={e => set('reason', e.target.value)}
                                            error={errorFor('reason')}
                                            placeholder="Ej. Entrega de documentos"
                                        />
                                    </FormField>
                                    {select('Usuario responsable', 'user_id', users, item => `${item.name} - ${item.email}`, UserCheck)}
                                </>
                            )}

                            {step === 2 && (
                                <>
                                    <StepTitle title="Gafete y hora de entrada" text="Registra el gafete entregado. La hora de entrada se llenó con la hora actual." />
                                    <FormField id="badge_number" label="Número de gafete" error={errorFor('badge_number')} optional hint="Si no se entrega gafete, la visita aparecerá con una alerta ámbar.">
                                        <TextInput
                                            id="badge_number"
                                            icon={Ticket}
                                            value={form.data.badge_number}
                                            onChange={e => set('badge_number', e.target.value)}
                                            error={errorFor('badge_number')}
                                            placeholder="Ej. GAF-05"
                                        />
                                    </FormField>
                                    <FormField id="entry_time" label="Entrada" error={errorFor('entry_time')}>
                                        <TextInput id="entry_time" type="datetime-local" icon={LogIn} value={form.data.entry_time} onChange={e => set('entry_time', e.target.value)} error={errorFor('entry_time')} />
                                    </FormField>
                                </>
                            )}

                            {step === 3 && (
                                <>
                                    <StepTitle title="Confirma el registro" text="Revisa los datos antes de registrar la entrada." />
                                    <div className="overflow-hidden rounded-2xl border border-slate-200">
                                        <div className="flex items-center gap-3 bg-linear-to-r from-cobalt-50 to-white px-5 py-4">
                                            <Avatar name={visitor?.full_name} />
                                            <div className="min-w-0">
                                                <p className="font-bold text-ink">{visitor?.full_name}</p>
                                                <p className="font-mono text-xs text-slate-500">{visitor?.identification_number}</p>
                                            </div>
                                            <Badge tone="emerald" dot pulse className="ml-auto">
                                                Entrará al edificio
                                            </Badge>
                                        </div>
                                        <dl className="grid gap-x-6 gap-y-4 border-t border-slate-100 px-5 py-4 text-sm sm:grid-cols-2">
                                            <Summary icon={Building2} label="Departamento" value={department ? `${department.name} · ${department.building_floor}` : '—'} />
                                            <Summary icon={MessageSquareText} label="Motivo" value={form.data.reason} />
                                            <Summary icon={UserCheck} label="Responsable" value={user?.name ?? '—'} />
                                            <Summary
                                                icon={Ticket}
                                                label="Gafete"
                                                value={form.data.badge_number ? <span className="font-mono">{form.data.badge_number}</span> : <Badge tone="amber">No asignado</Badge>}
                                            />
                                            <Summary icon={CalendarClock} label="Entrada" value={formatDateTime(form.data.entry_time)} />
                                        </dl>
                                    </div>
                                </>
                            )}
                        </m.div>
                    </AnimatePresence>
                </div>

                <div className="mt-6 flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
                    {step === 0 ? (
                        <ButtonLink href="/visitas" variant="secondary" icon={X}>
                            Cancelar
                        </ButtonLink>
                    ) : (
                        <Button variant="secondary" icon={ArrowLeft} onClick={back} disabled={form.processing}>
                            Anterior
                        </Button>
                    )}
                    <span className="hidden text-xs font-medium text-slate-500 sm:block">
                        Paso {step + 1} de {STEPS.length}
                    </span>
                    {step < last ? (
                        <Button type="submit" iconRight={ArrowRight}>
                            Siguiente
                        </Button>
                    ) : (
                        <Button type="submit" disabled={form.processing} icon={form.processing ? LoaderCircle : Check} className={form.processing ? '[&>svg]:animate-spin' : ''}>
                            {form.processing ? 'Registrando...' : 'Registrar visita'}
                        </Button>
                    )}
                </div>
            </form>
        </FormPanel>
    );
}

/**
 * Encabezado de cada paso.
 *
 * @param {{ title: string, text: string }} props
 */
function StepTitle({ title, text }) {
    return (
        <div className="text-center">
            <h2 className="text-[17px] font-bold text-ink">{title}</h2>
            <p className="mt-1 text-sm text-slate-600">{text}</p>
        </div>
    );
}

/**
 * Dato del resumen de confirmación.
 *
 * @param {{ icon: import('react').ComponentType, label: string, value: import('react').ReactNode }} props
 */
function Summary({ icon: Icon, label, value }) {
    return (
        <div className="flex gap-2.5">
            <Icon className="mt-0.5 size-4 shrink-0 text-slate-400" aria-hidden="true" />
            <div className="min-w-0">
                <dt className="text-xs font-medium text-slate-500">{label}</dt>
                <dd className="mt-0.5 break-words font-semibold text-ink">{value}</dd>
            </div>
        </div>
    );
}
