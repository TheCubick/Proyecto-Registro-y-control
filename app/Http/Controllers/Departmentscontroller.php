<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\Departments\StoreDepartmentRequest;
use App\Models\departments;
use App\service\departments\DepartmentService;
use App\Http\Requests\Departments\UpdateDepartmentRequest;
use Inertia\Inertia;

/**
 * Controlador del módulo de departamentos (rutas `departments.*`).
 *
 * Recibe las peticiones, delega la validación a las FormRequests y la persistencia
 * a DepartmentService, y responde con páginas de Inertia o redirecciones con mensaje flash.
 */
class Departmentscontroller extends Controller
{
    private DepartmentService $departmentService;

    /**
     * @param  DepartmentService  $departmentService  Servicio inyectado por el contenedor de Laravel.
     */
    public function __construct(DepartmentService $departmentService)
    {
        $this->departmentService = $departmentService;
    }

    /**
     * Lista los departamentos, 10 por página.
     *
     * @return \Inertia\Response Página React `Departments/Index` con la prop `departments`.
     */
    public function index()
    {
        $departments = departments::paginate(10);
        return Inertia::render('Departments/Index', compact('departments'));
    }

    /**
     * Muestra el formulario de alta.
     *
     * @return \Inertia\Response Página React `Departments/Form`.
     */
    public function create()
    {
        return Inertia::render('Departments/Form');
    }

    /**
     * Guarda un nuevo departamento.
     *
     * @param  StoreDepartmentRequest  $request  Petición ya validada.
     * @return \Illuminate\Http\RedirectResponse Redirección a `departments.index` con mensaje flash.
     */
    public function store(StoreDepartmentRequest $request)
    {
        $this->departmentService->create($request->validated());

        return redirect()->route('departments.index')->with('message', 'Departamento creado correctamente.');
    }

    /**
     * Pendiente de implementar: la ruta `departments.show` existe pero no devuelve una vista.
     *
     * @param  string  $id
     * @return void
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Muestra el formulario de edición.
     *
     * @param  int  $id
     * @return \Inertia\Response Página React `Departments/Form` con la prop `department`.
     */
    public function edit(int $id)
    {
        $department = $this->departmentService->find($id);
        return Inertia::render('Departments/Form', compact('department'));
    }

    /**
     * Actualiza un departamento.
     *
     * @param  UpdateDepartmentRequest  $request  Petición ya validada.
     * @param  int  $id
     * @return \Illuminate\Http\RedirectResponse Redirección a `departments.index` con mensaje flash.
     */
    public function update(UpdateDepartmentRequest $request, int $id)
    {
        $this->departmentService->update($id, $request->validated());

        return redirect()->route('departments.index')->with('message', 'Departamento actualizado exitosamente.');
    }

    /**
     * Elimina un departamento.
     *
     * @param  string  $id
     * @return \Illuminate\Http\RedirectResponse Redirección a `departments.index` con mensaje flash.
     */
    public function destroy(string $id)
    {
        $this->departmentService->delete($id);
        return redirect()->route('departments.index')->with('message', 'Departamento eliminado exitosamente');
    }
}
