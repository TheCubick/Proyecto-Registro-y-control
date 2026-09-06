@extends('layout.plantilla')

@section('title', 'Nuevo departamento')
@section('favicon', 'departamentos.png')

@section('content')
    <x-alert type='info' class="mb-4">
        <x-slot name='title'>
            Creando
        </x-slot>
        Interfaz de crear un nuevo departamento
    </x-alert>
@endsection
