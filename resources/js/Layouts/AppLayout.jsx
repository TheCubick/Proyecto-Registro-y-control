/**
 * Layout principal de la aplicación.
 *
 * Contiene la barra lateral de navegación (barra superior en móvil), las
 * notificaciones globales y la transición animada entre páginas de Inertia.
 *
 * `LazyMotion` carga solo el subconjunto de animaciones que usa la interfaz
 * (`domAnimation`) y `MotionConfig` respeta la preferencia de movimiento reducido.
 */
import { Link, usePage } from '@inertiajs/react';
import { LazyMotion, MotionConfig, domAnimation, m } from 'framer-motion';
import { Building2, Car, ClipboardList, LayoutDashboard, Lock, ShieldCheck, UserCog, Users } from 'lucide-react';
import FlashToaster from '../Components/Feedback/FlashToaster';
import { softSpring } from '../lib/motion';

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

/** Entrada de página: desvanecido + desplazamiento, y escalonado de las tarjetas internas. */
const PAGE_VARIANTS = {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { ...softSpring, staggerChildren: 0.06, delayChildren: 0.04 } },
};

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
        <LazyMotion features={domAnimation} strict>
            <MotionConfig reducedMotion="user">
                <div className="min-h-screen bg-slate-50 text-ink">
                    {/* Fondo con profundidad: degradado radial desde la esquina superior derecha + brillo cobalto */}
                    <div className="pointer-events-none fixed inset-0 bg-radial-[ellipse_at_top_right] from-indigo-50/70 via-slate-50 to-slate-100" aria-hidden="true" />
                    <div className="pointer-events-none fixed -left-40 -top-40 size-[32rem] rounded-full bg-cobalt-100/40 blur-3xl" aria-hidden="true" />
                    <div className="relative flex min-h-screen flex-col md:flex-row">
                        <aside className="z-20 flex w-full flex-col border-b border-slate-200/60 bg-white px-4 py-3 shadow-[0_1px_12px_rgb(15_23_42/0.04)] md:sticky md:top-0 md:h-screen md:w-64 md:shrink-0 md:border-b-0 md:border-r md:shadow-[1px_0_16px_rgb(15_23_42/0.05)] md:px-5 md:py-6">
                            <Link href="/" className="inline-flex rounded-lg p-1 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-cobalt-600/20">
                                <img src="/logo.png" alt="Control de Acceso" className="h-8 w-auto object-contain" />
                            </Link>

                            <nav className="-mx-1 mt-3 flex gap-1 overflow-x-auto px-1 pb-1 md:mx-0 md:mt-8 md:block md:space-y-1 md:overflow-visible md:p-0" aria-label="Principal">
                                <p className="mb-2 hidden px-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500 md:block">Operación</p>
                                {NAVIGATION.map(item => {
                                    const active = isActive(url, item);
                                    const Icon = item.icon;

                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            aria-current={active ? 'page' : undefined}
                                            className={`group relative flex shrink-0 items-center gap-3 rounded-[10px] px-3 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-cobalt-600/20 ${
                                                active ? 'bg-cobalt-600 text-white shadow-md shadow-cobalt-600/25' : 'text-slate-600 hover:bg-slate-100 hover:text-ink'
                                            }`}
                                        >
                                            <Icon
                                                className={`size-4.5 transition-transform duration-200 group-hover:scale-110 ${active ? 'text-white' : 'text-slate-400 group-hover:text-cobalt-600'}`}
                                                aria-hidden="true"
                                            />
                                            {item.label}
                                        </Link>
                                    );
                                })}

                                <p className="mb-2 mt-7 hidden px-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500 md:block">Próximamente</p>
                                {UPCOMING.map(({ label, icon: Icon }) => (
                                    <span key={label} className="hidden cursor-not-allowed items-center gap-3 rounded-[10px] px-3 py-2 text-sm font-medium text-slate-400 md:flex" title="Módulo en desarrollo">
                                        <Icon className="size-4.5 text-slate-300" aria-hidden="true" />
                                        {label}
                                        <Lock className="ml-auto size-3.5 text-slate-300" aria-hidden="true" />
                                    </span>
                                ))}
                            </nav>

                            <div className="mt-auto hidden rounded-xl border border-cobalt-100 bg-linear-to-br from-cobalt-50 to-white p-3.5 shadow-sm md:block">
                                <div className="flex items-center gap-2.5">
                                    <span className="inline-flex size-8 items-center justify-center rounded-lg bg-cobalt-600 text-white shadow-md shadow-cobalt-600/25">
                                        <ShieldCheck className="size-4" aria-hidden="true" />
                                    </span>
                                    <div className="leading-tight">
                                        <p className="text-xs font-bold text-ink">Control de Accesos</p>
                                        <p className="text-[11px] font-medium text-slate-500">Registro institucional · v1.0</p>
                                    </div>
                                </div>
                            </div>
                        </aside>

                        <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 md:px-10 md:py-10">
                            {/* La clave por componente reinicia la animación en cada cambio de página. */}
                            <m.div key={component} variants={PAGE_VARIANTS} initial="hidden" animate="show" className="mx-auto w-full max-w-6xl">
                                {children}
                            </m.div>
                        </main>
                    </div>
                    <FlashToaster />
                </div>
            </MotionConfig>
        </LazyMotion>
    );
}
