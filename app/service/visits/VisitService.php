<?php

namespace App\service\visits;

use App\Models\visits;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

/**
 * Capa de servicio del módulo de visitas.
 *
 * Encapsula el acceso a datos del modelo `visits` y la carga anticipada (eager loading)
 * de sus relaciones para evitar consultas N+1. Se inyecta en `VisitController`.
 */
class VisitService
{
    /**
     * Lista las visitas con visitante, departamento y usuario, de la entrada más
     * reciente a la más antigua, 10 por página.
     *
     * @return LengthAwarePaginator
     */
    public function getAll(): LengthAwarePaginator
    {
        return visits::with(['visitor', 'department', 'user'])
            ->latest('entry_time')
            ->paginate(10);
    }

    /**
     * Registra una visita.
     *
     * @param  array<string, mixed>  $data  Datos validados por StoreVisitRequest.
     * @return visits La visita creada.
     */
    public function create(array $data): visits
    {
        return visits::create($data);
    }

    /**
     * Busca una visita con sus relaciones.
     *
     * @param  int  $id
     * @return visits
     *
     * @throws \Illuminate\Database\Eloquent\ModelNotFoundException Si no existe (se traduce en HTTP 404).
     */
    public function find(int $id): visits
    {
        return visits::with(['visitor', 'department', 'user'])->findOrFail($id);
    }

    /**
     * Actualiza una visita (incluye la hora de salida y el estado).
     *
     * @param  int  $id
     * @param  array<string, mixed>  $data  Datos validados por UpdateVisitRequest.
     * @return bool true si se actualizó al menos un registro.
     */
    public function update(int $id, array $data): bool
    {
        return visits::where('id', $id)->update($data) > 0;
    }

    /**
     * Elimina una visita.
     *
     * @param  int  $id
     * @return bool true si se eliminó el registro.
     */
    public function delete(int $id): bool
    {
        return visits::where('id', $id)->delete() > 0;
    }
}
