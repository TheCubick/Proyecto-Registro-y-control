<!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">

        <title>@yield('title')</title>

        <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>

        <link href="https://cdn.jsdelivr.net/npm/flowbite@3.1.2/dist/flowbite.min.css" rel="stylesheet" />

        <link rel="icon" type='img/png' href="{{ asset(View::yieldContent('favicon', 'global.png')) }}">

    </head>

    <body class="bg-[#F2F4F7] text-gray-800 min-h-screen flex flex-col justify-between">

                    {{-- fondo,  linea,  resaltado de linea, color de sombra --}}
        <header class="bg-[#FBFBFA] border-b border-gray-200 shadow-orange-700">

            <nav class="w-full px-6 sm:px-10 h-16 flex items-center justify-between">

                {{-- LOGO --}}
                <div class="flex shrink-0 items-center">
                    <a href="/" class="flex items-center">
                        <img src="{{ asset('logo.png') }}" alt="logo" class="h-10 w-auto object-contain">
                    </a>
                </div>

                {{-- HERRAMIENTAS --}}
                <div class="hidden flex-1 items-center justify-center space-x-1 md:flex">
                    {{-- departamentos --}}
                    <a href="{{ route('departments.index')}}" class="{{ request()->is('departamentos*') ? 'bg-[#2757C8] text-white font-semibold shadow-sm' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100' }} px-4 py-2 rounded-lg transition">
                        Departamentos
                    </a>
                    {{-- visitantes --}}
                    <a href="{{ route('visitors.index') }}" class="{{ request()->is('visitantes*') ? 'bg-[#2757C8] text-white font-semibold shadow-sm' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100' }} px-4 py-2 rounded-lg transition">
                        Visitantes
                    </a>
                    {{-- visitantes --}}
                    <a href="{{ route('visits.index') }}" class="{{ request()->is('visitas*') ? 'bg-[#2757C8] text-white font-semibold shadow-sm' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100' }} px-4 py-2 rounded-lg transition">
                        Visitas
                    </a>
                </div>

                <div class="shrink-0">
                    <a href="#" class="inline-flex items-center rounded-lg bg-[#2757C8] px-4 py-2 font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300">
                        Iniciar sesión
                    </a>
                    <a href="#" class="ml-2 inline-flex items-center rounded-lg border border-[#2757C8] bg-white px-4 py-2 font-semibold text-[#2757C8] shadow-sm transition hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-300">
                        Registrar
                    </a>
                </div>

            </nav>
        </header>


        {{-- El main con flex-grow empuja el footer hasta abajo --}}
        <main class="grow max-w-5xl w-full mx-auto px-4 py-8">
            @yield('content')
        </main>

        <footer class="bg-white border-t border-gray-200 py-4">
            <div class="text-center text-xs text-gray-500">
                © 2026 TheCubick. Todos los derechos reservados.
            </div>
        </footer>

    </body>


</html>
