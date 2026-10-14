import { Link, useForm } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';
import FlashMessage from '../../Components/FlashMessage';

export default function Index({ departments }) {
    const { delete: destroy } = useForm();
    const rows = departments.data ?? departments;

    const remove = id => {
        if (window.confirm('¿Eliminar este departamento?')) {
            destroy(`/departamentos/${id}`);
        }
    };

    return (
        <AppLayout>
            <FlashMessage />
            <section className="space-y-8">
                <header className="flex flex-col gap-6 border-b border-gray-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#2757C8]">Directorio operativo</p>
                        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Departamentos</h1>
                        <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">Administra los espacios y niveles disponibles.</p>
                    </div>
                    <Link href="/departamentos/crear" className="rounded-lg bg-[#2757C8] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#234DAF]">Nuevo departamento</Link>
                </header>
                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
                    <div className="border-b border-gray-200 px-5 py-4">
                        <h2 className="text-base font-semibold text-slate-900">Listado registrado</h2>
                        <p className="mt-1 text-xs text-slate-500">{departments.total ?? rows.length} departamentos disponibles</p>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[600px] text-left text-sm">
                            <thead className="bg-slate-50 text-xs uppercase tracking-[0.08em] text-slate-500"><tr><th className="px-5 py-3">Departamento</th><th className="px-5 py-3">Edificio / Piso</th><th className="px-5 py-3 text-right">Acciones</th></tr></thead>
                            <tbody className="divide-y divide-gray-100">
                                {rows.length ? rows.map(department => (
                                    <tr key={department.id} className="hover:bg-blue-50/40"><td className="px-5 py-4 font-medium">{department.name}</td><td className="px-5 py-4 text-slate-600">{department.building_floor}</td><td className="px-5 py-4 text-right"><div className="flex justify-end gap-3"><Link href={`/departamentos/${department.id}/editar`} className="rounded-lg border border-[#2757C8] px-3 py-2 text-xs font-semibold text-[#2757C8]">Editar</Link><button onClick={() => remove(department.id)} className="rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-600">Eliminar</button></div></td></tr>
                                )) : <tr><td colSpan="3" className="px-5 py-10 text-center text-slate-500">Aun no hay departamentos registrados.</td></tr>}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}
