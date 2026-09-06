@extends('layout.plantilla')

@section('title', 'Control | Lista Departamentos')
@section('favicon', 'departamento.png')

@section('content')
    <div class="max-w-4xl mx-auto px-4 py-8">
        <x-alert type='info' class="mb-4">
            <x-slot name='title'>
                En proceso:
            </x-slot>
            Trabajando en el listado de los departamentos :p
        </x-alert>
    </div>
@endsection
