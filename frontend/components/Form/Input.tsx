"use client";
import { employeeInput } from "@/validators/employee-schema";
import { useState } from "react";
import { FieldError, Path, UseFormRegister } from "react-hook-form";

type Props = {
    register: UseFormRegister<employeeInput>;
    nameField: Path<employeeInput>;
    label: string;
    error: FieldError | undefined;
    valueAsNumber?: boolean;
};

const Input = ({ register, nameField, label, error, valueAsNumber }: Props) => {
    return (
        <div>
            <label htmlFor="">{label}</label>
            <input
                type="text"
                {...register(nameField, {
                    valueAsNumber: valueAsNumber ? valueAsNumber : false,
                })}
                className="border"
            />
            <span>{error?.message}</span>
        </div>
    );
};

export default Input;
