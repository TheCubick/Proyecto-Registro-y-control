import { usePage } from '@inertiajs/react';

export default function FlashMessage() {
    const message = usePage().props.flash?.message;

    if (!message) {
        return null;
    }

    return (
        <div className="mb-6 rounded-lg bg-green-100 px-4 py-3 text-green-800" role="status">
            <span className="font-medium">Correcto</span> {message}
        </div>
    );
}
