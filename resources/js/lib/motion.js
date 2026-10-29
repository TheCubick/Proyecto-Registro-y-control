/**
 * Presets de animación compartidos (framer-motion).
 *
 * Centralizar resortes y variantes mantiene un movimiento consistente en toda la
 * interfaz. `AppLayout` envuelve la app en `MotionConfig reducedMotion="user"`, por lo
 * que estas animaciones se reducen automáticamente si el sistema lo solicita.
 */

/** Resorte suave para entradas de página y tarjetas. */
export const softSpring = { type: 'spring', stiffness: 260, damping: 26, mass: 0.9 };

/** Resorte con rebote ligero para modales y el Wizard. */
export const bouncySpring = { type: 'spring', stiffness: 380, damping: 24, mass: 0.8 };

/** Resorte rápido para micro-interacciones (hover / tap). */
export const snappySpring = { type: 'spring', stiffness: 500, damping: 30 };

/** Entrada de página: aparece desde abajo con desvanecido. */
export const pageVariants = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: softSpring },
};

/**
 * Contenedor que escalona la aparición de sus hijos (filas, tarjetas).
 *
 * @param {number} [stagger=0.04] Segundos entre cada hijo.
 * @param {number} [delay=0] Retraso inicial.
 */
export function staggerContainer(stagger = 0.04, delay = 0) {
    return {
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: delay } },
    };
}

/** Elemento de una lista escalonada. */
export const staggerItem = {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0, transition: softSpring },
};

/** Micro-interacción para botones. */
export const buttonMotion = {
    whileHover: { y: -1 },
    whileTap: { scale: 0.97, y: 0 },
    transition: snappySpring,
};

/** Micro-interacción para tarjetas clicables. */
export const cardHover = {
    whileHover: { y: -4 },
    whileTap: { scale: 0.99 },
    transition: softSpring,
};
