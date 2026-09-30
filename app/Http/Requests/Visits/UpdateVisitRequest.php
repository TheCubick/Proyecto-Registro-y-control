<?php

namespace App\Http\Requests\Visits;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateVisitRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

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
            'status' => ['required', Rule::in(['dentro', 'completado', 'cancelado'])],
        ];
    }

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
