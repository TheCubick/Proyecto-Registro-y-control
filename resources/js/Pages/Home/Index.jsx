import { Link } from '@inertiajs/react';
import AppLayout from '../../Layouts/AppLayout';

export default function Index() {
    return <AppLayout><section className="mx-auto max-w-5xl space-y-8"><header className="border-b border-slate-200 pb-8"><p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#2757C8]">Control de acceso</p><h1 className="text-4xl font-semibold tracking-tight text-slate-900">Panel principal</h1><p className="mt-3 max-w-2xl text-slate-500">Administra departamentos, visitantes y visitas desde un solo lugar.</p></header><div className="grid gap-4 md:grid-cols-3"><Card href="/departamentos" title="Departamentos" text="Organiza espacios y niveles." /><Card href="/visitantes" title="Visitantes" text="Administra personas autorizadas." /><Card href="/visitas" title="Visitas" text="Controla los accesos registrados." /></div></section></AppLayout>;
}

function Card({ href, title, text }) { return <Link href={href} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-[#2757C8]"><h2 className="font-semibold text-slate-900">{title}</h2><p className="mt-2 text-sm text-slate-500">{text}</p><span className="mt-5 inline-block text-sm font-semibold text-[#2757C8]">Abrir sección</span></Link>; }
