<?php

namespace App\Services;

use App\Enums\EmployeeStatusEnum;
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
            if ($input === "status" && $value != 0) {
                $query = $this->showWithStatus($query, EmployeeStatusEnum::tryFrom($value)->name);
            }
            if ($input === "sort") {
                $query = $this->sortEmployees($value, $query);
            }
            if ($input != "status" && $input != "sort") {
                $query->where($input, "LIKE", "{$value}%");
            }
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

    private function showWithStatus($query, string $status)
    {
        return $query->{$status . "Employees"}();
    }
    private function sortEmployees(int $sortCase,  $query)
    {
        switch ($sortCase) {
            case 1:
                $query->latest();
                break;
            case 2:
                $query->orderBy("salary", "desc");
                break;
            case 3:
                $query->orderBy("salary", "asc");

                break;
            default:
                $query->latest();
                break;
        }

        return $query;
    }
}
