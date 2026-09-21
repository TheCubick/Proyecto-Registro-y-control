@extends('layout.plantilla')

@section('title', 'Nuevo departamento')
@section('favicon', 'departamentos.png')

@section('content')
    <x-form-card
        title="Nuevo departamento"
        description="Registra un área o piso para organizar el control de accesos."
        action="{{ route('departments.store') }}"
        back-route="{{ route('departments.index') }}"
        section-title="Información del departamento"
        section-description="Completa los datos básicos del espacio."
        submit-label="Guardar"
    >

        @php
            $nameInputClass = $errors->has('name') ? 'border-red-300 bg-red-50/30 text-red-900' : 'border-slate-300 bg-white text-slate-800';
            $buildingFloorInputClass = $errors->has('building_floor') ? 'border-red-300 bg-red-50/30 text-red-900' : 'border-slate-300 bg-white text-slate-800';
        @endphp

        <div>
            <label for="name" class="mb-1.5 block text-[13px] font-semibold text-slate-700">Nombre del departamento</label>
            <input type="text" name="name" id="name" value="{{ old('name') }}" required autofocus placeholder="Ej. Soporte Técnico"
                class="h-10.5 w-full rounded-[10px] border px-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-[#2757C8] focus:ring-4 focus:ring-[#2757C8]/20 {{ $nameInputClass }}">
            @error('name')
                <p class="mt-1.5 text-xs text-red-600">{{ $message }}</p>
            @enderror
        </div>

        <div>
            <label for="building_floor" class="mb-1.5 block text-[13px] font-semibold text-slate-700">Piso / edificio</label>
            <input type="text" name="building_floor" id="building_floor" value="{{ old('building_floor') }}" required placeholder="Ej. Edificio A, Piso 2"
                class="h-10.5 w-full rounded-[10px] border px-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-[#2757C8] focus:ring-4 focus:ring-[#2757C8]/20 {{ $buildingFloorInputClass }}">
            @error('building_floor')
                <p class="mt-1.5 text-xs text-red-600">{{ $message }}</p>
            @enderror
        </div>
    </x-form-card>

@endsection
