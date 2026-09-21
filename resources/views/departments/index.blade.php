@extends('layout.plantilla')

@section('title', 'Departamentos')
@section('favicon', 'departamentos.png')

@section('content')

    <section class="space-y-8">
        <div class="flex flex-col gap-6 border-b border-gray-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
                <p class="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#2757C8]">Directorio operativo</p>
                <h1 class="text-3xl font-semibold tracking-tight text-slate-900">Departamentos</h1>
                <p class="mt-2 max-w-xl text-sm leading-6 text-slate-500">Administra los espacios y niveles disponibles para organizar el control de visitas.</p>
            </div>

            <a href="{{ route('departments.create') }}" class="inline-flex items-center justify-center gap-2 rounded-lg bg-[#2757C8] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#234DAF] focus:outline-none focus:ring-2 focus:ring-[#2757C8]/30">
                <svg class="h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v14m-7-7h14"/>
                </svg>
                Nuevo departamento
            </a>
        </div>

        <div class="overflow-hidden rounded-xl border border-gray-200 bg-white">
            <div class="flex items-center justify-between border-b border-gray-200 px-5 py-4">
                <div>
                    <h2 class="text-base font-semibold text-slate-900">Listado registrado</h2>
                    <p class="mt-1 text-xs text-slate-500">{{ $departments->count() }} departamentos disponibles</p>
                </div>
                <span class="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-[#2757C8]">Activos</span>
            </div>

                {{-- Tabla --}}
            <div class="overflow-x-auto">
                <table class="w-full min-w-105 text-left text-sm">
                    <thead class="bg-slate-50 text-xs uppercase tracking-[0.08em] text-slate-500">
                        <tr>
                            <th class="px-5 py-3 font-semibold">Departamento</th>
                            <th class="px-5 py-3 font-semibold">Piso / edificio</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-100">
                        @forelse ($departments as $department)
                            <tr class="transition hover:bg-blue-50/40">
                                <td class="px-5 py-4 font-medium text-slate-800">{{ $department->name }}</td>
                                <td class="px-5 py-4 text-slate-600">{{ $department->building_floor }}</td>
                            </tr>
                        @empty
                            <tr>
                                <td colspan="2" class="px-5 py-10 text-center text-sm text-slate-500">Aún no hay departamentos registrados.</td>
                            </tr>
                        @endforelse
                    </tbody>
                </table>
            </div>
        </div>
    </div>

@endsection


