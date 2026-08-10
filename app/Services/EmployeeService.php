<?php

namespace App\Services;

use App\Models\Employee;

class EmployeeService
{

    public function fetchAll()
    {
        return  Employee::all();
    }

    public function create(array $data)
    {
        return Employee::create($data);
    }

    public function search(array $filters)
    {
        $query = Employee::query();

        foreach ($filters as $input => $value) {
            $query->where($input, $value);
        }

        return $query->get();
    }

    public function update(string $id, $data = [])
    {

        $updatedEmp = Employee::findOrFail($id);
        return $updatedEmp->update([$data]);
    }

    public function destroy(Employee $employee)
    {
        return $employee->delete();
    }

    public function showSoftDeleted()
    {
        return Employee::withTrashed()->get();
    }

    public function showWithStatus(string $status)
    {
        return Employee::{$status . "Employees"}()->get();
    }
}
