<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Employee extends Model
{
    use SoftDeletes;

    protected $fillable = ["full_name", "email", "salary", "hire_date", "status", "photo"];

    function scopeACTIFEmployees($query)
    {
        return $query->where("status", 1);
    }
    function scopeOFFEmployees($query)
    {
        return $query->where("status", 2);
    }
    function scopeSUSPENDEDEmployees($query)
    {
        return $query->where("status", 3);
    }
}
