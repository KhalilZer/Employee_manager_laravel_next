<?php

use App\Http\Controllers\EmployeeController;
use Illuminate\Support\Facades\Route;



Route::prefix("employees")->group(function () {

    Route::get("/", [EmployeeController::class, "index"]); //Show all 
    Route::get("/search", [EmployeeController::class, "search"]); //Search by email,phone or Stauts
    Route::get("/withDeleted", [EmployeeController::class, "showSoftDeleted"]); // show all records includ softDeleted
    Route::get("/{employee}", [EmployeeController::class, "show"]); //Show by id

    Route::post("/", [EmployeeController::class, "store"]); // create an Employee
    Route::put("/{id}", [EmployeeController::class, "update"]); // update an Employee
    Route::delete("/{employee}", [EmployeeController::class, "destroy"]); //Delete an employee (soft)
});
