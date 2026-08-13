import { SearchStatusEnum } from "@/enums/search-enums";
import Image from "next/image";
import React from "react";

type Props = {
    employee: IEmployee;
};
const EmployeeDetails = ({ employee }: Props) => {
    return (
        <div className="mx-auto my-8 grid max-w-2xl gap-4 rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-xl shadow-slate-200/60 sm:my-12 sm:p-10">
            <p className="text-3xl font-black tracking-tight text-slate-900">{employee.full_name}</p>
            <p className="text-lg font-bold text-indigo-600">{employee.salary}</p>
            <p className="text-sm font-medium text-slate-500">{employee.email}</p>
            <p className="mx-auto rounded-full bg-emerald-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700">{SearchStatusEnum[employee.status]}</p>
            <Image
                className="mx-auto rounded-2xl border-4 border-white object-cover shadow-lg"
                src={employee.photo}
                alt={employee.email}
                width={200}
                height={400}
            />
            <p className="text-sm font-medium text-slate-500">{new Date(employee.hire_date).toLocaleDateString("FR-fr")}</p>
        </div>
    );
};

export default EmployeeDetails;
