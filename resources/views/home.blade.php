@extends('layout.plantilla')

@section('title', 'Inicio | Control de Acceso')
@section('favicon', 'global.png')

@section('content')
    <div>
        <x-alert type='info' class="">
            <x-slot name='title'>
                Construyendo
            </x-slot>
            el espacio general
        </x-alert>
    </div>
@endsection
