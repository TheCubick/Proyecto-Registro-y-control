/**
 * Detalle de una visita (`visits.show`).
 *
 * @param {Object} props
 * @param {Object} props.visit Visita con sus relaciones `visitor`, `department` y `user`.
 */
import { Head } from '@inertiajs/react';
import { ArrowLeft, Building2, Hourglass, IdCard, LogIn, LogOut, MapPin, MessageSquareText, Pencil, Ticket, UserCheck, UserRound } from 'lucide-react';
import Avatar from '../../Components/UI/Avatar';
import Badge, { StatusBadge } from '../../Components/UI/Badge';
import { ButtonLink } from '../../Components/UI/Button';
import Card, { CardHeader } from '../../Components/UI/Card';
import DetailItem from '../../Components/UI/DetailItem';
import { formatDateTime, formatDuration } from '../../lib/format';
import AppLayout from '../../Layouts/AppLayout';

export default function Show({ visit }) {
    const inside = visit.status === 'dentro' && !visit.exit_time;
    const duration = formatDuration(visit.entry_time, visit.exit_time);

    return (
        <AppLayout>
            <Head title="Detalle de visita" />
            <div className="mx-auto max-w-4xl space-y-6">
                <ButtonLink href="/visitas" variant="ghost" size="sm" icon={ArrowLeft}>
                    Volver a visitas
                </ButtonLink>

                <Card className="p-6">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-4">
                            <Avatar name={visit.visitor?.full_name} size="lg" />
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cobalt-600">Visita #{visit.id}</p>
                                <h1 className="text-2xl font-bold tracking-tight text-ink">{visit.visitor?.full_name}</h1>
                                <div className="mt-2">
                                    <StatusBadge status={visit.status} />
                                </div>
                            </div>
                        </div>
                        <ButtonLink href={`/visitas/${visit.id}/editar`} icon={Pencil}>
                            Editar
                        </ButtonLink>
                    </div>
                </Card>

                <div className="grid gap-6 lg:grid-cols-5">
                    <Card className="lg:col-span-3">
                        <CardHeader title="Datos del registro" icon={MessageSquareText} />
                        <dl className="grid gap-6 p-6 sm:grid-cols-2">
                            <DetailItem icon={IdCard} label="Identificación">
                                <span className="font-mono">{visit.visitor?.identification_number}</span>
                            </DetailItem>
                            <DetailItem icon={Building2} label="Departamento">
                                {visit.department?.name}
                            </DetailItem>
                            <DetailItem icon={MapPin} label="Ubicación">
                                {visit.department?.building_floor}
                            </DetailItem>
                            <DetailItem icon={Ticket} label="Gafete">
                                {visit.badge_number ? (
                                    <span className="font-mono">{visit.badge_number}</span>
                                ) : (
                                    <Badge tone="amber">No asignado</Badge>
                                )}
                            </DetailItem>
                            <DetailItem icon={UserCheck} label="Usuario responsable">
                                {visit.user?.name}
                            </DetailItem>
                            <DetailItem icon={UserRound} label="Motivo">
                                {visit.reason}
                            </DetailItem>
                        </dl>
                    </Card>

                    <Card className="lg:col-span-2">
                        <CardHeader title="Tiempos de estancia" icon={Hourglass} tone="emerald" />
                        <ol className="relative space-y-6 p-6">
                            <span className="absolute bottom-12 left-9.75 top-12 w-px bg-slate-200" aria-hidden="true" />
                            <li className="relative flex gap-3">
                                <span className="z-10 inline-flex size-8 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 ring-4 ring-white">
                                    <LogIn className="size-4" aria-hidden="true" />
                                </span>
                                <div>
                                    <p className="text-xs font-medium uppercase tracking-[0.06em] text-slate-400">Entrada</p>
                                    <p className="mt-0.5 text-sm font-semibold text-ink">{formatDateTime(visit.entry_time)}</p>
                                </div>
                            </li>
                            <li className="relative flex gap-3">
                                <span className={`z-10 inline-flex size-8 items-center justify-center rounded-full ring-4 ring-white ${visit.exit_time ? 'bg-slate-100 text-slate-600' : 'bg-amber-50 text-amber-600'}`}>
                                    <LogOut className="size-4" aria-hidden="true" />
                                </span>
                                <div>
                                    <p className="text-xs font-medium uppercase tracking-[0.06em] text-slate-400">Salida</p>
                                    <p className="mt-0.5 text-sm font-semibold text-ink">{formatDateTime(visit.exit_time, 'Sin salida registrada')}</p>
                                </div>
                            </li>
                        </ol>
                        {duration && (
                            <div className="mx-6 mb-6 rounded-xl bg-slate-50 px-4 py-3 text-sm ring-1 ring-inset ring-slate-200">
                                <span className="text-slate-500">{inside ? 'Tiempo en el edificio:' : 'Duración de la visita:'}</span>{' '}
                                <span className="font-semibold text-ink">{duration}</span>
                            </div>
                        )}
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
