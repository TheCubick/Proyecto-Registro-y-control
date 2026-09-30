@extends('layout.plantilla')

@section('title', 'Control | Visitas')
@section('favicon', 'visitas.png')

@section('content')
    @if (session('message'))
        <x-alert type="success" class="mb-6">
            <x-slot name="title">Correcto</x-slot>
            {{ session('message') }}
        </x-alert>
    @endif

    <section class="space-y-8">
        <div class="flex flex-col gap-6 border-b border-gray-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
                <p class="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#2757C8]">Control de acceso</p>
                <h1 class="text-3xl font-semibold tracking-tight text-slate-900">Visitas</h1>
                <p class="mt-2 max-w-xl text-sm leading-6 text-slate-500">Registra y consulta los accesos de visitantes a cada departamento.</p>
            </div>

            <a href="{{ route('visits.create') }}" class="inline-flex items-center justify-center gap-2 rounded-lg bg-[#2757C8] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#234DAF] focus:outline-none focus:ring-2 focus:ring-[#2757C8]/30">
                <span aria-hidden="true">+</span>
                Nueva visita
            </a>
        </div>

        <div class="overflow-hidden rounded-xl border border-gray-200 bg-white">
            <div class="flex items-center justify-between border-b border-gray-200 px-5 py-4">
                <div>
                    <h2 class="text-base font-semibold text-slate-900">Listado registrado</h2>
                    <p class="mt-1 text-xs text-slate-500">{{ $visits->total() }} visitas disponibles</p>
                </div>
                <span class="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-[#2757C8]">Control activo</span>
            </div>

            <div class="overflow-x-auto">
                <table class="w-full min-w-240 text-left text-sm">
                    <thead class="bg-slate-50 text-xs uppercase tracking-[0.08em] text-slate-500">
                        <tr>
                            <th class="px-5 py-3 font-semibold">Visitante</th>
                            <th class="px-5 py-3 font-semibold">Departamento</th>
                            <th class="px-5 py-3 font-semibold">Motivo</th>
                            <th class="px-5 py-3 font-semibold">Gafete</th>
                            <th class="px-5 py-3 font-semibold">Entrada</th>
                            <th class="px-5 py-3 font-semibold">Estado</th>
                            <th class="px-5 py-3 text-right font-semibold">Acciones</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-100">
                        @forelse ($visits as $visit)
                            <tr class="transition hover:bg-blue-50/40">
                                <td class="px-5 py-4 font-medium text-slate-800">{{ $visit->visitor->full_name }}</td>
                                <td class="px-5 py-4 text-slate-600">{{ $visit->department->name }}</td>
                                <td class="px-5 py-4 text-slate-600">{{ $visit->reason }}</td>
                                <td class="px-5 py-4 text-slate-600">{{ $visit->badge_number ?: 'No asignado' }}</td>
                                <td class="whitespace-nowrap px-5 py-4 text-slate-600">{{ $visit->entry_time->format('d/m/Y H:i') }}</td>
                                <td class="px-5 py-4">
                                    <span class="rounded-full px-3 py-1 text-xs font-semibold {{ $visit->status === 'dentro' ? 'bg-emerald-50 text-emerald-700' : ($visit->status === 'cancelado' ? 'bg-red-50 text-red-700' : 'bg-slate-100 text-slate-700') }}">{{ ucfirst($visit->status) }}</span>
                                </td>
                                <td class="px-5 py-4 text-right">
                                    <div class="flex justify-end gap-3">
                                        <a href="{{ route('visits.show', $visit->id) }}" class="inline-flex items-center rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-500/20">Ver</a>
                                        <form action="{{ route('visits.edit', $visit->id) }}" method="GET">
                                            <button type="submit" class="inline-flex items-center rounded-lg border border-[#2757C8] px-3 py-2 text-xs font-semibold text-[#2757C8] transition hover:bg-blue-50 focus:outline-none focus:ring-4 focus:ring-[#2757C8]/20">Editar</button>
                                        </form>
                                        <form action="{{ route('visits.destroy', $visit->id) }}" method="POST">
                                            @csrf
                                            @method('DELETE')
                                            <button type="submit" class="inline-flex items-center rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50 focus:outline-none focus:ring-4 focus:ring-red-500/20">Eliminar</button>
                                        </form>
                                    </div>
                                </td>
                            </tr>
                        @empty
                            <tr>
                                <td colspan="7" class="px-5 py-10 text-center text-sm text-slate-500">Aun no hay visitas registradas.</td>
                            </tr>
                        @endforelse
                    </tbody>
                </table>
            </div>

            @if ($visits->hasPages())
                <div class="border-t border-gray-200 px-5 py-4">
                    {{ $visits->links() }}
                </div>
            @endif
        </div>
    </section>
@endsection
