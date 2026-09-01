<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;

class departments extends Model
{
    // tabla donde me voy a conectar
    protected $table = 'departments';
    // puedo eliminar esa linea siempre y cuando tenga el nombre de la tabla en ingles

    // se crea una funcion para darle un atributo, se declará arriba
    protected function name():Attribute{
        return Attribute::make(
                //MUTADOR: Muta los datos a mi querer
            // se llama value la variable para guardar el nombre
            set: function($value){
                // retornará el nombre pero en minusculas para evitar
                return strtolower($value);
            },
            // Cuando busco ese dato me aparece en mayusculas la primera letra
            //aunque no en la base de datos

            // ACCESOR: Solo cambia las vistas
            get: function($value){
                return ucfirst($value);
            }
        );
    }
}
