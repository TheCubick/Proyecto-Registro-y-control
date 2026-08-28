<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <title>@yield('title')</title>

    {{-- Llamo/utilizo la herramienta de tailwind --}}
    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>

    {{-- al igual que flowbite para hacer más "estetico" --}}
    <link href="https://cdn.jsdelivr.net/npm/flowbite@3.1.2/dist/flowbite.min.css" rel="stylesheet" />

    {{-- sirve para definir que puedo abrir un css en el archivo que deseo claro cuando utilice esta plantilla --}}
    @stack('css')

</head>

<body>
                {{-- fondo,  linea,  resaltado de linea, color de sombra --}}
    <header class="bg-[#941F09] border-b border-gray-200 shadow-orange-700">
                    {{-- limita_ancho, margen, espacio, cel, tblt, pc, flexbox, centrado, separación de logo --}}
        <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                {{-- negritas,  tamaño,   color letras --}}
            <div class="font-bold text-lg text-neutral-50">
                Registro y control de acceso
            </div>
                <ul class="flex space-x-6 text-sm font-medium text-neutral-100">
                    <li class="hover:text-black cursor-pointer transition">Inicio</li>
                    <li class="hover:text-black cursor-pointer transition">Herramientas</li>
                    <li class="hover:text-black cursor-pointer transition">Más</li>
                </ul>
        </nav>
    </header>
    {{-- servirá para que el contenido sea variable a medida que lo nombres en nuestro archivo (contenido) --}}
    @yield('content')

    <footer>
        <div>
            <ul>
                <li>Copyright The Cubick</li>
            </ul>
        </div>
    </footer>
</body>
</html>
