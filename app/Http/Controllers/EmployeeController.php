<?php

namespace App\Http\Controllers;

use App\Helpers\ResponseHelper;
use App\Http\Requests\EmployeeRequest;
use App\Models\Employee;
use Illuminate\Http\Request;

class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $allEmp = Employee::all();
        return ResponseHelper::success($allEmp, "Retreived Succefully", 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(EmployeeRequest $request)
    {
        $validated = $request->validated();
        try {
            $createdEmp = Employee::create($validated);

            return ResponseHelper::success($createdEmp, "Created Succefully", 201);
        } catch (\Throwable $th) {
            return $th;
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Employee $employee)
    {
        return ResponseHelper::success($employee, "Retreived Succefully", 200);
    }
    public function search(Request $request)
    {
        $allowed_inputs = ["email", "phone", "status"];

        $query = Employee::query();


        foreach ($allowed_inputs as $input) {
            if ($request->filled($input)) {
                $query->where($input, $request->query($input));
            }
        }

        return $query->get();
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(EmployeeRequest $request, string $id)
    {
        $validated = $request->validated();

        $updatedEmp = Employee::findOrFail($id);
        if ($updatedEmp) {
            $updatedEmp->update([$validated]);
            return ResponseHelper::success($updatedEmp, "Updated Succefully", 201);
        } else {
            return ResponseHelper::error(null, "Employee Not found", 400);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Employee $emp)
    {

        $deleted = $emp->delete();
        return ResponseHelper::success(null, $deleted ? "Deleted Succefully" : "Employee not found", 200);
    }
}
