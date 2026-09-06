<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class departmentscontroller extends Controller
{
    public function index(){
        return view('departments.index');
    }

    public function create(){
        return view('departments.create');
    }

    public function show(string $post){
        //para que laravel identifique cual es la variable se tiene que hacer un array
        return view('departments.show', [
            'post' => $post
            //se le otorga un nombre y en esta misma se declara la variable o constante que reflejará
        ]);
    }
}
