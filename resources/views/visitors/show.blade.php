@extends('layout.plantilla')

@section('title', 'Detalle del visitante')
@section('favicon', 'visitantes.png')

@section('content')
    <section class="mx-auto max-w-2xl space-y-6">
        <div>
            <p class="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#2757C8]">Directorio operativo</p>
            <h1 class="text-3xl font-semibold tracking-tight text-slate-900">Detalle del visitante</h1>
        </div>

        <div class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <dl class="space-y-4 text-sm">
                <div>
                    <dt class="font-semibold text-slate-500">Nombre completo</dt>
                    <dd class="mt-1 text-slate-900">{{ $visitor->full_name }}</dd>
                </div>
                <div>
                    <dt class="font-semibold text-slate-500">Numero de identificacion</dt>
                    <dd class="mt-1 text-slate-900">{{ $visitor->identification_number }}</dd>
                </div>
                <div>
                    <dt class="font-semibold text-slate-500">Telefono</dt>
                    <dd class="mt-1 text-slate-900">{{ $visitor->phone ?: 'No registrado' }}</dd>
                </div>
            </dl>

            <div class="mt-6 flex gap-3 border-t border-slate-100 pt-5">
                <a href="{{ route('visitors.edit', $visitor->id) }}" class="inline-flex items-center rounded-lg bg-[#2757C8] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#234DAF]">Editar</a>
                <a href="{{ route('visitors.index') }}" class="inline-flex items-center rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-[#2757C8] transition hover:bg-slate-50">Volver</a>
            </div>
        </div>
    </section>
@endsection
