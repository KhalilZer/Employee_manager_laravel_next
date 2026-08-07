<?php

use App\Http\Controllers\EmployeeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;



Route::get("employees", [EmployeeController::class, "index"]);
Route::get("employees/search", [EmployeeController::class, "search"]);
Route::get("employees/{employee}", [EmployeeController::class, "show"]);
Route::post("employees", [EmployeeController::class, "store"]);
Route::put("employees/{id}", [EmployeeController::class, "update"]);
