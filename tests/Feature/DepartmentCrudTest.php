<?php

namespace Tests\Feature;

use App\Models\departments;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DepartmentCrudTest extends TestCase
{
    use RefreshDatabase;

    public function test_listadepartamentos(): void
    {
        $department = departments::create([
            'name' => 'Soporte',
            'building_floor' => 'Piso 2',
        ]);

        $response = $this->get(route('departments.index'));

        $response->assertStatus(200);
        $response->assertViewIs('departments.index');
        $response->assertViewHas('departments');
        $response->assertSee($department->name);
    }

    public function test_formcreate(): void
    {
        $response = $this->get(route('departments.create'));

        $response->assertOk();
        $response->assertViewIs('departments.create');
        $response->assertSee('Nuevo departamento');
    }

    public function test_create(): void
    {
        $response = $this->post(route('departments.store'), [
            'name' => 'Recursos Humanos',
            'building_floor' => 'Edificio A, Piso 1',
        ]);

        $response->assertRedirect(route('departments.index'));
        $response->assertSessionHas('message', 'Departamento creado correctamente.');

        $this->assertDatabaseHas('departments', [
            'name' => 'recursos humanos',
            'building_floor' => 'Edificio A, Piso 1',
        ]);
    }

    public function test_createsindatos(): void
    {
        $response = $this->from(route('departments.create'))
            ->post(route('departments.store'), []);

        $response->assertRedirect(route('departments.create'));
        $response->assertSessionHasErrors(['name', 'building_floor']);
    }

    public function test_nameduplicados(): void
    {
        departments::create([
            'name' => 'Soporte',
            'building_floor' => 'Piso 2',
        ]);

        $response = $this->post(route('departments.store'), [
            'name' => 'soporte',
            'building_floor' => 'Piso 3',
        ]);

        $response->assertSessionHasErrors('name');
    }

    public function test_puede_mostrar_el_formulario_de_edicion(): void
    {
        $department = departments::create([
            'name' => 'Soporte',
            'building_floor' => 'Piso 2',
        ]);

        $response = $this->get(route('departments.edit', $department->id));

        $response->assertOk();
        $response->assertViewIs('departments.create');
        $response->assertViewHas('department', $department);
        $response->assertSee('Soporte');
        $response->assertSee('Piso 2');
    }

    public function test_puede_actualizar_un_departamento(): void
    {
        $department = departments::create([
            'name' => 'Soporte',
            'building_floor' => 'Piso 2',
        ]);

        $response = $this->put(route('departments.update', $department->id), [
            'name' => 'Soporte actualizado',
            'building_floor' => 'Piso 3',
        ]);

        $response->assertRedirect(route('departments.index'));
        $response->assertSessionHas('message', 'Departamento actualizado exitosamente.');

        $this->assertDatabaseHas('departments', [
            'id' => $department->id,
            'name' => 'Soporte actualizado',
            'building_floor' => 'Piso 3',
        ]);
        $this->assertDatabaseCount('departments', 1);
    }

    public function test_puede_eliminar_un_departamento(): void
    {
        $department = departments::create([
            'name' => 'Soporte',
            'building_floor' => 'Piso 2',
        ]);

        $response = $this->delete(route('departments.destroy', $department->id));

        $response->assertRedirect(route('departments.index'));
        $response->assertSessionHas('message', 'Departamento eliminado exitosamente');
        $this->assertDatabaseMissing('departments', ['id' => $department->id]);
    }

    public function test_un_departamento_inexistente_devuelve_404_al_editar(): void
    {
        $response = $this->get(route('departments.edit', 999999));

        $response->assertNotFound();
    }
}
