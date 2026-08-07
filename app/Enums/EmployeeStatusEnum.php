<?php

namespace App\Enums;

enum EmployeeStatusEnum: int
{
    case ACTIF = 1;
    case OFF = 2;
    case SUSPENDED = 3;
}
