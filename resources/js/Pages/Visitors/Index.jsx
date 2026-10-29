/**
 * Listado de visitantes (`visitors.index`).
 *
 * @param {Object} props
 * @param {Object} props.visitors Paginador de Laravel con los visitantes (`data`, `links`, `total`...).
 */
import { Head, useForm } from '@inertiajs/react';
import { CalendarDays, Eye, IdCard, Pencil, Phone, Settings2, Trash2, UserPlus, UserRound, Users } from 'lucide-react';
import { useState } from 'react';
import Avatar from '../../Components/UI/Avatar';
import Badge from '../../Components/UI/Badge';
import Button, { ButtonLink } from '../../Components/UI/Button';
import Card, { CardHeader } from '../../Components/UI/Card';
import EmptyState from '../../Components/UI/EmptyState';
import { ConfirmDialog } from '../../Components/UI/Modal';
import PageHeader from '../../Components/UI/PageHeader';
import Pagination from '../../Components/UI/Pagination';
import Table, { TableBody, TableHead, TableRow, Td } from '../../Components/UI/Table';
import { formatDate } from '../../lib/format';
import AppLayout from '../../Layouts/AppLayout';

const COLUMNS = [
    { label: 'Nombre completo', icon: UserRound },
    { label: 'Identificación', icon: IdCard },
    { label: 'Teléfono', icon: Phone },
    { label: 'Registro', icon: CalendarDays },
    { label: 'Acciones', icon: Settings2, align: 'right' },
];

export default function Index({ visitors }) {
    const { delete: destroy, processing } = useForm();
    const [toDelete, setToDelete] = useState(null);
    const rows = visitors.data ?? visitors;

    /** Elimina al visitante seleccionado en el diálogo de confirmación. */
    const confirmDelete = () => {
        destroy(`/visitantes/${toDelete.id}`, { preserveScroll: true, onFinish: () => setToDelete(null) });
    };

    return (
        <AppLayout>
            <Head title="Visitantes" />
            <div className="space-y-6">
                <PageHeader
                    eyebrow="Directorio operativo"
                    title="Visitantes"
                    description="Catálogo de personas externas autorizadas para ingresar."
                    icon={Users}
                    tone="sky"
                    actions={
                        <ButtonLink href="/visitantes/crear" icon={UserPlus}>
                            Nuevo visitante
                        </ButtonLink>
                    }
                />

                <Card className="overflow-hidden">
                    <CardHeader
                        title="Listado registrado"
                        description="Ordenado del registro más reciente al más antiguo"
                        actions={<Badge tone="sky">{visitors.total ?? rows.length} visitantes</Badge>}
                    />
                    {rows.length ? (
                        <>
                            <Table className="min-w-190">
                                <TableHead columns={COLUMNS} />
                                <TableBody>
                                    {rows.map(visitor => (
                                        <TableRow key={visitor.id}>
                                            <Td>
                                                <div className="flex items-center gap-3">
                                                    <Avatar name={visitor.full_name} />
                                                    <span className="font-semibold text-ink">{visitor.full_name}</span>
                                                </div>
                                            </Td>
                                            <Td>
                                                <span className="rounded-md bg-slate-100 px-2 py-1 font-mono text-xs font-medium text-slate-700">{visitor.identification_number}</span>
                                            </Td>
                                            <Td className="text-slate-700">{visitor.phone || <Badge tone="slate">No registrado</Badge>}</Td>
                                            <Td className="text-slate-600">{formatDate(visitor.created_at)}</Td>
                                            <Td align="right">
                                                <div className="flex justify-end gap-2">
                                                    <ButtonLink href={`/visitantes/${visitor.id}`} variant="ghost" size="sm" icon={Eye}>
                                                        Ver
                                                    </ButtonLink>
                                                    <ButtonLink href={`/visitantes/${visitor.id}/editar`} variant="secondary" size="sm" icon={Pencil}>
                                                        Editar
                                                    </ButtonLink>
                                                    <Button onClick={() => setToDelete(visitor)} variant="danger" size="sm" icon={Trash2}>
                                                        Eliminar
                                                    </Button>
                                                </div>
                                            </Td>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <Pagination paginator={visitors} noun="visitantes" />
                        </>
                    ) : (
                        <EmptyState
                            icon={Users}
                            title="Aún no hay visitantes registrados"
                            description="Registra a la primera persona para poder crear visitas a su nombre."
                            action={
                                <ButtonLink href="/visitantes/crear" icon={UserPlus}>
                                    Crear visitante
                                </ButtonLink>
                            }
                        />
                    )}
                </Card>
            </div>

            <ConfirmDialog
                open={Boolean(toDelete)}
                onClose={() => setToDelete(null)}
                onConfirm={confirmDelete}
                processing={processing}
                title={`¿Eliminar a ${toDelete?.full_name}?`}
                description="También se eliminarán todas sus visitas registradas. Esta acción no se puede deshacer."
            />
        </AppLayout>
    );
}
