<?php

namespace App\service\visits;

use App\Models\visits;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class VisitService
{
    public function getAll(): LengthAwarePaginator
    {
        return visits::with(['visitor', 'department', 'user'])
            ->latest('entry_time')
            ->paginate(10);
    }

    public function create(array $data): visits
    {
        return visits::create($data);
    }

    public function find(int $id): visits
    {
        return visits::with(['visitor', 'department', 'user'])->findOrFail($id);
    }

    public function update(int $id, array $data): bool
    {
        return visits::where('id', $id)->update($data) > 0;
    }

    public function delete(int $id): bool
    {
        return visits::where('id', $id)->delete() > 0;
    }
}
