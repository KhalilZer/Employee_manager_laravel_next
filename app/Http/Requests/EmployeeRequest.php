<?php

namespace App\Http\Requests;

use App\Enums\EmployeeStatusEnum;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Enum;

class EmployeeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        if ($this->isMethod("post")) {
            return [
                "full_name" => ["required", "string"],
                "email" => ["required", "unique:employees", "email"],
                "salary" => ["required", "numeric"],
                "hire_date" => ["required", "date"],
                "status" => ["required", new Enum(EmployeeStatusEnum::class)],
                "photo" => ["nullable"],
            ];
        }

        if ($this->isMethod("put") || $this->isMethod("patch")) {
            return [
                "full_name" => ["sometimes"],
                "email" => ["sometimes", "email",  Rule::unique("employees")->ignore($this->employee),],
                "salary" => ["sometimes"],
                "hire_date" => ["sometimes"],
                "status" => ["sometimes", new Enum(EmployeeStatusEnum::class)],
                "photo" => ["sometimes"],
            ];
        }
        return [];
    }
}
