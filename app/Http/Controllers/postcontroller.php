<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class postcontroller extends Controller
{
    public function index(){
        return "Aquí se hara los post de la pagina";
    }

    public function create(){
        return "Aqui se hara un formulario";
    }

    public function show(string $post){
        return "Pagina con la varibale '$post'";
    }
}
