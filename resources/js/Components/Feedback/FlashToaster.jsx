/**
 * Muestra como notificación toast (sonner) el mensaje flash que el backend
 * guarda con `redirect()->with('message', ...)` y que `HandleInertiaRequests`
 * comparte en `props.flash.message`.
 */
import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { Toaster, toast } from 'sonner';

export default function FlashToaster() {
    const { flash } = usePage().props;

    // Cada visita de Inertia entrega un objeto `flash` nuevo, por lo que el
    // efecto se ejecuta una vez por respuesta aunque el texto se repita.
    useEffect(() => {
        if (flash?.message) {
            toast.success('Operación exitosa', { description: flash.message });
        }
    }, [flash]);

    return <Toaster position="top-right" richColors closeButton toastOptions={{ className: 'font-sans' }} />;
}
