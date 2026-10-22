<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

/**
 * Controlador de acción única para la página de inicio (ruta `/`).
 */
class homecontroller extends Controller
{
    //Invoke solo sirve cuando no tenemos más 'ramas' a quien llamar
    /**
     * Muestra el panel principal.
     *
     * @return \Inertia\Response Página React `Home/Index`.
     */
    public function __invoke()
    {
        return Inertia::render('Home/Index');
    }
}
