<?php

namespace App\Http\Controllers;

use App\Http\Requests\Visitors\StoreVisitorRequest;
use App\Http\Requests\Visitors\UpdateVisitorRequest;
use App\service\visitors\VisitorService;

class VisitorController extends Controller
{
    public function __construct(private VisitorService $visitorService)
    {
    }

    public function index()
    {
        $visitors = $this->visitorService->getAll();

        return view('visitors.index', compact('visitors'));
    }

    public function create()
    {
        return view('visitors.create');
    }

    public function store(StoreVisitorRequest $request)
    {
        $this->visitorService->create($request->validated());

        return redirect()
            ->route('visitors.index')
            ->with('message', 'Visitante creado correctamente.');
    }

    public function show(int $id)
    {
        $visitor = $this->visitorService->find($id);

        return view('visitors.show', compact('visitor'));
    }

    public function edit(int $id)
    {
        $visitor = $this->visitorService->find($id);

        return view('visitors.create', compact('visitor'));
    }

    public function update(UpdateVisitorRequest $request, int $id)
    {
        $this->visitorService->update($id, $request->validated());

        return redirect()
            ->route('visitors.index')
            ->with('message', 'Visitante actualizado correctamente.');
    }

    public function destroy(int $id)
    {
        $this->visitorService->delete($id);

        return redirect()
            ->route('visitors.index')
            ->with('message', 'Visitante eliminado correctamente.');
    }
}
