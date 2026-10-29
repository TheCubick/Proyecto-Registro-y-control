/**
 * Listado de departamentos (`departments.index`).
 *
 * @param {Object} props
 * @param {Object} props.departments Paginador de Laravel con los departamentos (`data`, `links`, `total`...).
 */
import { Head, useForm } from '@inertiajs/react';
import { Building2, CalendarDays, MapPin, Pencil, Plus, Settings2, Trash2 } from 'lucide-react';
import { useState } from 'react';
import Badge from '../../Components/UI/Badge';
import Button, { ButtonLink } from '../../Components/UI/Button';
import Card, { CardHeader } from '../../Components/UI/Card';
import EmptyState from '../../Components/UI/EmptyState';
import IconTile from '../../Components/UI/IconTile';
import { ConfirmDialog } from '../../Components/UI/Modal';
import PageHeader from '../../Components/UI/PageHeader';
import Pagination from '../../Components/UI/Pagination';
import Table, { TableBody, TableHead, TableRow, Td } from '../../Components/UI/Table';
import { formatDate } from '../../lib/format';
import AppLayout from '../../Layouts/AppLayout';

const COLUMNS = [
    { label: 'Departamento', icon: Building2 },
    { label: 'Edificio / Piso', icon: MapPin },
    { label: 'Alta', icon: CalendarDays },
    { label: 'Acciones', icon: Settings2, align: 'right' },
];

export default function Index({ departments }) {
    const { delete: destroy, processing } = useForm();
    const [toDelete, setToDelete] = useState(null);
    const rows = departments.data ?? departments;

    /** Elimina el departamento seleccionado en el diálogo de confirmación. */
    const confirmDelete = () => {
        destroy(`/departamentos/${toDelete.id}`, { preserveScroll: true, onFinish: () => setToDelete(null) });
    };

    return (
        <AppLayout>
            <Head title="Departamentos" />
            <div className="space-y-6">
                <PageHeader
                    eyebrow="Directorio operativo"
                    title="Departamentos"
                    description="Administra las áreas del edificio y su ubicación."
                    icon={Building2}
                    tone="violet"
                    actions={
                        <ButtonLink href="/departamentos/crear" icon={Plus}>
                            Nuevo departamento
                        </ButtonLink>
                    }
                />

                <Card className="overflow-hidden">
                    <CardHeader
                        title="Listado registrado"
                        description="Áreas disponibles como destino de las visitas"
                        actions={<Badge tone="violet">{departments.total ?? rows.length} departamentos</Badge>}
                    />
                    {rows.length ? (
                        <>
                            <Table className="min-w-160">
                                <TableHead columns={COLUMNS} />
                                <TableBody>
                                    {rows.map(department => (
                                        <TableRow key={department.id}>
                                            <Td>
                                                <div className="flex items-center gap-3">
                                                    <IconTile icon={Building2} tone="violet" size="sm" />
                                                    <span className="font-semibold text-ink">{department.name}</span>
                                                </div>
                                            </Td>
                                            <Td className="text-slate-700">{department.building_floor}</Td>
                                            <Td className="text-slate-600">{formatDate(department.created_at)}</Td>
                                            <Td align="right">
                                                <div className="flex justify-end gap-2">
                                                    <ButtonLink href={`/departamentos/${department.id}/editar`} variant="secondary" size="sm" icon={Pencil}>
                                                        Editar
                                                    </ButtonLink>
                                                    <Button onClick={() => setToDelete(department)} variant="danger" size="sm" icon={Trash2}>
                                                        Eliminar
                                                    </Button>
                                                </div>
                                            </Td>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <Pagination paginator={departments} noun="departamentos" />
                        </>
                    ) : (
                        <EmptyState
                            icon={Building2}
                            title="Aún no hay departamentos registrados"
                            description="Registra las áreas del edificio para poder asignarlas como destino de las visitas."
                            action={
                                <ButtonLink href="/departamentos/crear" icon={Plus}>
                                    Crear departamento
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
                title={`¿Eliminar "${toDelete?.name}"?`}
                description="También se eliminarán todas las visitas registradas a este departamento. Esta acción no se puede deshacer."
            />
        </AppLayout>
    );
}
