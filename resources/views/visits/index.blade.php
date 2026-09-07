@extends('layout.plantilla')

@section('title', 'Control | Visitas')
@section('favicon', 'visitas.png')

@section('content')
    <div class="max-w-4xl mx-auto px-4 py-8">
        <x-alert type='info' class="mb4">
        <x-slot name='title'>
            Construyendo
        </x-slot>
        el espacio de visitas
    </x-alert>
    </div>
@endsection
