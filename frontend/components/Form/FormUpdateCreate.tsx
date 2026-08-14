"use client";
import { EmployeeInput, employeeSchema } from "@/validators/employee-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { status_fields } from "@/constants/search-bar";
import { showToast } from "nextjs-toast-notify";
import { craeteEmployee, putEmployee } from "@/services/employee-service";
import Input from "./Input";
import { useState } from "react";
import {
    Calendar,
    Dollar,
    Image,
    Mail,
    User,
    UserCheck,
} from "@deemlol/next-icons";

type Props = {
    employeToUpdate?: IEmployee | null;
    refreshTable?: () => void;
    setUpdateEmployee?: (value: boolean) => void;
};
const FormUpdateCreate = ({
    employeToUpdate,
    refreshTable,
    setUpdateEmployee,
}: Props) => {
    const [loadding, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<EmployeeInput>({
        resolver: zodResolver(employeeSchema),
        defaultValues: {
            full_name: employeToUpdate?.full_name,
            email: employeToUpdate?.email,
            salary: employeToUpdate?.salary,
            photo: employeToUpdate?.photo,
            status: employeToUpdate?.status,
            hire_date: employeToUpdate?.hire_date?.toString(),
        },
    });

    const onSubmitUpdate: SubmitHandler<EmployeeInput> = async (data) => {
        setLoading(true);
        const updatedEmp = await putEmployee(employeToUpdate?.id, data);
        if (updatedEmp.success) {
            showToast.success(updatedEmp.message, {
                duration: 4000,
                progress: true,
                position: "top-right",
                transition: "bounceIn",
                icon: "",
                sound: true,
            });

            setUpdateEmployee && setUpdateEmployee(false);
            refreshTable && refreshTable();
        } else {
            showToast.error(updatedEmp.message, {
                duration: 4000,
                progress: true,
                position: "top-right",
                transition: "bounceIn",
                icon: "",
                sound: true,
            });
        }
        setLoading(false);
    };
    const onSubmitCreate: SubmitHandler<EmployeeInput> = async (data) => {
        setLoading(true);

        const createdEmp = await craeteEmployee(data);
        if (createdEmp.success) {
            showToast.success(createdEmp.message, {
                duration: 4000,
                progress: true,
                position: "top-right",
                transition: "bounceIn",
                icon: "",
                sound: true,
            });
            reset();
        } else {
            showToast.error(createdEmp.message, {
                duration: 4000,
                progress: true,
                position: "top-right",
                transition: "bounceIn",
                icon: "",
                sound: true,
            });
        }
        setLoading(false);
    };
    return (
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 text-base font-normal shadow-xl shadow-slate-200/60 sm:p-8">
            {loadding && (
                <h1 className="mb-4 rounded-xl bg-indigo-50 px-4 py-3 text-center text-sm font-semibold text-indigo-600 animate-pulse">
                    Loading...
                </h1>
            )}
            <form
                className="space-y-5"
                onSubmit={handleSubmit(
                    employeToUpdate ? onSubmitUpdate : onSubmitCreate,
                )}
            >
                <Input<EmployeeInput>
                    icon={<User size={18} />}
                    label="Full name"
                    nameField="full_name"
                    register={register}
                    error={errors.full_name}
                />
                <Input<EmployeeInput>
                    icon={<Mail size={18} />}
                    label="Email"
                    nameField="email"
                    register={register}
                    error={errors.email}
                />
                <Input<EmployeeInput>
                    icon={<Dollar size={18} />}
                    label="Salary"
                    nameField="salary"
                    register={register}
                    error={errors.salary}
                    valueAsNumber={true}
                />{" "}
                <Input<EmployeeInput>
                    icon={<Image size={18} />}
                    label="Photo URL"
                    nameField="photo"
                    register={register}
                    error={errors.photo}
                />{" "}
                <div className="relative">
                    <UserCheck
                        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                        size={18}
                    />
                    <select
                        className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 py-2 pl-11 pr-4 text-sm font-normal text-slate-800 outline-none hover:border-slate-300 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                        {...register("status", { valueAsNumber: true })}
                    >
                        {status_fields.map((status, index) => {
                            if (status.value != 0) {
                                if (employeToUpdate?.status === status.value) {
                                    return (
                                        <option
                                            key={index}
                                            value={status.value}
                                            selected
                                        >
                                            {status.display}
                                        </option>
                                    );
                                } else {
                                    return (
                                        <option
                                            key={index}
                                            value={status.value}
                                        >
                                            {status.display}
                                        </option>
                                    );
                                }
                            }
                        })}
                    </select>
                </div>
                <span className="block text-xs font-medium text-rose-600">
                    {errors.status?.message}
                </span>
                <Input<EmployeeInput>
                    icon={<Calendar size={18} />}
                    label="Hire Date"
                    nameField="hire_date"
                    register={register}
                    error={errors.hire_date}
                    isDate
                />
                <button
                    className="w-full rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-200 hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
                    type="submit"
                >
                    {employeToUpdate ? "Update Employee" : "Create Employee"}
                </button>
            </form>
        </div>
    );
};

export default FormUpdateCreate;
