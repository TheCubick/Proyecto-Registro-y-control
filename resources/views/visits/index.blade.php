@extends('layout.plantilla')

@section('title', 'Control | Visitas')
@section('favicon', 'visitas.png')

@section('content')
    <div>
        <x-alert type='info' class="max-w-4xl mx-auto px-4 py-8">
        <x-slot name='title' class="mb-4">
            Construyendo
        </x-slot>
        el espacio de visitas
    </x-alert>
    </div>
@endsection
