<?php

namespace App\Http\Requests\Visits;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

/**
 * Valida los datos para el registro de una visita.
 *
 * Laravel ejecuta esta clase antes de entrar al controlador: si la validación
 * falla, redirige de vuelta con los errores, que Inertia expone en `form.errors`.
 * Regla de negocio: Visitante, departamento y usuario deben existir; la salida no puede ser anterior a la entrada.
 */
class StoreVisitRequest extends FormRequest
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
            'visitor_id' => ['required', 'integer', 'exists:visitors,id'],
            'department_id' => ['required', 'integer', 'exists:departments,id'],
            'user_id' => ['required', 'integer', 'exists:users,id'],
            'reason' => ['required', 'string', 'max:255'],
            'badge_number' => ['nullable', 'string', 'max:255'],
            'entry_time' => ['required', 'date'],
            'exit_time' => ['nullable', 'date', 'after_or_equal:entry_time'],
            'status' => ['nullable', Rule::in(['dentro', 'completado', 'cancelado'])],
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
            'visitor_id.exists' => 'El visitante seleccionado no existe.',
            'department_id.exists' => 'El departamento seleccionado no existe.',
            'user_id.exists' => 'El usuario seleccionado no existe.',
            'exit_time.after_or_equal' => 'La salida debe ser posterior o igual a la entrada.',
        ];
    }
}
