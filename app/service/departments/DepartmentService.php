<?php

namespace App\service\departments;

use App\Models\departments;

class DepartmentService{

    public function create(array $data):departments
    {
        return departments::create($data);
    }
}
