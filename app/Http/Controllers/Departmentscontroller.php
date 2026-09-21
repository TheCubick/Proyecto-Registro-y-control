<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\Departments\StoreDepartmentRequest;
use App\Models\departments;
use App\service\departments\DepartmentService;

class Departmentscontroller extends Controller
{

    private DepartmentService $DepartmentService;

    public function __construct(DepartmentService $DepartmentService)
    {
        $this -> DepartmentService = $DepartmentService;
    }

    public function index()
    {
        $departments = departments::paginate(5);
        return view('departments.index', compact('departments'));
    }

    public function create()
    {
        return view('departments.create');
    }

    public function store(StoreDepartmentRequest $request)
    {
        $this->DepartmentService->create($request->validated());

        return redirect() -> route('departments.index') -> with('success', 'Departamento creado correctamente.');
    }

    public function show(string $id)
    {
        //
    }

    public function edit(string $id)
    {
        //
    }

    public function update(Request $request, string $id)
    {
        //
    }

    public function destroy(string $id)
    {
        //
    }
}
