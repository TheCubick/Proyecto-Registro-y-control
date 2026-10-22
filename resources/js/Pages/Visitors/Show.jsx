/**
 * Detalle de un visitante (`visitors.show`).
 *
 * @param {Object} props
 * @param {Object} props.visitor Visitante con `full_name`, `identification_number`, `phone` y fechas.
 */
import { Head } from '@inertiajs/react';
import { ArrowLeft, CalendarDays, IdCard, Pencil, Phone, RefreshCw } from 'lucide-react';
import Avatar from '../../Components/UI/Avatar';
import Badge from '../../Components/UI/Badge';
import { ButtonLink } from '../../Components/UI/Button';
import Card from '../../Components/UI/Card';
import DetailItem from '../../Components/UI/DetailItem';
import { formatDateTime } from '../../lib/format';
import AppLayout from '../../Layouts/AppLayout';

export default function Show({ visitor }) {
    return (
        <AppLayout>
            <Head title={visitor.full_name} />
            <div className="mx-auto max-w-3xl space-y-6">
                <ButtonLink href="/visitantes" variant="ghost" size="sm" icon={ArrowLeft}>
                    Volver a visitantes
                </ButtonLink>

                <Card className="overflow-hidden">
                    <div className="h-20 bg-linear-to-r from-cobalt-600 to-sky-500" aria-hidden="true" />
                    <div className="px-6 pb-6">
                        <div className="-mt-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                            <div className="flex items-end gap-4">
                                <Avatar name={visitor.full_name} size="lg" />
                                <div className="pb-1">
                                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cobalt-600">Visitante</p>
                                    <h1 className="text-2xl font-bold tracking-tight text-ink">{visitor.full_name}</h1>
                                </div>
                            </div>
                            <ButtonLink href={`/visitantes/${visitor.id}/editar`} icon={Pencil}>
                                Editar
                            </ButtonLink>
                        </div>

                        <dl className="mt-8 grid gap-6 border-t border-slate-100 pt-6 sm:grid-cols-2">
                            <DetailItem icon={IdCard} label="Identificación">
                                <span className="font-mono">{visitor.identification_number}</span>
                            </DetailItem>
                            <DetailItem icon={Phone} label="Teléfono">
                                {visitor.phone || <Badge tone="slate">No registrado</Badge>}
                            </DetailItem>
                            <DetailItem icon={CalendarDays} label="Fecha de registro">
                                {formatDateTime(visitor.created_at)}
                            </DetailItem>
                            <DetailItem icon={RefreshCw} label="Última actualización">
                                {formatDateTime(visitor.updated_at)}
                            </DetailItem>
                        </dl>
                    </div>
                </Card>
            </div>
        </AppLayout>
    );
}
