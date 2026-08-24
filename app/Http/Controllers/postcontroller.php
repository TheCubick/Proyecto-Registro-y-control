<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class postcontroller extends Controller
{
    public function index(){
        return view('post.index');
    }

    public function create(){
        return view('post.create');
    }

    public function show(string $post){
        //para que laravel identifique cual es la variable se tiene que hacer un array
        return view('post.show', [
            'post' => $post
            //se le otorga un nombre y en esta misma se declara la variable o constante que reflejará
        ]);
    }
}
