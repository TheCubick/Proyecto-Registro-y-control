@extends('layout.plantilla')

@section('title', 'Detalle de visita')
@section('favicon', 'visitas.png')

@section('content')
    <section class="mx-auto max-w-2xl space-y-6">
        <div>
            <p class="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#2757C8]">Control de acceso</p>
            <h1 class="text-3xl font-semibold tracking-tight text-slate-900">Detalle de visita</h1>
        </div>

        <div class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <dl class="grid gap-4 text-sm sm:grid-cols-2">
                <div><dt class="font-semibold text-slate-500">Visitante</dt><dd class="mt-1 text-slate-900">{{ $visit->visitor->full_name }}</dd></div>
                <div><dt class="font-semibold text-slate-500">Departamento</dt><dd class="mt-1 text-slate-900">{{ $visit->department->name }}</dd></div>
                <div><dt class="font-semibold text-slate-500">Usuario responsable</dt><dd class="mt-1 text-slate-900">{{ $visit->user->name }}</dd></div>
                <div><dt class="font-semibold text-slate-500">Motivo</dt><dd class="mt-1 text-slate-900">{{ $visit->reason }}</dd></div>
                <div><dt class="font-semibold text-slate-500">Gafete</dt><dd class="mt-1 text-slate-900">{{ $visit->badge_number ?: 'No asignado' }}</dd></div>
                <div><dt class="font-semibold text-slate-500">Estado</dt><dd class="mt-1 text-slate-900">{{ ucfirst($visit->status) }}</dd></div>
                <div><dt class="font-semibold text-slate-500">Entrada</dt><dd class="mt-1 text-slate-900">{{ $visit->entry_time->format('d/m/Y H:i') }}</dd></div>
                <div><dt class="font-semibold text-slate-500">Salida</dt><dd class="mt-1 text-slate-900">{{ $visit->exit_time?->format('d/m/Y H:i') ?? 'Sin salida' }}</dd></div>
            </dl>

            <div class="mt-6 flex gap-3 border-t border-slate-100 pt-5">
                <a href="{{ route('visits.edit', $visit->id) }}" class="inline-flex items-center rounded-lg bg-[#2757C8] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#234DAF]">Editar</a>
                <a href="{{ route('visits.index') }}" class="inline-flex items-center rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-[#2757C8] transition hover:bg-slate-50">Volver</a>
            </div>
        </div>
    </section>
@endsection
