<?php

use App\Http\Controllers\EmployeeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;



Route::get("employees", [EmployeeController::class, "index"]);
Route::get("employees/{employee}", [EmployeeController::class, "show"]);
Route::get("employees/email/{email}", [EmployeeController::class, "showWithEmail"]);
Route::post("employees", [EmployeeController::class, "store"]);
Route::put("employees/{id}", [EmployeeController::class, "update"]);
Route::get("employees?search={name}", [EmployeeController::class, "show"]);
