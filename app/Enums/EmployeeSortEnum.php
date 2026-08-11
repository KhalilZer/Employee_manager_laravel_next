<?php

namespace App\Enums;

enum EmployeeSortEnum: int
{
    case NEWEST = 1;
    case HIGH_SALARY = 2;
    case MIN_SALARY = 3;
}
