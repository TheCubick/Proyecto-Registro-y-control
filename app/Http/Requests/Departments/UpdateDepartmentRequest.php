<?php

namespace App\Http\Requests\Departments;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

/**
 * Valida los datos para la edición de un departamento.
 *
 * Laravel ejecuta esta clase antes de entrar al controlador: si la validación
 * falla, redirige de vuelta con los errores, que Inertia expone en `form.errors`.
 * Regla de negocio: El nombre debe ser único, ignorando el propio registro que se edita.
 */
class UpdateDepartmentRequest extends FormRequest
{
    /**
     * Determina si el usuario puede realizar esta petición.
     *
     * Actualmente permite a todos; aquí se aplicará la autorización por rol (RBAC).
     *
     * @return bool
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Reglas de validación de los campos.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => [
                'required',
                'string',
                'max:255',
                Rule::unique('departments', 'name')->ignore($this->route('id')),
            ],
            'building_floor' => [
                'required',
                'string',
                'max:255',
            ],
        ];
    }

    /**
     * Mensajes de error personalizados en español.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'name.unique' => 'Este departamento ya existe.',
        ];
    }
}
