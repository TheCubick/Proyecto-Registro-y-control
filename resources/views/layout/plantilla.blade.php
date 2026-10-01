<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <title>@yield('title')</title>

    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
    <link href="https://cdn.jsdelivr.net/npm/flowbite@3.1.2/dist/flowbite.min.css" rel="stylesheet" />
    <link rel="icon" type="image/png" href="{{ asset(View::yieldContent('favicon', 'global.png')) }}">
</head>

<body class="min-h-screen bg-[#F8FAFC] text-slate-800">
    <div class="flex min-h-screen flex-col md:flex-row">
        <aside class="flex w-full flex-col border-b border-slate-200 bg-white p-5 md:sticky md:top-0 md:h-screen md:w-64 md:shrink-0 md:border-b-0 md:border-r md:p-6">
            <div class="flex items-center justify-between md:block">
                <a href="{{ url('/') }}" class="inline-flex rounded-lg p-1 transition hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-[#2757C8]/20">
                    <img src="{{ asset('logo.png') }}" alt="Control de Acceso" class="h-8 w-auto object-contain">
                </a>
                <span class="text-xs font-medium text-slate-400 md:hidden">Menú principal</span>
            </div>

            <nav class="mt-6 grid grid-cols-3 gap-1 md:block md:space-y-1">
                <a href="{{ route('departments.index') }}" class="{{ request()->is('departamentos*') ? 'bg-[#2757C8]/10 text-[#2757C8]' : 'text-slate-600 hover:bg-slate-50' }} flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-center text-sm font-medium transition md:justify-start md:text-left">
                    <svg class="h-4 w-4 shrink-0" aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v13a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 18.5v-13Z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M8 7h8M8 11h8M8 15h5"/></svg>
                    <span>Departamentos</span>
                </a>

                <a href="{{ route('visitors.index') }}" class="{{ request()->is('visitantes*') ? 'bg-[#2757C8]/10 text-[#2757C8]' : 'text-slate-600 hover:bg-slate-50' }} flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-center text-sm font-medium transition md:justify-start md:text-left">
                    <svg class="h-4 w-4 shrink-0" aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M15 20a6 6 0 0 0-12 0M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM21 20a5 5 0 0 0-4-4.86M16 3.14a4 4 0 0 1 0 7.72"/></svg>
                    <span>Visitantes</span>
                </a>

                <a href="{{ route('visits.index') }}" class="{{ request()->is('visitas*') ? 'bg-[#2757C8]/10 text-[#2757C8]' : 'text-slate-600 hover:bg-slate-50' }} flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-center text-sm font-medium transition md:justify-start md:text-left">
                    <svg class="h-4 w-4 shrink-0" aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M8 3v4M16 3v4M4 9h16M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z"/></svg>
                    <span>Visitas</span>
                </a>
            </nav>

            <div class="mt-auto hidden border-t border-slate-200 pt-4 md:block">
                <span class="text-xs text-slate-400">Usuario activo</span>
            </div>
        </aside>

        <main class="min-w-0 flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
            @yield('content')
        </main>
    </div>
</body>
</html>
