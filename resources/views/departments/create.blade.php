@extends('layout.plantilla')

@section('title', 'Nuevo departamento')
@section('favicon', 'departamentos.png')

@section('content')
    <div class="flex items-start justify-start pb-4 pr-4 pt-4 pl-0">
        <a href="{{ route('departments.index') }}" class="inline-flex items-center gap-2 rounded-lg bg-[#2757C8] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#234DAF] focus:outline-none focus:ring-2 focus:ring-blue-300">
            <svg class="h-4 w-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5H1m0 0 4 4M1 5l4-4"/>
            </svg>
            {{-- <span>Regresar</span> --}}
        </a>
    </div>
@endsection
