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

    // agilizo la creación de datos en la tabla de visitors y department
    // para no repetir código
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
        // mando a llamar la función privada, o sea, los datos creado en visitor y department
        $date = $this->createdatos();

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
        $response = $this->get(route('visits.create'));
        $response->assertOk();
        $response->assertViewIs('visits.create');
    }

    public function test_create():void{
        $date=$this->createdatos();

        $response = $this->post(route('visits.store'), [
            'visitor_id'=>$date['visitor']->id,
            'department_id'=>$date['department']->id,
            'user_id'=>$date['user']->id,
            'reason'=>'Mantenimiento',
            'badge_number'=>'GAF-05',
            'entry_time'=>now()->toDateString(),
            'status'=>'dentro',
        ]);

        $response->assertRedirect(route('visits.index'));
        $response->assertSessionHas('message', 'Visita creada correctamente.');

        $this->assertDatabaseHas('visits',[
            'visitor_id'=>$date['visitor']->id,
            'reason'=>'Mantenimiento',
            'status'=>'dentro',
        ]);
    }

    public function test_createsindatos():void{
        $response = $this->from(route('visits.create')) ->post(route('visits.store'), []);

        $response->assertRedirect(route('visits.create'));
        $response->assertSessionHasErrors(['visitor_id', 'department_id', 'user_id', 'reason', 'entry_time']);
    }

    public function test_idinvalido():void{
        $response = $this->post(route('visits.store'),[
            'visitor_id' => 99999,
            'department_id'=> 99999,
            'reason'=>'Mantenimiento',
        ]);

        $response->assertSessionHasErrors(['visitor_id', 'department_id']);
    }

    public function test_edit():void{
        $date=$this->createdatos();

        $visita= visits::create([
            'visitor_id'=>$date['visitor']->id,
            'department_id'=>$date['department']->id,
            'user_id'=>$date['user']->id,
            'reason'=>'Mantenimiento',
            'entry_time'=>now()->toDateString(),
            'status'=>'dentro',
        ]);

        $response = $this->get(route('visits.edit', $visita->id));

        $response->assertOk();
        $response->assertViewIs('visits.create');
        $response->assertSee('Mantenimiento');
    }

    public function test_actualizar():void{
        $date=$this->createdatos();

        $visita= visits::create([
            'visitor_id'=>$date['visitor']->id,
            'department_id'=>$date['department']->id,
            'user_id'=>$date['user']->id,
            'reason'=>'Entrevista',
            'entry_time'=>now()->toDateString(),
            'status'=>'dentro',
        ]);

        $response= $this->put(route('visits.update', $visita->id),[
            'visitor_id'=>$date['visitor']->id,
            'department_id'=>$date['department']->id,
            'user_id'=>$date['user']->id,
            'reason'=>'Entrevista',
            'status'=>'completado',
            'entry_time'=>now()->toDateString(),
            ]);

        $response->assertRedirect(route('visits.index'));

        $this->assertDatabaseHas('visits',[
            'id'=>$visita->id,
            'reason'=>'Entrevista',
            'status'=>'completado',
        ]);
    }

    public function test_delete():void{
        $date=$this->createdatos();

        $visita=visits::create([
            'visitor_id'=>$date['visitor']->id,
            'department_id'=>$date['department']->id,
            'user_id'=>$date['user']->id,
            'reason'=>'Proveedor',
            'entry_time'=>now()->toDateString(),
            'status'=>'dentro',
        ]);

        $response=$this->delete(route('visits.destroy', $visita->id));
        $response->assertRedirect(route('visits.index'));
        $this->assertDatabaseMissing('visits',['id'=>$visita->id] );
    }

    public function test_inexistente():void{
        $response=$this->get(route('visits.edit',999999));
        $response->assertNotFound();
    }
}
