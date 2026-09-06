<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\View\View;

class VisitorController extends Controller
{
    public function index(){
        return View('visitors.index');
    }
}
