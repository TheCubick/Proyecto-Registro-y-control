@extends('layout.plantilla')

@section('title', isset($visitor) ? 'Editar visitante' : 'Nuevo visitante')
@section('favicon', 'visitantes.png')

@section('content')
    @php
        $isEdit = isset($visitor);
        $fullNameInputClass = $errors->has('full_name') ? 'border-red-300 bg-red-50/30 text-red-900' : 'border-slate-300 bg-white text-slate-800';
        $identificationInputClass = $errors->has('identification_number') ? 'border-red-300 bg-red-50/30 text-red-900' : 'border-slate-300 bg-white text-slate-800';
        $phoneInputClass = $errors->has('phone') ? 'border-red-300 bg-red-50/30 text-red-900' : 'border-slate-300 bg-white text-slate-800';
    @endphp

    <x-form-card
        title="{{ $isEdit ? 'Editar visitante' : 'Nuevo visitante' }}"
        description="{{ $isEdit ? 'Actualiza la informacion del visitante.' : 'Registra una persona visitante.' }}"
        action="{{ $isEdit ? route('visitors.update', $visitor->id) : route('visitors.store') }}"
        back-route="{{ route('visitors.index') }}"
        section-title="Informacion del visitante"
        section-description="Completa los datos basicos de la persona."
        submit-label="{{ $isEdit ? 'Actualizar' : 'Guardar' }}"
        method="{{ $isEdit ? 'PUT' : 'POST' }}"
    >
        <div>
            <label for="full_name" class="mb-1.5 block text-[13px] font-semibold text-slate-700">Nombre completo</label>
            <input type="text" name="full_name" id="full_name" value="{{ old('full_name', $visitor->full_name ?? '') }}" required autofocus placeholder="Ej. Pablo Ramirez"
                class="h-10.5 w-full rounded-[10px] border px-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-[#2757C8] focus:ring-4 focus:ring-[#2757C8]/20 {{ $fullNameInputClass }}">
            @error('full_name')
                <p class="mt-1.5 text-xs text-red-600">{{ $message }}</p>
            @enderror
        </div>

        <div>
            <label for="identification_number" class="mb-1.5 block text-[13px] font-semibold text-slate-700">Numero de identificacion</label>
            <input type="text" name="identification_number" id="identification_number" value="{{ old('identification_number', $visitor->identification_number ?? '') }}" required placeholder="Ej. VST-1001"
                class="h-10.5 w-full rounded-[10px] border px-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-[#2757C8] focus:ring-4 focus:ring-[#2757C8]/20 {{ $identificationInputClass }}">
            @error('identification_number')
                <p class="mt-1.5 text-xs text-red-600">{{ $message }}</p>
            @enderror
        </div>

        <div>
            <label for="phone" class="mb-1.5 block text-[13px] font-semibold text-slate-700">Telefono</label>
            <input type="text" name="phone" id="phone" value="{{ old('phone', $visitor->phone ?? '') }}" placeholder="Ej. 555-0101"
                class="h-10.5 w-full rounded-[10px] border px-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-[#2757C8] focus:ring-4 focus:ring-[#2757C8]/20 {{ $phoneInputClass }}">
            @error('phone')
                <p class="mt-1.5 text-xs text-red-600">{{ $message }}</p>
            @enderror
        </div>
    </x-form-card>
@endsection
