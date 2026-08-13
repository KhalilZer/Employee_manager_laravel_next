"use client";
import { EmployeeInput } from "@/validators/employee-schema";
import { FieldError, Path, UseFormRegister } from "react-hook-form";
import { ReactNode } from "react";

type Props = {
    register: UseFormRegister<EmployeeInput>;
    nameField: Path<EmployeeInput>;
    label: string;
    error: FieldError | undefined;
    valueAsNumber?: boolean;
    isDate?: boolean;
    icon?: ReactNode;
};

const Input = ({
    register,
    nameField,
    label,
    error,
    valueAsNumber,
    isDate,
    icon,
}: Props) => {
    return (
        <div className="space-y-2">
            <label
                className="block text-sm font-semibold text-slate-700"
                htmlFor=""
            >
                {label}
            </label>
            <div className="relative">
                <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                    {icon}
                </span>
                <input
                    type={isDate ? "date" : "text"}
                    {...register(nameField, {
                        valueAsNumber: valueAsNumber ? valueAsNumber : false,
                    })}
                    className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-11 pr-4 text-sm font-normal text-slate-800 outline-none hover:border-slate-300 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                />
            </div>
            <span className="block text-xs font-medium text-rose-600">
                {error?.message}
            </span>
        </div>
    );
};

export default Input;
