"use client";
import { employeeInput, employeeSchema } from "@/validators/employee-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import Input from "./Form/Input";
import { status_fields } from "@/constants/search-bar";
import { putEmployee } from "../services/employee-service";
import { showToast } from "nextjs-toast-notify";

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
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<employeeInput>({
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

    const onSubmitUpdate: SubmitHandler<employeeInput> = async (data) => {
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
    };
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmitUpdate)}>
                <Input
                    label="FullName"
                    nameField="full_name"
                    register={register}
                    error={errors.full_name}
                />
                <Input
                    label="email"
                    nameField="email"
                    register={register}
                    error={errors.email}
                />
                <Input
                    label="salary"
                    nameField="salary"
                    register={register}
                    error={errors.salary}
                    valueAsNumber={true}
                />{" "}
                <Input
                    label="photo"
                    nameField="photo"
                    register={register}
                    error={errors.photo}
                />{" "}
                <select {...register("status", { valueAsNumber: true })}>
                    {status_fields.map((status) => {
                        if (status.value != 0) {
                            if (employeToUpdate?.status === status.value) {
                                return (
                                    <option value={status.value} selected>
                                        {status.display}
                                    </option>
                                );
                            } else {
                                return (
                                    <option value={status.value}>
                                        {status.display}
                                    </option>
                                );
                            }
                        }
                    })}
                </select>
                <span>{errors.status?.message}</span>
                <Input
                    label="Hire Date"
                    nameField="hire_date"
                    register={register}
                    error={errors.hire_date}
                />
                <button type="submit">Update Employee</button>
            </form>
        </div>
    );
};

export default FormUpdateCreate;
