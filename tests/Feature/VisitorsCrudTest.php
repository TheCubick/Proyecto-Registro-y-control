<?php

namespace Tests\Feature;

use App\Models\visitors;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class VisitorsCrudTest extends TestCase
{
    use RefreshDatabase;

    // guarda datos en la base de datos desde el index
    public function test_listavisitantes(): void
    {
        $prueba = visitors::create([
            'full_name' => 'Pablo Garcia',
            'identification_number' => 'vst-1111',
            'phone' => '9613157627',
        ]);

        $response = $this->get(route('visitors.index'));
        $response->assertStatus(200);
        $response->assertViewIs('visitors.index');
        $response->assertViewHas('visitors');
        $response->assertSee($prueba->full_name);
    }

    // prueba el boton de crear
    public function test_formcreate():void{
        $response = $this->get(route('visitors.create'));
        $response->assertOk();
        $response->assertViewIs('visitors.create');
        $response->assertSee('Nuevo visitante');
    }

    // guarda datos
    public function test_create():void {
        $response = $this->post(route('visitors.store'), [
            'full_name' => 'Raul Alejandro',
            'identification_number' => 'vst-8965',
            'phone' => '9613157629',
        ]);

        $response->assertRedirect(route('visitors.index'));
        $response->assertSessionHas('message', 'Visitante creado correctamente.');

        $this->assertDatabaseHas('visitors', [
            'full_name' => 'raul alejandro',
            'identification_number' => 'vst-8965',
            'phone' => '9613157629',
        ]);
    }

    // revisa si el usuario no guardo algo vacio
    public function test_createsindatos():void {
        $response = $this->from(route('visitors.create')) ->post(route('visitors.store'), []);
        $response->assertRedirect(route('visitors.create'));
        $response->assertSessionHasErrors(['full_name', 'identification_number']);
    }

    // varifica si el identifacador no se duplica
    public function test_identificationduplicado():void{
        visitors::create([
            'full_name' => 'Pablo Garcia',
            'identification_number' => 'vst-1111',
            'phone' => '9613157627',
        ]);

        $response = $this->post(route('visitors.store'), [
            'full_name' => 'Benito Martinez',
            'identification_number' => 'vst-1111',
            'phone' => '9613157627',
        ]);

        $response->assertSessionHasErrors('identification_number');
    }

    // comprueba si el form de edit abre correctamente
    public function test_edit():void{
        $prueba = visitors::create([
            'full_name' => 'Pablo Garcia',
            'identification_number' => 'vst-1111',
            'phone' => '9613157627',
        ]);

        $response = $this->get(route('visitors.edit', $prueba->id));

        $response->assertOk();
        $response->assertViewIs('visitors.create');
        $response->assertViewHas('visitor', $prueba);
        $response->assertSee('Pablo Garcia');
        $response->assertSee('vst-1111');
        $response->assertSee('9613157627');
    }

    // actualiza los datos
    public function test_actualizar():void{
        $prueba = visitors::create([
            'full_name' => 'Pablo Garcia',
            'identification_number' => 'vst-1111',
            'phone' => '9613157627',
        ]);

        $response = $this->put(route('visitors.update', $prueba->id), [
            'full_name' => 'Pablo Angel Ramirez Garcia',
            'identification_number' => 'vst-1111',
            'phone' => '52 9613157627',
        ]);

        $response->assertRedirect(route('visitors.index'));
        $response->assertSessionHas('message', 'Visitante actualizado correctamente.');

        $this->assertDatabaseHas('visitors', [
            'id' => $prueba->id,
            'full_name' => 'Pablo Angel Ramirez Garcia',
            'identification_number' => 'vst-1111',
            'phone' => '52 9613157627',
        ]);
        $this->assertDatabaseCount('visitors', 1);
    }

    // elimina un visitante
    public function test_delete():void{
        $prueba = visitors::create([
            'full_name' => 'Pablo Garcia',
            'identification_number' => 'vst-1111',
            'phone' => '9613157627',
        ]);

        $response = $this->delete(route('visitors.destroy', $prueba->id));

        $response->assertRedirect(route('visitors.index'));
        $response->assertSessionHas('message', 'Visitante eliminado correctamente.');
        $this->assertDatabaseMissing('visitors', ['id' => $prueba->id]);
    }

    // comprueba que no editen un ID inexistente
    public function test_inexistente():void{
        $response = $this->get(route('visitors.edit', 999999));

        $response->assertNotFound();
    }
}
