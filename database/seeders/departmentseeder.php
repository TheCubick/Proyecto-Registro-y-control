<?php

namespace Database\Seeders;

use App\Models\departments;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class departmentseeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // variable donde agregaré los datos a mi base de datos
        $deparments = new departments();
        $deparments -> name ='Pablo Ramírez';
        $deparments -> building_floor = 'Edificio A | Desarrollo';

        $deparments -> save();

        $deparments = new departments();
        $deparments -> name ='Ángel García';
        $deparments -> building_floor = 'Edificio A | Desarrollo';

        $deparments -> save();

        $deparments = new departments();
        $deparments -> name ='Luna Martinez';
        $deparments -> building_floor = 'Edificio A | Desarrollo';

        $deparments -> save();

        $deparments = new departments();
        $deparments -> name ='Ezequiel Perez';
        $deparments -> building_floor = 'Edificio B | RRHH';

        $deparments -> save();

        $deparments = new departments();
        $deparments -> name ='Miguel Sanchez';
        $deparments -> building_floor = 'Edificio B | RRHH';

        $deparments -> save();

        $deparments = new departments();
        $deparments -> name ='Ivanna Herrera';
        $deparments -> building_floor = 'Edificio B | Arquitectura';

        $deparments -> save();
    }
}
