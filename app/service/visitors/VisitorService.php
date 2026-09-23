<?php

namespace App\service\visitors;

use App\Models\visitors;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class VisitorService
{
    public function getAll(): LengthAwarePaginator
    {
        return visitors::latest()->paginate(10);
    }

    public function create(array $data): visitors
    {
        return visitors::create($data);
    }

    public function find(int $id): visitors
    {
        return visitors::findOrFail($id);
    }

    public function update(int $id, array $data): bool
    {
        return visitors::where('id', $id)->update($data) > 0;
    }

    public function delete(int $id): bool
    {
        return visitors::where('id', $id)->delete() > 0;
    }
}
