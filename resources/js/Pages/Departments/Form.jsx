/**
 * Formulario de alta y edición de departamentos
 * (`departments.create` / `departments.edit`).
 *
 * Envía `POST /departamentos` o `PUT /departamentos/{id}`; las reglas de validación
 * viven en `StoreDepartmentRequest` y `UpdateDepartmentRequest`.
 *
 * @param {Object} props
 * @param {Object} [props.department] Departamento a editar; si no existe, el formulario es de alta.
 */
import { Head, useForm } from '@inertiajs/react';
import { Building2, MapPin } from 'lucide-react';
import FormField, { TextInput } from '../../Components/Forms/FormField';
import FormShell, { FormActions } from '../../Components/Forms/FormShell';
import AppLayout from '../../Layouts/AppLayout';

export default function Form({ department }) {
    const editing = Boolean(department);
    const form = useForm({ name: department?.name ?? '', building_floor: department?.building_floor ?? '' });

    /** @param {import('react').FormEvent} event */
    const submit = event => {
        event.preventDefault();
        editing ? form.put(`/departamentos/${department.id}`) : form.post('/departamentos');
    };

    return (
        <AppLayout>
            <Head title={editing ? 'Editar departamento' : 'Nuevo departamento'} />
            <FormShell
                title={editing ? 'Editar departamento' : 'Nuevo departamento'}
                subtitle="Completa los datos básicos del área."
                icon={Building2}
                onSubmit={submit}
            >
                <FormField id="name" label="Nombre del departamento" error={form.errors.name}>
                    <TextInput
                        id="name"
                        icon={Building2}
                        value={form.data.name}
                        onChange={e => form.setData('name', e.target.value)}
                        error={form.errors.name}
                        placeholder="Ej. Recursos Humanos"
                        required
                    />
                </FormField>
                <FormField id="building_floor" label="Edificio / Piso" error={form.errors.building_floor}>
                    <TextInput
                        id="building_floor"
                        icon={MapPin}
                        value={form.data.building_floor}
                        onChange={e => form.setData('building_floor', e.target.value)}
                        error={form.errors.building_floor}
                        placeholder="Ej. Planta baja"
                        required
                    />
                </FormField>
                <FormActions cancelHref="/departamentos" processing={form.processing} editing={editing} />
            </FormShell>
        </AppLayout>
    );
}
