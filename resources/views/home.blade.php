@extends('layout.plantilla')

@section('title', 'Inicio | Control de Acceso')
@section('favicon', 'global.png')

@section('content')
<div class="max-w-6xl mx-auto px-4 py-8 space-y-8">

    <!-- Encabezado de bienvenida -->
    <div class="flex flex-col md:flex-row md:items-center md:justify-between border-b border-stone-200 pb-5">
        <div>
            <h1 class="text-2xl font-bold text-stone-800">Panel de Control de Acceso 🏢</h1>
            <p class="text-sm text-stone-500 mt-1">Gestión y monitoreo de visitantes en tiempo real</p>
        </div>
        <div class="mt-4 md:mt-0">
            <a href="{{ route('departments.create') }}" class="inline-flex items-center px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium rounded-lg shadow-sm transition">
                ➕ Registrar Departamento
            </a>
        </div>
    </div>

    <!-- Tarjetas de Métricas Rápidas -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-white p-5 rounded-xl border border-stone-200 shadow-sm flex items-center justify-between">
            <div>
                <p class="text-xs font-semibold text-stone-400 uppercase tracking-wider">Departamentos</p>
                <p class="text-2xl font-bold text-stone-800 mt-1">--</p>
            </div>
            <div class="p-3 bg-stone-100 rounded-lg text-xl">🏢</div>
        </div>

        <div class="bg-white p-5 rounded-xl border border-stone-200 shadow-sm flex items-center justify-between">
            <div>
                <p class="text-xs font-semibold text-stone-400 uppercase tracking-wider">Visitantes en Sitio</p>
                <p class="text-2xl font-bold text-stone-800 mt-1">--</p>
            </div>
            <div class="p-3 bg-emerald-50 text-emerald-600 rounded-lg text-xl">🟢</div>
        </div>

        <div class="bg-white p-5 rounded-xl border border-stone-200 shadow-sm flex items-center justify-between">
            <div>
                <p class="text-xs font-semibold text-stone-400 uppercase tracking-wider">Accesos Hoy</p>
                <p class="text-2xl font-bold text-stone-800 mt-1">--</p>
            </div>
            <div class="p-3 bg-amber-50 text-amber-600 rounded-lg text-xl">📋</div>
        </div>
    </div>

    <!-- Sección de Accesos Rápidos -->
    <div class="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
        <h2 class="text-lg font-semibold text-stone-800 mb-4">Módulos del Sistema 🗂️</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a href="{{ route('departments.index') }}" class="block p-4 rounded-lg border border-stone-200 hover:border-amber-600 hover:bg-stone-50 transition">
                <h3 class="font-medium text-stone-800">Catálogo de Departamentos 🏢</h3>
                <p class="text-xs text-stone-500 mt-1">Ver, agregar y administrar las oficinas de destino.</p>
            </a>

            <div class="block p-4 rounded-lg border border-stone-200 opacity-60 cursor-not-allowed">
                <h3 class="font-medium text-stone-800">Padrón de Visitantes 👤 <span class="text-xs text-amber-600 font-normal">(Próximamente)</span></h3>
                <p class="text-xs text-stone-500 mt-1">Directorio con identificación y datos personales.</p>
            </div>
        </div>
    </div>

</div>
@endsection
