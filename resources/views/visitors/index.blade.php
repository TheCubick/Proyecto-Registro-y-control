@extends('layout.plantilla')

@section('title', 'Visitantes')
@section('favicon', 'visitantes.png')

@section('content')
    <div class="max-w-4xl mx-auto px-4 py-8">
        <x-alert type='info' class="mb-4">
            <x-slot name='title'>
                Construyendo
            </x-slot>
            El area de visitantes:p
        </x-alert>
    </div>
@endsection
