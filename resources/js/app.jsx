/**
 * Punto de entrada del frontend.
 *
 * Inicializa la aplicación de Inertia.js con React: resuelve cada página a partir
 * del nombre que envía el controlador (por ejemplo `Inertia::render('Visits/Index')`
 * → `./Pages/Visits/Index.jsx`) y la monta en el elemento raíz de `app.blade.php`.
 */
import './bootstrap';
import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';

const appName = 'Control de Accesos';

createInertiaApp({
    title: title => (title ? `${title} · ${appName}` : appName),
    resolve: name => {
        const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true });
        return pages[`./Pages/${name}.jsx`];
    },
    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />);
    },
    progress: {
        color: '#3d52d5',
    },
});
