"use client";
import { useState } from "react";
import RenderActionButtons from "./RenderActionButtons";
import { SubmitHandler } from "react-hook-form";
import { employeeInput } from "@/validators/employee-schema";
import { fetchALlEmployees, putEmployee } from "@/services/employee-service";
import FormUpdateCreate from "../FormUpdateCreate";
type Props = {
    allEmp: IEmployee[];
};

const RenderTable = ({ allEmp }: Props) => {
    const [updateEmployee, setUpdateEmployee] = useState(false);
    const [employeeToUpdate, setEmployeeToUpdate] = useState<IEmployee | null>(
        null,
    );

    const [listEmployees, setListEmployees] = useState<IEmployee[] | null>(
        allEmp,
    );

    const fetchSearchEmployee = async () => {
        const allEmp = await fetchALlEmployees();
        setListEmployees(allEmp.data);
    };
    return (
        <div>
            {updateEmployee && (
                <FormUpdateCreate
                    setUpdateEmployee={setUpdateEmployee}
                    employeToUpdate={employeeToUpdate}
                    refreshTable={fetchSearchEmployee}
                />
            )}

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Salary</th>
                        <th>Hire Date</th>
                        <th>Status</th>
                        <th>Photo</th>
                        <th>Created At</th>
                        <th>Deleted ?</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {listEmployees?.map((emp) => {
                        return (
                            <tr key={emp.id}>
                                <td>{emp.id}</td>

                                <td>{emp.full_name}</td>
                                <td>{emp.email}</td>
                                <td>{emp.salary}</td>
                                <td>
                                    {new Date(emp.hire_date).toLocaleDateString(
                                        "FR-fr",
                                    )}
                                </td>
                                <td>{emp.status}</td>
                                <td>{emp.photo}</td>
                                <td>
                                    {new Date(
                                        emp.created_at,
                                    ).toLocaleDateString("FR-fr")}
                                </td>
                                <td>{emp.deleted_at ? "YES" : "NO"}</td>
                                <RenderActionButtons
                                    refreshTable={fetchSearchEmployee}
                                    employeeId={emp.id}
                                    updateEmpClicked={() => {
                                        setUpdateEmployee(true);
                                        setEmployeeToUpdate(emp);
                                    }}
                                />
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default RenderTable;
