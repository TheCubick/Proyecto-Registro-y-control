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

    <body class="bg-[#ffffff] text-gray-800 min-h-screen flex flex-col justify-between">

                    {{-- fondo,  linea,  resaltado de linea, color de sombra --}}
        <header class="sticky top-0 z-20 border-b border-gray-200/80 bg-[#FBFBFA]/95 backdrop-blur-md">

            <nav class="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-6 px-4 sm:px-8">

                {{-- LOGO --}}
                <div class="flex shrink-0 items-center">
                    <a href="/" class="flex items-center rounded-lg p-1 transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-[#2757C8]/30">
                        <img src="{{ asset('logo.png') }}" alt="logo" class="h-10 w-auto object-contain">
                    </a>
                </div>

                {{-- HERRAMIENTAS --}}
                <div class="hidden flex-1 items-center justify-center gap-1 md:flex">
                    {{-- departamentos --}}
                    <a href="{{ route('departments.index')}}" class="{{ request()->is('departamentos*') ? 'bg-[#2757C8] text-white font-semibold shadow-sm' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900' }} rounded-lg px-4 py-2 text-sm transition focus:outline-none focus:ring-2 focus:ring-[#2757C8]/30">
                        Departamentos
                    </a>
                    {{-- visitantes --}}
                    <a href="{{ route('visitors.index') }}" class="{{ request()->is('visitantes*') ? 'bg-[#2757C8] text-white font-semibold shadow-sm' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900' }} rounded-lg px-4 py-2 text-sm transition focus:outline-none focus:ring-2 focus:ring-[#2757C8]/30">
                        Visitantes
                    </a>
                    {{-- visitas --}}
                    <a href="{{ route('visits.index') }}" class="{{ request()->is('visitas*') ? 'bg-[#2757C8] text-white font-semibold shadow-sm' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900' }} rounded-lg px-4 py-2 text-sm transition focus:outline-none focus:ring-2 focus:ring-[#2757C8]/30">
                        Visitas
                    </a>
                </div>

                <div class="flex shrink-0 items-center gap-2">
                    <a href="#" class="hidden rounded-lg border border-gray-300 bg-transparent px-3 py-2 text-sm font-semibold text-slate-600 transition hover:border-[#2757C8] hover:bg-blue-50 hover:text-[#2757C8] focus:outline-none focus:ring-2 focus:ring-[#2757C8]/30 sm:inline-flex">
                        Iniciar sesión
                    </a>
                    <a href="#" class="inline-flex items-center rounded-lg bg-[#2757C8] px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#234DAF] focus:outline-none focus:ring-2 focus:ring-[#2757C8]/30">
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
