<?php

namespace App\service\visitors;

use App\Models\visitors;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

/**
 * Capa de servicio del módulo de visitantes.
 *
 * Encapsula el acceso a datos del modelo `visitors`. Se inyecta en
 * `VisitorController` por constructor.
 */
class VisitorService
{
    /**
     * Lista los visitantes del más reciente al más antiguo, 10 por página.
     *
     * @return LengthAwarePaginator
     */
    public function getAll(): LengthAwarePaginator
    {
        return visitors::latest()->paginate(10);
    }

    /**
     * Registra un visitante.
     *
     * @param  array{full_name: string, identification_number: string, phone?: string|null}  $data  Datos validados por StoreVisitorRequest.
     * @return visitors El visitante creado.
     */
    public function create(array $data): visitors
    {
        return visitors::create($data);
    }

    /**
     * Busca un visitante por su identificador.
     *
     * @param  int  $id
     * @return visitors
     *
     * @throws \Illuminate\Database\Eloquent\ModelNotFoundException Si no existe (se traduce en HTTP 404).
     */
    public function find(int $id): visitors
    {
        return visitors::findOrFail($id);
    }

    /**
     * Actualiza los datos de un visitante.
     *
     * @param  int  $id
     * @param  array{full_name: string, identification_number: string, phone?: string|null}  $data  Datos validados por UpdateVisitorRequest.
     * @return bool true si se actualizó al menos un registro.
     */
    public function update(int $id, array $data): bool
    {
        return visitors::where('id', $id)->update($data) > 0;
    }

    /**
     * Elimina un visitante (sus visitas se eliminan en cascada).
     *
     * @param  int  $id
     * @return bool true si se eliminó el registro.
     */
    public function delete(int $id): bool
    {
        return visitors::where('id', $id)->delete() > 0;
    }
}
