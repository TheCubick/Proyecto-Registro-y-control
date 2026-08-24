<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class homecontroller extends Controller
{
    //Invoke solo sirve cuando no tenemos más 'ramas' a quien llamar
    public function __invoke()
    {
        return view('home');
    }
}
