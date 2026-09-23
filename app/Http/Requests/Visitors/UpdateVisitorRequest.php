<?php

namespace App\Http\Requests\Visitors;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateVisitorRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

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

    public function messages(): array
    {
        return [
            'identification_number.unique' => 'Este numero de identificacion ya existe.',
        ];
    }
}
