<?php

use App\Http\Controllers\homecontroller;
use App\Http\Controllers\Departmentscontroller;
use App\Models\departments;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\VisitorController;
use App\Http\Controllers\VisitController;

Route::get('/', homecontroller::class);

                // DEPARTMENTS
Route::get('/departamentos', [Departmentscontroller::class, 'index'])->name('departments.index');
Route::get('/departamentos/crear', [Departmentscontroller::class, 'create'])->name('departments.create');
Route::post('/departamentos', [Departmentscontroller::class, 'store'])->name('departments.store');
Route::get('/departamentos/{id}', [Departmentscontroller::class, 'show'])->name('departments.show');
Route::get('/departamentos/{id}/editar', [Departmentscontroller::class, 'edit'])->name('departments.edit');
Route::put('/departamentos/{id}', [Departmentscontroller::class, 'update'])->name('departments.update');
Route::delete('/departamentos/{id}', [Departmentscontroller::class, 'destroy'])->name('departments.destroy');

                // VISITOR
Route::get('/visitantes', [VisitorController::class, 'index'])->name('visitors.index');
Route::get('/visitantes/crear', [VisitorController::class, 'create'])->name('visitors.create');
Route::post('/visitantes', [VisitorController::class, 'store'])->name('visitors.store');
Route::get('/visitantes/{id}', [VisitorController::class, 'show'])->name('visitors.show');
Route::get('/visitantes/{id}/editar', [VisitorController::class, 'edit'])->name('visitors.edit');
Route::put('/visitantes/{id}', [VisitorController::class, 'update'])->name('visitors.update');
Route::delete('/visitantes/{id}', [VisitorController::class, 'destroy'])->name('visitors.destroy');

                // VISITIS
Route::get('/visitas', [VisitController::class, 'index']) -> name ('visits.index');
