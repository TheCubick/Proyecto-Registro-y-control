import { Link, usePage } from '@inertiajs/react';

export default function AppLayout({ children }) {
    const { url } = usePage();

    const links = [
        { label: 'Departamentos', href: '/departamentos', prefix: '/departamentos' },
        { label: 'Visitantes', href: '/visitantes', prefix: '/visitantes' },
        { label: 'Visitas', href: '/visitas', prefix: '/visitas' },
    ];

    return (
        <div className="min-h-screen bg-[#F8FAFC] text-slate-800">
            <div className="flex min-h-screen flex-col md:flex-row">
                <aside className="flex w-full flex-col border-b border-slate-200 bg-white p-5 md:sticky md:top-0 md:h-screen md:w-64 md:shrink-0 md:border-b-0 md:border-r md:p-6">
                    <Link href="/" className="inline-flex rounded-lg p-1">
                        <img src="/logo.png" alt="Control de Acceso" className="h-8 w-auto object-contain" />
                    </Link>
                    <nav className="mt-6 grid grid-cols-3 gap-1 md:block md:space-y-1">
                        {links.map(link => {
                            const active = url.startsWith(link.prefix);
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`flex items-center justify-center rounded-lg px-3 py-2 text-center text-sm font-medium transition md:justify-start md:text-left ${active ? 'bg-[#2757C8]/10 text-[#2757C8]' : 'text-slate-600 hover:bg-slate-50'}`}
                                >
                                    {link.label}
                                </Link>
                            );
                        })}
                    </nav>
                    <div className="mt-auto hidden border-t border-slate-200 pt-4 md:block">
                        <span className="text-xs text-slate-400">Usuario activo</span>
                    </div>
                </aside>
                <main className="min-w-0 flex-1 p-4 sm:p-6 md:p-8">{children}</main>
            </div>
        </div>
    );
}
