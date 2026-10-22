/**
 * Formulario de alta y edición de visitas (`visits.create` / `visits.edit`).
 *
 * Agrupa los campos en tres secciones (quién y a dónde, detalle, horario y estado).
 * Envía `POST /visitas` o `PUT /visitas/{id}`; las reglas de validación viven en
 * `StoreVisitRequest` y `UpdateVisitRequest`.
 *
 * @param {Object} props
 * @param {Object} [props.visit] Visita a editar; si no existe, el formulario es de alta.
 * @param {Object[]} props.visitors Catálogo de visitantes para el selector.
 * @param {Object[]} props.departments Catálogo de departamentos para el selector.
 * @param {Object[]} props.users Usuarios que pueden figurar como responsables.
 */
import { Head, Link, useForm } from '@inertiajs/react';
import { Activity, Building2, ClipboardList, LogIn, LogOut, MessageSquareText, Ticket, UserCheck, UserPlus, Users } from 'lucide-react';
import FormField, { SelectInput, TextInput } from '../../Components/Forms/FormField';
import FormShell, { FormActions, FormSection } from '../../Components/Forms/FormShell';
import { VISIT_STATUSES } from '../../lib/visitStatus';
import AppLayout from '../../Layouts/AppLayout';

/**
 * Adapta una fecha ISO al formato de `<input type="datetime-local">` (AAAA-MM-DDTHH:mm).
 *
 * @param {string|null} value
 * @returns {string}
 */
const dateValue = value => (value ? value.slice(0, 16) : '');

export default function Form({ visit, visitors, departments, users }) {
    const editing = Boolean(visit);
    const form = useForm({
        visitor_id: visit?.visitor_id ?? '',
        department_id: visit?.department_id ?? '',
        user_id: visit?.user_id ?? '',
        reason: visit?.reason ?? '',
        badge_number: visit?.badge_number ?? '',
        entry_time: dateValue(visit?.entry_time),
        exit_time: dateValue(visit?.exit_time),
        status: visit?.status ?? 'dentro',
    });

    /** @param {import('react').FormEvent} event */
    const submit = event => {
        event.preventDefault();
        editing ? form.put(`/visitas/${visit.id}`) : form.post('/visitas');
    };

    /**
     * Renderiza un selector ligado a un campo del formulario.
     *
     * @param {string} label Etiqueta visible.
     * @param {string} name Campo de `form.data`.
     * @param {Object[]} options Registros a listar.
     * @param {(item: Object) => string} text Texto de cada opción.
     * @param {import('react').ComponentType} icon Icono del campo.
     */
    const select = (label, name, options, text, icon) => (
        <FormField id={name} label={label} error={form.errors[name]}>
            <SelectInput id={name} icon={icon} value={form.data[name]} onChange={e => form.setData(name, e.target.value)} error={form.errors[name]} required>
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
        <AppLayout>
            <Head title={editing ? 'Editar visita' : 'Nueva visita'} />
            <FormShell
                title={editing ? 'Editar visita' : 'Nueva visita'}
                subtitle="Completa los datos del registro de acceso."
                icon={ClipboardList}
                maxWidth="max-w-2xl"
                onSubmit={submit}
            >
                <FormSection step={1} title="Visitante y destino">
                    {select('Visitante', 'visitor_id', visitors, item => `${item.full_name} - ${item.identification_number}`, Users)}
                    {!editing && (
                        <p className="-mt-2 text-xs text-slate-500">
                            ¿La persona no aparece?{' '}
                            <Link href="/visitantes/crear" className="inline-flex items-center gap-1 font-semibold text-cobalt-600 hover:text-cobalt-700">
                                <UserPlus className="size-3.5" aria-hidden="true" />
                                Registrar visitante
                            </Link>
                        </p>
                    )}
                    {select('Departamento', 'department_id', departments, item => `${item.name} - ${item.building_floor}`, Building2)}
                    {select('Usuario responsable', 'user_id', users, item => `${item.name} - ${item.email}`, UserCheck)}
                </FormSection>

                <FormSection step={2} title="Detalle de la visita">
                    <FormField id="reason" label="Motivo" error={form.errors.reason}>
                        <TextInput
                            id="reason"
                            icon={MessageSquareText}
                            value={form.data.reason}
                            onChange={e => form.setData('reason', e.target.value)}
                            error={form.errors.reason}
                            placeholder="Ej. Entrega de documentos"
                            required
                        />
                    </FormField>
                    <FormField id="badge_number" label="Número de gafete" error={form.errors.badge_number} optional>
                        <TextInput
                            id="badge_number"
                            icon={Ticket}
                            value={form.data.badge_number}
                            onChange={e => form.setData('badge_number', e.target.value)}
                            error={form.errors.badge_number}
                            placeholder="Ej. GAF-05"
                        />
                    </FormField>
                </FormSection>

                <FormSection step={3} title="Horario y estado">
                    <div className="grid gap-4 sm:grid-cols-2">
                        <FormField id="entry_time" label="Entrada" error={form.errors.entry_time}>
                            <TextInput
                                id="entry_time"
                                type="datetime-local"
                                icon={LogIn}
                                value={form.data.entry_time}
                                onChange={e => form.setData('entry_time', e.target.value)}
                                error={form.errors.entry_time}
                                required
                            />
                        </FormField>
                        <FormField id="exit_time" label="Salida" error={form.errors.exit_time} optional>
                            <TextInput
                                id="exit_time"
                                type="datetime-local"
                                icon={LogOut}
                                value={form.data.exit_time}
                                onChange={e => form.setData('exit_time', e.target.value)}
                                error={form.errors.exit_time}
                            />
                        </FormField>
                    </div>
                    <FormField id="status" label="Estado" error={form.errors.status}>
                        <SelectInput id="status" icon={Activity} value={form.data.status} onChange={e => form.setData('status', e.target.value)} error={form.errors.status} required>
                            {Object.entries(VISIT_STATUSES).map(([value, meta]) => (
                                <option key={value} value={value}>
                                    {meta.option}
                                </option>
                            ))}
                        </SelectInput>
                    </FormField>
                </FormSection>

                <FormActions cancelHref="/visitas" processing={form.processing} editing={editing} />
            </FormShell>
        </AppLayout>
    );
}
