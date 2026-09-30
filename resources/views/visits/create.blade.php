@extends('layout.plantilla')

@section('title', isset($visit) ? 'Editar visita' : 'Nueva visita')
@section('favicon', 'visitas.png')

@section('content')
    @php
        $isEdit = isset($visit);
        $inputClass = 'border-slate-300 bg-white text-slate-800';
        $errorClass = 'border-red-300 bg-red-50/30 text-red-900';
        $entryValue = old('entry_time', isset($visit) && $visit->entry_time ? $visit->entry_time->format('Y-m-d\\TH:i') : '');
        $exitValue = old('exit_time', isset($visit) && $visit->exit_time ? $visit->exit_time->format('Y-m-d\\TH:i') : '');
    @endphp

    <x-form-card
        title="{{ $isEdit ? 'Editar visita' : 'Nueva visita' }}"
        description="{{ $isEdit ? 'Actualiza la informacion de la visita.' : 'Registra una nueva visita.' }}"
        action="{{ $isEdit ? route('visits.update', $visit->id) : route('visits.store') }}"
        back-route="{{ route('visits.index') }}"
        section-title="Informacion de la visita"
        section-description="Completa los datos del registro de acceso."
        submit-label="{{ $isEdit ? 'Actualizar' : 'Guardar' }}"
        method="{{ $isEdit ? 'PUT' : 'POST' }}"
    >
        <div>
            <label for="visitor_id" class="mb-1.5 block text-[13px] font-semibold text-slate-700">Visitante</label>
            <select name="visitor_id" id="visitor_id" required class="h-10.5 w-full rounded-[10px] border px-3.5 text-sm outline-none transition focus:border-[#2757C8] focus:ring-4 focus:ring-[#2757C8]/20 {{ $errors->has('visitor_id') ? $errorClass : $inputClass }}">
                <option value="">Selecciona un visitante</option>
                @foreach ($visitors as $visitor)
                    <option value="{{ $visitor->id }}" @selected(old('visitor_id', $visit->visitor_id ?? '') == $visitor->id)>{{ $visitor->full_name }} - {{ $visitor->identification_number }}</option>
                @endforeach
            </select>
            @error('visitor_id') <p class="mt-1.5 text-xs text-red-600">{{ $message }}</p> @enderror
        </div>

        <div>
            <label for="department_id" class="mb-1.5 block text-[13px] font-semibold text-slate-700">Departamento</label>
            <select name="department_id" id="department_id" required class="h-10.5 w-full rounded-[10px] border px-3.5 text-sm outline-none transition focus:border-[#2757C8] focus:ring-4 focus:ring-[#2757C8]/20 {{ $errors->has('department_id') ? $errorClass : $inputClass }}">
                <option value="">Selecciona un departamento</option>
                @foreach ($departments as $department)
                    <option value="{{ $department->id }}" @selected(old('department_id', $visit->department_id ?? '') == $department->id)>{{ $department->name }} - {{ $department->building_floor }}</option>
                @endforeach
            </select>
            @error('department_id') <p class="mt-1.5 text-xs text-red-600">{{ $message }}</p> @enderror
        </div>

        <div>
            <label for="user_id" class="mb-1.5 block text-[13px] font-semibold text-slate-700">Usuario responsable</label>
            <select name="user_id" id="user_id" required class="h-10.5 w-full rounded-[10px] border px-3.5 text-sm outline-none transition focus:border-[#2757C8] focus:ring-4 focus:ring-[#2757C8]/20 {{ $errors->has('user_id') ? $errorClass : $inputClass }}">
                <option value="">Selecciona un usuario</option>
                @foreach ($users as $user)
                    <option value="{{ $user->id }}" @selected(old('user_id', $visit->user_id ?? '') == $user->id)>{{ $user->name }} - {{ $user->email }}</option>
                @endforeach
            </select>
            @error('user_id') <p class="mt-1.5 text-xs text-red-600">{{ $message }}</p> @enderror
        </div>

        <div>
            <label for="reason" class="mb-1.5 block text-[13px] font-semibold text-slate-700">Motivo</label>
            <input type="text" name="reason" id="reason" value="{{ old('reason', $visit->reason ?? '') }}" required placeholder="Ej. Reunion de trabajo" class="h-10.5 w-full rounded-[10px] border px-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-[#2757C8] focus:ring-4 focus:ring-[#2757C8]/20 {{ $errors->has('reason') ? $errorClass : $inputClass }}">
            @error('reason') <p class="mt-1.5 text-xs text-red-600">{{ $message }}</p> @enderror
        </div>

        <div>
            <label for="badge_number" class="mb-1.5 block text-[13px] font-semibold text-slate-700">Numero de gafete</label>
            <input type="text" name="badge_number" id="badge_number" value="{{ old('badge_number', $visit->badge_number ?? '') }}" placeholder="Ej. GAF-01" class="h-10.5 w-full rounded-[10px] border px-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-[#2757C8] focus:ring-4 focus:ring-[#2757C8]/20 {{ $errors->has('badge_number') ? $errorClass : $inputClass }}">
            @error('badge_number') <p class="mt-1.5 text-xs text-red-600">{{ $message }}</p> @enderror
        </div>

        <div class="grid gap-5 sm:grid-cols-2">
            <div>
                <label for="entry_time" class="mb-1.5 block text-[13px] font-semibold text-slate-700">Entrada</label>
                <input type="datetime-local" name="entry_time" id="entry_time" value="{{ $entryValue }}" required class="h-10.5 w-full rounded-[10px] border px-3.5 text-sm outline-none transition focus:border-[#2757C8] focus:ring-4 focus:ring-[#2757C8]/20 {{ $errors->has('entry_time') ? $errorClass : $inputClass }}">
                @error('entry_time') <p class="mt-1.5 text-xs text-red-600">{{ $message }}</p> @enderror
            </div>
            <div>
                <label for="exit_time" class="mb-1.5 block text-[13px] font-semibold text-slate-700">Salida</label>
                <input type="datetime-local" name="exit_time" id="exit_time" value="{{ $exitValue }}" class="h-10.5 w-full rounded-[10px] border px-3.5 text-sm outline-none transition focus:border-[#2757C8] focus:ring-4 focus:ring-[#2757C8]/20 {{ $errors->has('exit_time') ? $errorClass : $inputClass }}">
                @error('exit_time') <p class="mt-1.5 text-xs text-red-600">{{ $message }}</p> @enderror
            </div>
        </div>

        <div>
            <label for="status" class="mb-1.5 block text-[13px] font-semibold text-slate-700">Estado</label>
            <select name="status" id="status" required class="h-10.5 w-full rounded-[10px] border px-3.5 text-sm outline-none transition focus:border-[#2757C8] focus:ring-4 focus:ring-[#2757C8]/20 {{ $errors->has('status') ? $errorClass : $inputClass }}">
                @foreach (['dentro' => 'Dentro', 'completado' => 'Completado', 'cancelado' => 'Cancelado'] as $value => $label)
                    <option value="{{ $value }}" @selected(old('status', $visit->status ?? 'dentro') === $value)>{{ $label }}</option>
                @endforeach
            </select>
            @error('status') <p class="mt-1.5 text-xs text-red-600">{{ $message }}</p> @enderror
        </div>
    </x-form-card>
@endsection
