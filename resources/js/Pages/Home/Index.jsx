/**
 * Página de inicio (ruta `/`, `homecontroller`).
 *
 * Presenta accesos rápidos a las tareas frecuentes, los módulos disponibles,
 * los módulos en desarrollo y el resumen de los roles del sistema.
 * No recibe props del backend.
 */
import { Head, Link } from '@inertiajs/react';
import { ArrowRight, Building2, Car, ClipboardList, Construction, ConciergeBell, Plus, ShieldCheck, ShieldUser, UserCog, UserPlus, Users } from 'lucide-react';
import Badge from '../../Components/UI/Badge';
import { ButtonLink } from '../../Components/UI/Button';
import Card from '../../Components/UI/Card';
import IconTile from '../../Components/UI/IconTile';
import AppLayout from '../../Layouts/AppLayout';

const MODULES = [
    {
        href: '/visitas',
        title: 'Visitas',
        text: 'Registra entradas, asigna gafetes y consulta quién está en el edificio.',
        icon: ClipboardList,
        tone: 'cobalt',
    },
    {
        href: '/visitantes',
        title: 'Visitantes',
        text: 'Catálogo de personas externas identificadas por su documento oficial.',
        icon: Users,
        tone: 'sky',
    },
    {
        href: '/departamentos',
        title: 'Departamentos',
        text: 'Directorio de áreas del edificio y su ubicación por piso.',
        icon: Building2,
        tone: 'violet',
    },
];

const UPCOMING = [
    { title: 'Bitácora vehicular', text: 'Placas, marca, color y tipo de vehículo con hora de entrada y salida.', icon: Car, tone: 'amber' },
    { title: 'Usuarios y roles', text: 'Alta de operadores y control de acceso por rol (RBAC).', icon: UserCog, tone: 'slate' },
];

const ROLES = [
    { title: 'Administrador', text: 'Control total del sistema, usuarios y métricas globales.', icon: ShieldUser },
    { title: 'Recepción', text: 'Registro de visitantes, gafetes, destino y salida.', icon: ConciergeBell },
    { title: 'Guardia', text: 'Bitácora de vehículos en la caseta de acceso.', icon: ShieldCheck },
];

export default function Index() {
    return (
        <AppLayout>
            <Head title="Inicio" />
            <div className="space-y-8">
                <section className="relative overflow-hidden rounded-[20px] bg-cobalt-600 px-6 py-8 text-white shadow-elevated sm:px-10 sm:py-10">
                    <div className="pointer-events-none absolute -right-16 -top-24 size-72 rounded-full bg-white/10 blur-3xl" aria-hidden="true" />
                    <div className="pointer-events-none absolute -bottom-28 right-1/3 size-72 rounded-full bg-cobalt-400/40 blur-3xl" aria-hidden="true" />
                    <div className="relative max-w-2xl">
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cobalt-100">Sistema de Registro y Control de Accesos</p>
                        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Panel principal</h1>
                        <p className="mt-3 text-sm leading-6 text-cobalt-100 sm:text-base">
                            Administra departamentos, visitantes y visitas desde un solo lugar, con trazabilidad de cada ingreso al edificio.
                        </p>
                        <div className="mt-6 flex flex-wrap gap-3">
                            <ButtonLink href="/visitas/crear" variant="light" icon={Plus}>
                                Registrar visita
                            </ButtonLink>
                            <ButtonLink href="/visitantes/crear" variant="outlineLight" icon={UserPlus}>
                                Nuevo visitante
                            </ButtonLink>
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">Módulos</h2>
                    <div className="grid gap-4 md:grid-cols-3">
                        {MODULES.map(module => (
                            <Link
                                key={module.href}
                                href={module.href}
                                className="group flex flex-col rounded-2xl border border-slate-200/80 bg-white p-6 shadow-card transition duration-200 hover:-translate-y-0.5 hover:border-cobalt-200 hover:shadow-elevated focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-cobalt-600/20"
                            >
                                <IconTile icon={module.icon} tone={module.tone} />
                                <h3 className="mt-4 font-semibold text-ink">{module.title}</h3>
                                <p className="mt-1.5 flex-1 text-sm leading-6 text-slate-500">{module.text}</p>
                                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-cobalt-600">
                                    Abrir módulo
                                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                                </span>
                            </Link>
                        ))}
                    </div>
                </section>

                <div className="grid gap-4 lg:grid-cols-5">
                    <Card className="p-6 lg:col-span-3">
                        <div className="flex items-center justify-between gap-3">
                            <h2 className="font-semibold text-ink">Próximos módulos</h2>
                            <Badge tone="amber" icon={Construction}>
                                En desarrollo
                            </Badge>
                        </div>
                        <ul className="mt-5 space-y-4">
                            {UPCOMING.map(item => (
                                <li key={item.title} className="flex gap-4">
                                    <IconTile icon={item.icon} tone={item.tone} size="sm" />
                                    <div>
                                        <p className="text-sm font-semibold text-ink">{item.title}</p>
                                        <p className="mt-0.5 text-sm text-slate-500">{item.text}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </Card>

                    <Card className="p-6 lg:col-span-2">
                        <h2 className="font-semibold text-ink">Roles del sistema</h2>
                        <ul className="mt-5 space-y-4">
                            {ROLES.map(({ title, text, icon: Icon }) => (
                                <li key={title} className="flex gap-3">
                                    <Icon className="mt-0.5 size-5 shrink-0 text-cobalt-600" aria-hidden="true" />
                                    <div>
                                        <p className="text-sm font-semibold text-ink">{title}</p>
                                        <p className="mt-0.5 text-sm text-slate-500">{text}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
