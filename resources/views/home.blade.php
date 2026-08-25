<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    {{-- Llamo/utilizo la herramienta de tailwind --}}
    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>

    {{-- al igual que flowbite para hacer más "estetico" --}}
    <link href="https://cdn.jsdelivr.net/npm/flowbite@3.1.2/dist/flowbite.min.css" rel="stylesheet" />

    <title>Proyecto | Laravel</title>
</head>

<body>
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
</body>
</html>
