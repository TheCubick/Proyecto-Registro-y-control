import { Link } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';

export default function Show({ visitor }) {
    return <AppLayout><section className="mx-auto max-w-2xl space-y-6"><div><p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#2757C8]">Directorio operativo</p><h1 className="text-3xl font-semibold">Detalle del visitante</h1></div><div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"><dl className="space-y-4 text-sm"><Item label="Nombre completo" value={visitor.full_name} /><Item label="Identificacion" value={visitor.identification_number} /><Item label="Telefono" value={visitor.phone || 'No registrado'} /></dl><div className="mt-6 flex gap-3 border-t border-slate-100 pt-5"><Link href={`/visitantes/${visitor.id}/editar`} className="rounded-lg bg-[#2757C8] px-4 py-2.5 text-sm font-semibold text-white">Editar</Link><Link href="/visitantes" className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-[#2757C8]">Volver</Link></div></div></section></AppLayout>;
}
function Item({ label, value }) { return <div><dt className="font-semibold text-slate-500">{label}</dt><dd className="mt-1 text-slate-900">{value}</dd></div>; }
