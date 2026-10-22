/**
 * Layout principal de la aplicación.
 *
 * Contiene la barra lateral de navegación (barra superior en móvil), el contenedor
 * de notificaciones y una transición suave (CSS) al cambiar de página.
 */
import { Link, usePage } from '@inertiajs/react';
import { Building2, Car, ClipboardList, LayoutDashboard, Lock, ShieldCheck, UserCog, Users } from 'lucide-react';
import FlashToaster from '../Components/Feedback/FlashToaster';

/** Módulos disponibles. `exact` evita que "Inicio" quede activo en todas las rutas. */
const NAVIGATION = [
    { label: 'Inicio', href: '/', icon: LayoutDashboard, exact: true },
    { label: 'Visitas', href: '/visitas', icon: ClipboardList },
    { label: 'Visitantes', href: '/visitantes', icon: Users },
    { label: 'Departamentos', href: '/departamentos', icon: Building2 },
];

/** Módulos del diseño que aún no tienen backend (ver docs/ROADMAP_BACKEND_PENDIENTE.md). */
const UPCOMING = [
    { label: 'Vehículos', icon: Car },
    { label: 'Usuarios y roles', icon: UserCog },
];

/**
 * Determina si un enlace corresponde a la URL actual.
 *
 * @param {string} url URL actual de Inertia.
 * @param {{ href: string, exact?: boolean }} item Elemento de navegación.
 * @returns {boolean}
 */
function isActive(url, item) {
    const path = url.split('?')[0];
    return item.exact ? path === item.href : path.startsWith(item.href);
}

/**
 * @param {Object} props
 * @param {import('react').ReactNode} props.children Contenido de la página.
 */
export default function AppLayout({ children }) {
    const { url, component } = usePage();

    return (
        <div className="min-h-screen bg-canvas text-ink">
            <div className="flex min-h-screen flex-col md:flex-row">
                <aside className="z-10 flex w-full flex-col border-b border-slate-200/80 bg-white/90 px-4 py-3 backdrop-blur md:sticky md:top-0 md:h-screen md:w-64 md:shrink-0 md:border-b-0 md:border-r md:px-5 md:py-6">
                    <Link href="/" className="inline-flex rounded-lg p-1 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-cobalt-600/20">
                        <img src="/logo.png" alt="Control de Acceso" className="h-8 w-auto object-contain" />
                    </Link>

                    <nav className="-mx-1 mt-3 flex gap-1 overflow-x-auto px-1 pb-1 md:mx-0 md:mt-8 md:block md:space-y-1 md:overflow-visible md:p-0" aria-label="Principal">
                        <p className="mb-2 hidden px-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400 md:block">Operación</p>
                        {NAVIGATION.map(item => {
                            const active = isActive(url, item);
                            const Icon = item.icon;

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    aria-current={active ? 'page' : undefined}
                                    className={`group flex shrink-0 items-center gap-3 rounded-[10px] px-3 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-cobalt-600/20 ${
                                        active ? 'bg-cobalt-50 text-cobalt-700 ring-1 ring-inset ring-cobalt-600/10' : 'text-slate-600 hover:bg-slate-100/80 hover:text-ink'
                                    }`}
                                >
                                    <Icon className={`size-4.5 ${active ? 'text-cobalt-600' : 'text-slate-400 group-hover:text-slate-600'}`} aria-hidden="true" />
                                    {item.label}
                                </Link>
                            );
                        })}

                        <p className="mb-2 mt-7 hidden px-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400 md:block">Próximamente</p>
                        {UPCOMING.map(({ label, icon: Icon }) => (
                            <span key={label} className="hidden cursor-not-allowed items-center gap-3 rounded-[10px] px-3 py-2 text-sm font-medium text-slate-400 md:flex" title="Módulo en desarrollo">
                                <Icon className="size-4.5 text-slate-300" aria-hidden="true" />
                                {label}
                                <Lock className="ml-auto size-3.5 text-slate-300" aria-hidden="true" />
                            </span>
                        ))}
                    </nav>

                    <div className="mt-auto hidden rounded-xl border border-slate-200/80 bg-linear-to-br from-cobalt-50 to-white p-3.5 md:block">
                        <div className="flex items-center gap-2.5">
                            <span className="inline-flex size-8 items-center justify-center rounded-lg bg-cobalt-600 text-white">
                                <ShieldCheck className="size-4" aria-hidden="true" />
                            </span>
                            <div className="leading-tight">
                                <p className="text-xs font-semibold text-ink">Control de Accesos</p>
                                <p className="text-[11px] text-slate-500">Registro institucional · v1.0</p>
                            </div>
                        </div>
                    </div>
                </aside>

                <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 md:px-10 md:py-10">
                    {/* La clave por componente reinicia la animación de entrada en cada cambio de página. */}
                    <div key={component} className="mx-auto w-full max-w-6xl motion-safe:animate-page-in">
                        {children}
                    </div>
                </main>
            </div>
            <FlashToaster />
        </div>
    );
}
