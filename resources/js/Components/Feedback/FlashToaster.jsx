/**
 * Notificaciones globales (sonner).
 *
 * - Éxito: el mensaje flash que el backend guarda con `redirect()->with('message', ...)`
 *   y que `HandleInertiaRequests` comparte en `props.flash.message`.
 * - Error: los errores de validación de las FormRequests (`props.errors`).
 */
import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { Toaster, toast } from 'sonner';

export default function FlashToaster() {
    const { flash, errors } = usePage().props;

    // Cada visita de Inertia entrega objetos nuevos, por lo que cada efecto se
    // ejecuta una vez por respuesta aunque el texto se repita.
    useEffect(() => {
        if (flash?.message) {
            toast.success('Operación exitosa', { description: flash.message });
        }
    }, [flash]);

    useEffect(() => {
        const count = Object.keys(errors ?? {}).length;

        if (count) {
            toast.error('Revisa la información', {
                description: count === 1 ? 'Hay 1 campo por corregir.' : `Hay ${count} campos por corregir.`,
            });
        }
    }, [errors]);

    return (
        <Toaster
            position="top-right"
            richColors
            closeButton
            offset={20}
            toastOptions={{
                className: 'font-sans rounded-2xl! border! shadow-xl! shadow-ink/10!',
                duration: 4500,
            }}
        />
    );
}
