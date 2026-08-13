"use client";
import { useState } from "react";
import RenderActionButtons from "./RenderActionButtons";
import { SubmitHandler } from "react-hook-form";
import { EmployeeInput } from "@/validators/employee-schema";
import { fetchALlEmployees, putEmployee } from "@/services/employee-service";
import FormUpdateCreate from "../form/FormUpdateCreate";
import Image from "next/image";
import Modal from "../Modal";
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
        <div className="overflow-x-auto">
            {updateEmployee && (
                <Modal onClose={() => setUpdateEmployee(false)}>
                    <FormUpdateCreate
                        setUpdateEmployee={setUpdateEmployee}
                        employeToUpdate={employeeToUpdate}
                        refreshTable={fetchSearchEmployee}
                    />
                </Modal>
            )}

            <table className="w-full min-w-[1100px] border-collapse text-left text-sm">
                <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                    <tr className="divide-x divide-slate-100">
                        <th className="px-4 py-4 font-bold">ID</th>
                        <th className="px-4 py-4 font-bold">Full Name</th>
                        <th className="px-4 py-4 font-bold">Email</th>
                        <th className="px-4 py-4 font-bold">Salary</th>
                        <th className="px-4 py-4 font-bold">Hire Date</th>
                        <th className="px-4 py-4 font-bold">Status</th>
                        <th className="px-4 py-4 font-bold">Photo</th>
                        <th className="px-4 py-4 font-bold">Created At</th>
                        <th className="px-4 py-4 font-bold">Deleted?</th>
                        <th className="px-4 py-4 font-bold">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                    {listEmployees?.map((emp) => {
                        return (
                            <tr
                                key={emp.id}
                                className="text-slate-600 transition-colors hover:bg-indigo-50/50"
                            >
                                <td className="px-4 py-4 font-mono text-xs text-slate-400">
                                    {emp.id}
                                </td>

                                <td className="whitespace-nowrap px-4 py-4 font-semibold text-slate-900">
                                    {emp.full_name}
                                </td>
                                <td className="px-4 py-4">{emp.email}</td>
                                <td className="whitespace-nowrap px-4 py-4 font-medium">
                                    {emp.salary}
                                </td>
                                <td className="whitespace-nowrap px-4 py-4">
                                    {new Date(emp.hire_date).toLocaleDateString(
                                        "FR-fr",
                                    )}
                                </td>
                                <td className="px-4 py-4 font-medium text-emerald-600">
                                    {emp.status}
                                </td>
                                <td className="max-w-36 truncate px-4 py-4 text-xs text-slate-400">
                                    <Image
                                        src={emp.photo}
                                        alt={emp.full_name}
                                        height={30}
                                        width={30}
                                    />
                                </td>
                                <td className="whitespace-nowrap px-4 py-4">
                                    {new Date(
                                        emp.created_at,
                                    ).toLocaleDateString("FR-fr")}
                                </td>
                                <td className="px-4 py-4 font-semibold text-slate-500">
                                    {emp.deleted_at ? "YES" : "NO"}
                                </td>
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
