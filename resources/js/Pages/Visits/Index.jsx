/**
 * Listado de visitas (`visits.index`).
 *
 * Muestra indicadores de la página actual (personas dentro, salidas, gafetes
 * pendientes) y la tabla de visitas con su estado.
 *
 * @param {Object} props
 * @param {Object} props.visits Paginador de Laravel; cada visita incluye `visitor`, `department` y `user`.
 */
import { Head, useForm } from '@inertiajs/react';
import { Building2, CircleCheck, ClipboardList, DoorOpen, Eye, LogIn, LogOut, MessageSquareText, Pencil, Plus, Settings2, Ticket, TicketX, Trash2, UserRound, Activity } from 'lucide-react';
import Avatar from '../../Components/UI/Avatar';
import Badge, { StatusBadge } from '../../Components/UI/Badge';
import Button, { ButtonLink } from '../../Components/UI/Button';
import Card, { CardHeader } from '../../Components/UI/Card';
import EmptyState from '../../Components/UI/EmptyState';
import PageHeader from '../../Components/UI/PageHeader';
import Pagination from '../../Components/UI/Pagination';
import StatCard from '../../Components/UI/StatCard';
import Table, { TableHead, Td, rowClass, tbodyClass } from '../../Components/UI/Table';
import { formatDateTime } from '../../lib/format';
import AppLayout from '../../Layouts/AppLayout';

const COLUMNS = [
    { label: 'Visitante', icon: UserRound },
    { label: 'Departamento', icon: Building2 },
    { label: 'Motivo', icon: MessageSquareText },
    { label: 'Gafete', icon: Ticket },
    { label: 'Entrada', icon: LogIn },
    { label: 'Salida', icon: LogOut },
    { label: 'Estado', icon: Activity },
    { label: 'Acciones', icon: Settings2, align: 'right' },
];

export default function Index({ visits }) {
    const { delete: destroy } = useForm();
    const rows = visits.data ?? visits;

    const inside = rows.filter(visit => visit.status === 'dentro').length;
    const finished = rows.filter(visit => visit.status === 'completado').length;
    const withoutBadge = rows.filter(visit => visit.status === 'dentro' && !visit.badge_number).length;

    /**
     * Solicita confirmación y elimina la visita.
     *
     * @param {number} id
     */
    const remove = id => {
        if (window.confirm('¿Eliminar esta visita?')) {
            destroy(`/visitas/${id}`);
        }
    };

    return (
        <AppLayout>
            <Head title="Visitas" />
            <div className="space-y-6">
                <PageHeader
                    eyebrow="Control de acceso"
                    title="Visitas"
                    description="Registra y consulta los ingresos al edificio."
                    icon={ClipboardList}
                    actions={
                        <ButtonLink href="/visitas/crear" icon={Plus}>
                            Nueva visita
                        </ButtonLink>
                    }
                />

                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <StatCard label="Visitas registradas" value={visits.total ?? rows.length} hint="Total histórico" icon={ClipboardList} tone="cobalt" />
                    <StatCard label="En edificio" value={inside} hint="En la página actual" icon={DoorOpen} tone="emerald" />
                    <StatCard label="Salidas registradas" value={finished} hint="En la página actual" icon={CircleCheck} tone="slate" />
                    <StatCard label="Dentro sin gafete" value={withoutBadge} hint="Requieren atención" icon={TicketX} tone={withoutBadge ? 'amber' : 'slate'} />
                </div>

                <Card className="overflow-hidden">
                    <CardHeader
                        title="Bitácora de visitas"
                        description="Ordenada de la entrada más reciente a la más antigua"
                        actions={<Badge tone="cobalt">{visits.total ?? rows.length} visitas</Badge>}
                    />
                    {rows.length ? (
                        <>
                            <Table className="min-w-260">
                                <TableHead columns={COLUMNS} />
                                <tbody className={tbodyClass}>
                                    {rows.map(visit => (
                                        <tr key={visit.id} className={rowClass}>
                                            <Td>
                                                <div className="flex items-center gap-3">
                                                    <Avatar name={visit.visitor?.full_name} />
                                                    <div className="min-w-0">
                                                        <p className="font-semibold text-ink">{visit.visitor?.full_name}</p>
                                                        <p className="font-mono text-xs text-slate-400">{visit.visitor?.identification_number}</p>
                                                    </div>
                                                </div>
                                            </Td>
                                            <Td className="text-slate-700">{visit.department?.name}</Td>
                                            <Td className="max-w-50 truncate text-slate-600" title={visit.reason}>
                                                {visit.reason}
                                            </Td>
                                            <Td>
                                                {visit.badge_number ? (
                                                    <Badge tone="cobalt" icon={Ticket} className="font-mono">
                                                        {visit.badge_number}
                                                    </Badge>
                                                ) : (
                                                    <Badge tone="amber" icon={TicketX}>
                                                        No asignado
                                                    </Badge>
                                                )}
                                            </Td>
                                            <Td className="whitespace-nowrap text-slate-600">{formatDateTime(visit.entry_time)}</Td>
                                            <Td className="whitespace-nowrap text-slate-600">{formatDateTime(visit.exit_time)}</Td>
                                            <Td>
                                                <StatusBadge status={visit.status} />
                                            </Td>
                                            <Td align="right">
                                                <div className="flex justify-end gap-2">
                                                    <ButtonLink href={`/visitas/${visit.id}`} variant="ghost" size="sm" icon={Eye}>
                                                        Ver
                                                    </ButtonLink>
                                                    <ButtonLink href={`/visitas/${visit.id}/editar`} variant="secondary" size="sm" icon={Pencil}>
                                                        Editar
                                                    </ButtonLink>
                                                    <Button onClick={() => remove(visit.id)} variant="danger" size="sm" icon={Trash2}>
                                                        Eliminar
                                                    </Button>
                                                </div>
                                            </Td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                            <Pagination paginator={visits} noun="visitas" />
                        </>
                    ) : (
                        <EmptyState
                            icon={ClipboardList}
                            title="Aún no hay visitas registradas"
                            description="Cuando una persona ingrese al edificio, regístrala aquí para llevar el control de su estancia."
                            action={
                                <ButtonLink href="/visitas/crear" icon={Plus}>
                                    Registrar visita
                                </ButtonLink>
                            }
                        />
                    )}
                </Card>
            </div>
        </AppLayout>
    );
}
