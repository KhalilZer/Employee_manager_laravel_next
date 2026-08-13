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
        return ResponseHelper::success($allEmp, "Retreived Succefully", 200);
    }


    public function store(EmployeeRequest $request)
    {
        $createdEmp = $this->service->create($request->validated());
        return ResponseHelper::success($createdEmp, "Created Succefully", 201);
    }


    public function show(Employee $employee)
    {
        return ResponseHelper::success($employee, "Retreived Succefully", 200);
    }
    public function search(Request $request)
    {
        $employees = $this->service->search($request->only(["email", "full_name", "status", "sort"]));
        return ResponseHelper::success($employees, "Retreived Succefully", 200);
    }

    public function update(EmployeeRequest $request, int $id)
    {
        $updatedEmp = $this->service->update($id,  $request->validated());
        return ResponseHelper::success($updatedEmp, "Updated Succefully", 201);
    }


    public function destroy(Employee $employee)
    {
        $this->service->destroy($employee);
        return ResponseHelper::success(null,  "Deleted Succefully", 200);
    }

    public function showSoftDeleted()
    {
        $allEmpWithTrash = $this->service->showSoftDeleted();
        return ResponseHelper::success($allEmpWithTrash, "Retreived Succefully", 200);
    }
}
