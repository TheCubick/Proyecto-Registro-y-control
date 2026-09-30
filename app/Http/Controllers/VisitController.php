<?php

namespace App\Http\Controllers;

use App\Http\Requests\Visits\StoreVisitRequest;
use App\Http\Requests\Visits\UpdateVisitRequest;
use App\Models\departments;
use App\Models\User;
use App\Models\visitors;
use App\service\visits\VisitService;

class VisitController extends Controller
{
    public function __construct(private VisitService $visitService)
    {
    }

    public function index()
    {
        $visits = $this->visitService->getAll();

        return view('visits.index', compact('visits'));
    }

    public function create()
    {
        return view('visits.create', [
            'visitors' => visitors::orderBy('full_name')->get(),
            'departments' => departments::orderBy('name')->get(),
            'users' => User::orderBy('name')->get(),
        ]);
    }

    public function store(StoreVisitRequest $request)
    {
        $this->visitService->create($request->validated());

        return redirect()
            ->route('visits.index')
            ->with('message', 'Visita creada correctamente.');
    }

    public function show(int $id)
    {
        $visit = $this->visitService->find($id);

        return view('visits.show', compact('visit'));
    }

    public function edit(int $id)
    {
        $visit = $this->visitService->find($id);

        return view('visits.create', [
            'visit' => $visit,
            'visitors' => visitors::orderBy('full_name')->get(),
            'departments' => departments::orderBy('name')->get(),
            'users' => User::orderBy('name')->get(),
        ]);
    }

    public function update(UpdateVisitRequest $request, int $id)
    {
        $this->visitService->update($id, $request->validated());

        return redirect()
            ->route('visits.index')
            ->with('message', 'Visita actualizada correctamente.');
    }

    public function destroy(int $id)
    {
        $this->visitService->delete($id);

        return redirect()
            ->route('visits.index')
            ->with('message', 'Visita eliminada correctamente.');
    }
}
