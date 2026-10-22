<?php

namespace App\Http\Requests\Visitors;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

/**
 * Valida los datos para la edición de un visitante.
 *
 * Laravel ejecuta esta clase antes de entrar al controlador: si la validación
 * falla, redirige de vuelta con los errores, que Inertia expone en `form.errors`.
 * Regla de negocio: El número de identificación debe ser único, ignorando el propio registro.
 */
class UpdateVisitorRequest extends FormRequest
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
            'full_name' => ['required', 'string', 'max:255'],
            'identification_number' => [
                'required',
                'string',
                'max:255',
                Rule::unique('visitors', 'identification_number')->ignore($this->route('id')),
            ],
            'phone' => ['nullable', 'string', 'max:30'],
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
            'identification_number.unique' => 'Este numero de identificacion ya existe.',
        ];
    }
}
