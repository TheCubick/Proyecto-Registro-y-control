<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\View;

class VisitController extends Controller
{
    public function index(){
        return view('visits.index');
    }
}
