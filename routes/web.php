<?php

use App\Http\Controllers\homecontroller;
use App\Http\Controllers\postcontroller;
use Illuminate\Support\Facades\Route;

Route::get('/', homecontroller::class);

Route::get('/post', [postcontroller::class, 'index']);

route::get('/post/create', [postcontroller::class, 'create']);

route::get('/post/{post}', [postcontroller::class, 'show']);
