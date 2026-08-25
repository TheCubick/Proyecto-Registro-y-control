
{{-- A TODO ESTO SE LE CONOCE COMO COMPONENTE ANONIMO --}}

{{-- la variable type obtendra que tipo estoy llamando en home --}}
@props(['type'])

@php
    switch ($type) {
        case 'info':
            $class = 'text-blue-800 bg-blue-50';
            break;

        case 'danger':
            $class = 'text-red-800 bg-red-50';
            break;

        case 'success':
            $class = 'text-green-800 bg-green-50';
            break;

        case 'warning':
            $class = 'text-yellow-800 bg-yellow-50';
            break;

        case 'dark':
            $class = 'text-gray-800 bg-gray-50';
            break;

        default:
            $class = 'text-purple-800 bg-purple-50';
            break;
    }
@endphp

{{-- tambien se puede declarar así en dado caso le quiero agregar algun atributo en home con class, donde
se concatena las diferentes clases y así evitar que css no entienda --}}
<div {{ $attributes->merge(['class' => 'p-4 text-sm rounded-lg ' . $class]) }} role="alert">
    <span class="font-medium"> {{ $title ?? 'Info alert!' }}</span> {{ $slot }}
</div>
