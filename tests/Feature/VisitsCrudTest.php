<?php

namespace Tests\Feature;

use App\Models\departments;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\visits;
use Tests\TestCase;
use App\Models\visitors;

class VisitsCrudTest extends TestCase
{

    use RefreshDatabase;

    private function createdatos():array{
        return[
            'visitor' => visitors::create([
                'full_name' => 'Pablo Garcia',
                'identification_number' => 'vst-1111',
                'phone' => '9613157627',
            ]),

            'department' => departments::create([
            'name' => 'Sistemas',
            'building_floor' => 'planta baja'
            ]),

            'user' => User::factory()->create(),
        ];
    }

    // pruebas de vista donde verifica si muestra los datos
    public function test_vista(): void
    {
        $date = $this->createdatos();
        // ingresa los datos en la tabla
        $response = $this->post(route('visits.store'), [
            'visitor_id'=>$date['visitor']->id,
            'department_id'=>$date['department']->id,
            'user_id'=>$date['user']->id,
            'reason'=>'Mantenimiento de servidores',
            'badge_number'=>'GAF-05',
            'entry_time'=>now()->toDateString(),
            'status'=>'dentro',
        ]);

        $response= $this->get(route('visits.index'));

        $response->assertStatus(200);
        $response->assertViewIs('visits.index');
        $response->assertSee('Mantenimiento de servidores');
        $response->assertSee('GAF-05');
    }

    public function test_formcreate():void{

    }

    public function test_create():void{
        
    }
}
