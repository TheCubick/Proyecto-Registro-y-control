<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class homecontroller extends Controller
{
    //Invoke solo sirve cuando no tenemos más 'ramas' a quien llamar
    public function __invoke()
    {
        return Inertia::render('Home/Index');
    }
}
