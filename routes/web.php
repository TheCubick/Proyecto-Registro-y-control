<?php

use App\Http\Controllers\homecontroller;
use App\Http\Controllers\postcontroller;
use App\Models\departments;
use Illuminate\Support\Facades\Route;

Route::get('/', homecontroller::class);

Route::get('/post', [postcontroller::class, 'index']);

route::get('/post/create', [postcontroller::class, 'create']);

route::get('/post/{post}', [postcontroller::class, 'show']);


// mando a llamar la base de datos
route::get('basedatos', function(){

/*              // CREACIÓN
    // llamo a la variable que se encuentra en deparments.php, creando una variable aquí
    $departments = new departments;

    // le doy valores a la nueva variable
    $departments -> name='IVAnna HERRERA';
    $departments -> building_floor= 'Edificio B | Arquitectura';

    // guarda los datos antes agregados a la base de datos
    $departments -> save();

    return $departments;
*/

/*               // BUSCAR
    $departments = departments::find(5);
    return $departments;
 */

/*              // CAMBIAR
    $departments = departments::find(5);
    // cambias lo que hay dentro de la celda que buscas
    $departments -> name = 'Ivanna Herrera';
    $departments -> save();

    return $departments;
*/

/*                 // BORRAR
    $departments = departments::find();
    $departments -> delete();
    return 'Dato eliminado';
*/

    $departments = departments::find(5);
    return $departments -> created_at -> format('d/m/Y');

});
