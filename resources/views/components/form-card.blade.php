@props([
    'title',
    'description',
    'action',
    'backRoute',
    'sectionTitle',
    'sectionDescription',
    'submitLabel' => 'Guardar',
    'method' => 'POST',
])

<section class="mx-auto max-w-140 overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-[0_12px_32px_-4px_rgba(30,41,59,0.08),0_4px_12px_-2px_rgba(30,41,59,0.04)]">
    <div class="bg-[#2757C8] px-6 py-7 text-center sm:px-8">
        <p class="text-xs font-semibold uppercase tracking-[0.16em] text-blue-100">Directorio operativo</p>
        <h1 class="mt-2 text-[22px] font-bold leading-tight tracking-tight text-white">{{ $title }}</h1>
        <p class="mt-2 text-[13px] leading-5 text-blue-100">{{ $description }}</p>
    </div>

    <form action="{{ $action }}" method="{{ strtoupper($method) === 'GET' ? 'GET' : 'POST' }}" class="space-y-5 px-6 pb-6 pt-6 sm:px-8 sm:pb-8">
        @csrf
        @if (strtoupper($method) !== 'POST')
            @method($method)
        @endif

        <div class="text-center">
            <h2 class="text-[17px] font-bold text-slate-800">{{ $sectionTitle }}</h2>
            <p class="mt-1 text-sm text-slate-500">{{ $sectionDescription }}</p>
        </div>

        {{ $slot }}

        <div class="flex items-center justify-between border-t border-slate-100 pt-5">
            <a href="{{ $backRoute }}" class="inline-flex items-center gap-2 rounded-[10px] border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-[#2757C8] transition hover:border-slate-400 hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-[#2757C8]/20">
                <span aria-hidden="true">←</span>
                Cancelar
            </a>
            <button type="submit" class="inline-flex items-center gap-2 rounded-[10px] bg-[#2757C8] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#234DAF] hover:shadow-md focus:outline-none focus:ring-4 focus:ring-[#2757C8]/20">
                {{ $submitLabel }}
                <span aria-hidden="true">→</span>
            </button>
        </div>
    </form>
</section>
