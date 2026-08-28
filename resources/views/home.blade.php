{{-- sirve para llamar a mi plantilla que se encuentra en la carpeta de layout --}}
@extends('layout.plantilla')

{{-- agrego el titulo y lo asigno en una misma linea --}}
@section('title', 'Registro | Control de acceso')

@push('css')
    <style>
        body{
            background-color: #FFFCFC;
        }
    </style>
@endpush

{{-- se utiliza para asignar que este sea el contenido --}}
@section('content')
        <div class="max-w-4xl mx-auto px-4 py-8">
        {{-- <h1>Hola, estos son practicas para mi servicio social</h1> --}}

        {{-- puedo hacer que busque el tipo de alerta que prefiero, en el file de alaert --}}
        <x-alert type="success" class="mb-4">
            {{-- codigo para llamar a la variable y agregar titulo --}}
            <x-slot name="title">
                Alerta sobre implementación <br>
            </x-slot>

            {{-- aqui se puede escribir el contendio --}}
            Este texto es el cuerpo de la alerta
        </x-alert>

        <p>Este texto no tiene la propiedad del archivo alert</p>
    </div>

@endsection
