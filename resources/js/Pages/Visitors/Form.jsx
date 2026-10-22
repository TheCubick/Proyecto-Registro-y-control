/**
 * Formulario de alta y edición de visitantes (`visitors.create` / `visitors.edit`).
 *
 * Envía `POST /visitantes` o `PUT /visitantes/{id}`; las reglas de validación
 * viven en `StoreVisitorRequest` y `UpdateVisitorRequest`.
 *
 * @param {Object} props
 * @param {Object} [props.visitor] Visitante a editar; si no existe, el formulario es de alta.
 */
import { Head, useForm } from '@inertiajs/react';
import { IdCard, Phone, UserRound, UserPlus } from 'lucide-react';
import FormField, { TextInput } from '../../Components/Forms/FormField';
import FormShell, { FormActions } from '../../Components/Forms/FormShell';
import AppLayout from '../../Layouts/AppLayout';

export default function Form({ visitor }) {
    const editing = Boolean(visitor);
    const form = useForm({ full_name: visitor?.full_name ?? '', identification_number: visitor?.identification_number ?? '', phone: visitor?.phone ?? '' });

    /** @param {import('react').FormEvent} event */
    const submit = event => {
        event.preventDefault();
        editing ? form.put(`/visitantes/${visitor.id}`) : form.post('/visitantes');
    };

    return (
        <AppLayout>
            <Head title={editing ? 'Editar visitante' : 'Nuevo visitante'} />
            <FormShell
                title={editing ? 'Editar visitante' : 'Nuevo visitante'}
                subtitle="Completa los datos de la persona tal como aparecen en su identificación."
                icon={UserPlus}
                onSubmit={submit}
            >
                <FormField id="full_name" label="Nombre completo" error={form.errors.full_name}>
                    <TextInput
                        id="full_name"
                        icon={UserRound}
                        value={form.data.full_name}
                        onChange={e => form.setData('full_name', e.target.value)}
                        error={form.errors.full_name}
                        placeholder="Ej. María López Hernández"
                        autoComplete="name"
                        required
                    />
                </FormField>
                <FormField id="identification_number" label="Número de identificación" error={form.errors.identification_number} hint="INE, licencia de conducir o credencial institucional.">
                    <TextInput
                        id="identification_number"
                        icon={IdCard}
                        value={form.data.identification_number}
                        onChange={e => form.setData('identification_number', e.target.value)}
                        error={form.errors.identification_number}
                        placeholder="Ej. LOHM900101"
                        required
                    />
                </FormField>
                <FormField id="phone" label="Teléfono" error={form.errors.phone} optional>
                    <TextInput
                        id="phone"
                        type="tel"
                        icon={Phone}
                        value={form.data.phone}
                        onChange={e => form.setData('phone', e.target.value)}
                        error={form.errors.phone}
                        placeholder="Ej. 961 123 4567"
                        autoComplete="tel"
                    />
                </FormField>
                <FormActions cancelHref="/visitantes" processing={form.processing} editing={editing} />
            </FormShell>
        </AppLayout>
    );
}
