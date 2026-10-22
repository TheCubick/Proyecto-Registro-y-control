/**
 * Paginación para respuestas de `paginate()` de Laravel.
 *
 * Usa los campos que Laravel incluye en el JSON del paginador
 * (`links`, `from`, `to`, `total`, `last_page`, `prev_page_url`, `next_page_url`).
 */
import { Link } from '@inertiajs/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const PAGE = 'inline-flex size-8 items-center justify-center rounded-lg text-sm font-medium transition';

/**
 * Botón de página anterior/siguiente; se deshabilita si no hay URL.
 *
 * @param {Object} props
 * @param {string|null} props.url URL destino.
 * @param {string} props.label Texto accesible.
 * @param {import('react').ComponentType} props.icon Icono de flecha.
 */
function Arrow({ url, label, icon: Icon }) {
    if (!url) {
        return (
            <span className={`${PAGE} cursor-not-allowed text-slate-300`} aria-hidden="true">
                <Icon className="size-4" />
            </span>
        );
    }

    return (
        <Link href={url} preserveScroll className={`${PAGE} text-slate-500 hover:bg-slate-100 hover:text-ink`} aria-label={label}>
            <Icon className="size-4" />
        </Link>
    );
}

/**
 * @param {Object} props
 * @param {Object} props.paginator Objeto paginado enviado por el controlador.
 * @param {string} props.noun Sustantivo en plural para el resumen (p. ej. "visitas").
 */
export default function Pagination({ paginator, noun }) {
    if (!paginator?.links || !paginator.total) {
        return null;
    }

    const pages = paginator.links.slice(1, -1);

    return (
        <div className="flex flex-col items-center justify-between gap-3 border-t border-slate-100 px-5 py-3.5 sm:flex-row">
            <p className="text-xs text-slate-500">
                Mostrando <span className="font-semibold text-slate-700">{paginator.from}–{paginator.to}</span> de{' '}
                <span className="font-semibold text-slate-700">{paginator.total}</span> {noun}
            </p>
            {paginator.last_page > 1 && (
                <nav className="flex items-center gap-1" aria-label="Paginación">
                    <Arrow url={paginator.prev_page_url} label="Página anterior" icon={ChevronLeft} />
                    {pages.map((link, index) =>
                        link.url ? (
                            <Link
                                key={`${link.label}-${index}`}
                                href={link.url}
                                preserveScroll
                                aria-current={link.active ? 'page' : undefined}
                                className={`${PAGE} ${link.active ? 'bg-cobalt-600 text-white shadow-sm shadow-cobalt-600/25' : 'text-slate-600 hover:bg-slate-100'}`}
                            >
                                {link.label}
                            </Link>
                        ) : (
                            <span key={`gap-${index}`} className={`${PAGE} text-slate-400`}>
                                …
                            </span>
                        ),
                    )}
                    <Arrow url={paginator.next_page_url} label="Página siguiente" icon={ChevronRight} />
                </nav>
            )}
        </div>
    );
}
