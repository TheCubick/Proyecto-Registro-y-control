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
        $deparments->name = 'Desarrollo';
        $deparments->building_floor = 'Edificio A';

        $deparments -> save();

        $deparments = new departments();
        $deparments->name = 'Soporte Técnico';
        $deparments->building_floor = 'Edificio A';

        $deparments -> save();

        $deparments = new departments();
        $deparments->name = 'Sistemas';
        $deparments->building_floor = 'Edificio A';

        $deparments -> save();

        $deparments = new departments();
        $deparments->name = 'Recursos Humanos';
        $deparments->building_floor = 'Edificio B';

        $deparments -> save();

        $deparments = new departments();
        $deparments->name = 'Administración';
        $deparments->building_floor = 'Edificio B';

        $deparments -> save();

        $deparments = new departments();
        $deparments->name = 'Arquitectura';
        $deparments->building_floor = 'Edificio B';

        $deparments -> save();

        // // crea los datos ficticios y los inserta en la base de datos
        // departments::factory()->count(4)->create();
    }
}
