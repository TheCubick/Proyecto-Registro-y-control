<?php

namespace App\Http\Controllers;

use App\Http\Requests\Visits\StoreVisitRequest;
use App\Http\Requests\Visits\UpdateVisitRequest;
use App\Models\departments;
use App\Models\User;
use App\Models\visitors;
use App\service\visits\VisitService;
use Inertia\Inertia;

/**
 * Controlador del módulo de visitas (rutas `visits.*`).
 *
 * Delega la validación a las FormRequests y la persistencia a VisitService.
 * Los formularios reciben los catálogos de visitantes, departamentos y usuarios.
 */
class VisitController extends Controller
{
    /**
     * @param  VisitService  $visitService  Servicio inyectado por el contenedor de Laravel.
     */
    public function __construct(private VisitService $visitService)
    {
    }

    /**
     * Lista las visitas con sus relaciones, 10 por página.
     *
     * @return \Inertia\Response Página React `Visits/Index` con la prop `visits`.
     */
    public function index()
    {
        $visits = $this->visitService->getAll();

        return Inertia::render('Visits/Index', compact('visits'));
    }

    /**
     * Muestra el formulario de alta con los catálogos ordenados alfabéticamente.
     *
     * @return \Inertia\Response Página React `Visits/Form` con `visitors`, `departments` y `users`.
     */
    public function create()
    {
        return Inertia::render('Visits/Form', [
            'visitors' => visitors::orderBy('full_name')->get(),
            'departments' => departments::orderBy('name')->get(),
            'users' => User::orderBy('name')->get(),
        ]);
    }

    /**
     * Registra una nueva visita.
     *
     * @param  StoreVisitRequest  $request  Petición ya validada.
     * @return \Illuminate\Http\RedirectResponse Redirección a `visits.index` con mensaje flash.
     */
    public function store(StoreVisitRequest $request)
    {
        $this->visitService->create($request->validated());

        return redirect()
            ->route('visits.index')
            ->with('message', 'Visita creada correctamente.');
    }

    /**
     * Muestra el detalle de una visita.
     *
     * @param  int  $id
     * @return \Inertia\Response Página React `Visits/Show` con la prop `visit`.
     */
    public function show(int $id)
    {
        $visit = $this->visitService->find($id);

        return Inertia::render('Visits/Show', compact('visit'));
    }

    /**
     * Muestra el formulario de edición con la visita y los catálogos.
     *
     * @param  int  $id
     * @return \Inertia\Response Página React `Visits/Form`.
     */
    public function edit(int $id)
    {
        $visit = $this->visitService->find($id);

        return Inertia::render('Visits/Form', [
            'visit' => $visit,
            'visitors' => visitors::orderBy('full_name')->get(),
            'departments' => departments::orderBy('name')->get(),
            'users' => User::orderBy('name')->get(),
        ]);
    }

    /**
     * Actualiza una visita (incluida la hora de salida y el estado).
     *
     * @param  UpdateVisitRequest  $request  Petición ya validada.
     * @param  int  $id
     * @return \Illuminate\Http\RedirectResponse Redirección a `visits.index` con mensaje flash.
     */
    public function update(UpdateVisitRequest $request, int $id)
    {
        $this->visitService->update($id, $request->validated());

        return redirect()
            ->route('visits.index')
            ->with('message', 'Visita actualizada correctamente.');
    }

    /**
     * Elimina una visita.
     *
     * @param  int  $id
     * @return \Illuminate\Http\RedirectResponse Redirección a `visits.index` con mensaje flash.
     */
    public function destroy(int $id)
    {
        $this->visitService->delete($id);

        return redirect()
            ->route('visits.index')
            ->with('message', 'Visita eliminada correctamente.');
    }
}
