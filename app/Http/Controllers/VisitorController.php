<?php

namespace App\Http\Controllers;

use App\Http\Requests\Visitors\StoreVisitorRequest;
use App\Http\Requests\Visitors\UpdateVisitorRequest;
use App\service\visitors\VisitorService;
use Inertia\Inertia;

/**
 * Controlador del módulo de visitantes (rutas `visitors.*`).
 *
 * Delega la validación a las FormRequests y la persistencia a VisitorService.
 */
class VisitorController extends Controller
{
    /**
     * @param  VisitorService  $visitorService  Servicio inyectado por el contenedor de Laravel.
     */
    public function __construct(private VisitorService $visitorService)
    {
    }

    /**
     * Lista los visitantes, 10 por página.
     *
     * @return \Inertia\Response Página React `Visitors/Index` con la prop `visitors`.
     */
    public function index()
    {
        $visitors = $this->visitorService->getAll();

        return Inertia::render('Visitors/Index', compact('visitors'));
    }

    /**
     * Muestra el formulario de alta.
     *
     * @return \Inertia\Response Página React `Visitors/Form`.
     */
    public function create()
    {
        return Inertia::render('Visitors/Form');
    }

    /**
     * Registra un nuevo visitante.
     *
     * @param  StoreVisitorRequest  $request  Petición ya validada.
     * @return \Illuminate\Http\RedirectResponse Redirección a `visitors.index` con mensaje flash.
     */
    public function store(StoreVisitorRequest $request)
    {
        $this->visitorService->create($request->validated());

        return redirect()
            ->route('visitors.index')
            ->with('message', 'Visitante creado correctamente.');
    }

    /**
     * Muestra el detalle de un visitante.
     *
     * @param  int  $id
     * @return \Inertia\Response Página React `Visitors/Show` con la prop `visitor`.
     */
    public function show(int $id)
    {
        $visitor = $this->visitorService->find($id);

        return Inertia::render('Visitors/Show', compact('visitor'));
    }

    /**
     * Muestra el formulario de edición.
     *
     * @param  int  $id
     * @return \Inertia\Response Página React `Visitors/Form` con la prop `visitor`.
     */
    public function edit(int $id)
    {
        $visitor = $this->visitorService->find($id);

        return Inertia::render('Visitors/Form', compact('visitor'));
    }

    /**
     * Actualiza los datos de un visitante.
     *
     * @param  UpdateVisitorRequest  $request  Petición ya validada.
     * @param  int  $id
     * @return \Illuminate\Http\RedirectResponse Redirección a `visitors.index` con mensaje flash.
     */
    public function update(UpdateVisitorRequest $request, int $id)
    {
        $this->visitorService->update($id, $request->validated());

        return redirect()
            ->route('visitors.index')
            ->with('message', 'Visitante actualizado correctamente.');
    }

    /**
     * Elimina un visitante.
     *
     * @param  int  $id
     * @return \Illuminate\Http\RedirectResponse Redirección a `visitors.index` con mensaje flash.
     */
    public function destroy(int $id)
    {
        $this->visitorService->delete($id);

        return redirect()
            ->route('visitors.index')
            ->with('message', 'Visitante eliminado correctamente.');
    }
}
