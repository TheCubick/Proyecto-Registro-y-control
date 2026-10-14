import { Link, useForm } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';

export default function Form({ department }) {
    const editing = Boolean(department);
    const form = useForm({ name: department?.name ?? '', building_floor: department?.building_floor ?? '' });
    const submit = event => {
        event.preventDefault();
        editing ? form.put(`/departamentos/${department.id}`) : form.post('/departamentos');
    };

    return <AppLayout><section className="mx-auto max-w-xl overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"><div className="bg-[#2757C8] px-6 py-7 text-center text-white"><h1 className="text-2xl font-bold">{editing ? 'Editar departamento' : 'Nuevo departamento'}</h1><p className="mt-2 text-sm text-blue-100">Completa los datos básicos del espacio.</p></div><form onSubmit={submit} className="space-y-5 p-6"><Field label="Nombre del departamento" value={form.data.name} error={form.errors.name} onChange={e => form.setData('name', e.target.value)} /><Field label="Piso / edificio" value={form.data.building_floor} error={form.errors.building_floor} onChange={e => form.setData('building_floor', e.target.value)} /><div className="flex justify-between border-t border-slate-100 pt-5"><Link href="/departamentos" className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-[#2757C8]">Cancelar</Link><button disabled={form.processing} className="rounded-lg bg-[#2757C8] px-5 py-2.5 text-sm font-semibold text-white">{form.processing ? 'Guardando...' : editing ? 'Actualizar' : 'Guardar'}</button></div></form></section></AppLayout>;
}

function Field({ label, value, error, onChange }) {
    return <div><label className="mb-1.5 block text-[13px] font-semibold text-slate-700">{label}</label><input value={value} onChange={onChange} required className={`h-10.5 w-full rounded-[10px] border px-3.5 text-sm outline-none ${error ? 'border-red-300 bg-red-50/30' : 'border-slate-300'}`} />{error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}</div>;
}
