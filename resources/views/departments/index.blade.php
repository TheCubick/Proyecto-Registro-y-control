@extends('layout.plantilla')

@section('title', 'Control | Lista Departamentos')
@section('favicon', 'departamentos.png')

@section('content')

    <div class="flex justify-center">
        <a href="{{ route('departments.create') }}" class="inline-flex items-center rounded-lg bg-[#2757C8] px-3 py-1.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300">
            Nuevo
        </a>
    </div>

    <div class="mt-6 flex justify-center">
        <table class="min-w-[320px] border border-gray-300 text-left">
            <thead class="bg-gray-100">
                <tr>
                    <th class="border-b px-4 py-2">Departamento</th>
                    <th class="border-b px-4 py-2">Piso</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($departments as $department)
                    <tr>
                        <td class="border-b px-4 py-2">{{ $department->name }}</td>
                        <td class="border-b px-4 py-2">{{ $department->building_floor }}</td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>

@endsection


