<?php

namespace App\service\departments;

use App\Models\departments;

/**
 * Capa de servicio del módulo de departamentos.
 *
 * Encapsula el acceso a datos del modelo `departments` para que el controlador
 * solo coordine la petición. Se inyecta en `Departmentscontroller` por constructor.
 */
class DepartmentService{

    /**
     * Crea un departamento.
     *
     * @param  array{name: string, building_floor: string}  $data  Datos validados por StoreDepartmentRequest.
     * @return departments El departamento creado.
     */
    public function create(array $data):departments
    {
        return departments::create($data);
    }

    /**
     * Busca un departamento por su identificador.
     *
     * @param  int  $id
     * @return departments
     *
     * @throws \Illuminate\Database\Eloquent\ModelNotFoundException Si no existe (se traduce en HTTP 404).
     */
    public function find(int $id): departments{
        return departments::findorfail($id);
    }

    /**
     * Actualiza un departamento.
     *
     * @param  int  $id
     * @param  array{name: string, building_floor: string}  $data  Datos validados por UpdateDepartmentRequest.
     * @return bool true si se actualizó al menos un registro.
     */
    public function update(int $id, array $data): bool
    {
        return departments::where('id', $id)->update($data) > 0;
    }

    /**
     * Elimina un departamento (sus visitas se eliminan en cascada).
     *
     * @param  int  $id
     * @return bool true si se eliminó el registro.
     */
    public function delete(int $id): bool
    {
        return departments::where('id', $id)->delete() > 0;
    }
}
