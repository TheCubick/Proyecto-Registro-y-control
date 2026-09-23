<?php

namespace App\service\departments;

use App\Models\departments;

class DepartmentService{

    public function create(array $data):departments
    {
        return departments::create($data);
    }

    public function find(int $id): departments{
        return departments::findorfail($id);
    }

    public function update(int $id, array $data): bool
    {
        return departments::where('id', $id)->update($data) > 0;
    }

    public function delete(int $id): bool
    {
        return departments::where('id', $id)->delete() > 0;
    }
}
