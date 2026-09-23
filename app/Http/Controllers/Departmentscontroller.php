<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\Departments\StoreDepartmentRequest;
use App\Models\departments;
use App\service\departments\DepartmentService;
use App\Http\Requests\Departments\UpdateDepartmentRequest;

class Departmentscontroller extends Controller
{
    private DepartmentService $departmentService;

    public function __construct(DepartmentService $departmentService)
    {
        $this->departmentService = $departmentService;
    }

    public function index()
    {
        $departments = departments::paginate(10);
        return view('departments.index', compact('departments'));
    }

    public function create()
    {
        return view('departments.create');
    }

    public function store(StoreDepartmentRequest $request)
    {
        $this->departmentService->create($request->validated());

        return redirect()->route('departments.index')->with('message', 'Departamento creado correctamente.');
    }

    public function show(string $id)
    {
        //
    }

    public function edit(int $id)
    {
        $department = $this->departmentService->find($id);
        return view('departments.create', compact('department'));
    }

    public function update(UpdateDepartmentRequest $request, int $id)
    {
        $this->departmentService->update($id, $request->validated());

        return redirect()->route('departments.index')->with('message', 'Departamento actualizado exitosamente.');
    }

    public function destroy(string $id)
    {
        $this->departmentService->delete($id);
        return redirect()->route('departments.index')->with('message', 'Departamento eliminado exitosamente');
    }
}
