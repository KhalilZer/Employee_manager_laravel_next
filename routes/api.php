<?php

use App\Http\Controllers\EmployeeController;
use Illuminate\Support\Facades\Route;



Route::prefix("employees")->group(function () {

    Route::get("/", [EmployeeController::class, "index"]); // Show all employees
    Route::get("/search", [EmployeeController::class, "search"]); // Search by email, full name, or status
    Route::get("/withDeleted", [EmployeeController::class, "showSoftDeleted"]); // Show all records, including soft-deleted employees
    Route::get("/{employee}", [EmployeeController::class, "show"]); // Show an employee by ID

    Route::post("/", [EmployeeController::class, "store"]); // Create an employee
    Route::put("/{id}", [EmployeeController::class, "update"]); // Update an employee
    Route::delete("/{employee}", [EmployeeController::class, "destroy"]); // Soft-delete an employee
});
