<?php

namespace App\Http\Controllers;

use App\Helpers\ResponseHelper;
use App\Http\Requests\EmployeeRequest;
use App\Models\Employee;
use App\Services\EmployeeService;
use Illuminate\Http\Request;

class EmployeeController extends Controller
{

    public function __construct(
        private EmployeeService $service
    ) {}

    public function index()
    {
        $allEmp = $this->service->fetchAll();
        return ResponseHelper::success($allEmp, "Employees retrieved successfully", 200);
    }


    public function store(EmployeeRequest $request)
    {
        $createdEmp = $this->service->create($request->validated());
        return ResponseHelper::success($createdEmp, "Employee created successfully", 201);
    }


    public function show(Employee $employee)
    {
        return ResponseHelper::success($employee, "Employee retrieved successfully", 200);
    }
    public function search(Request $request)
    {
        $employees = $this->service->search($request->only(["email", "full_name", "status", "sort"]));
        return ResponseHelper::success($employees, "Employees retrieved successfully", 200);
    }

    public function update(EmployeeRequest $request, int $id)
    {
        $updatedEmp = $this->service->update($id,  $request->validated());
        return ResponseHelper::success($updatedEmp, "Employee updated successfully", 201);
    }


    public function destroy(Employee $employee)
    {
        $this->service->destroy($employee);
        return ResponseHelper::success(null,  "Employee deleted successfully", 200);
    }

    public function showSoftDeleted()
    {
        $allEmpWithTrash = $this->service->showSoftDeleted();
        return ResponseHelper::success($allEmpWithTrash, "Employees retrieved successfully", 200);
    }
}
