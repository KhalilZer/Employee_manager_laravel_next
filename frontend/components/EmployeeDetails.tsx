import { SearchStatusEnum } from "@/enums/search-enums";
import Image from "next/image";
import React from "react";

type Props = {
    employee: IEmployee;
};
const EmployeeDetails = ({ employee }: Props) => {
    return (
        <div>
            <p>{employee.full_name}</p>
            <p>{employee.salary}</p>
            <p>{employee.email}</p>
            <p>{SearchStatusEnum[employee.status]}</p>
            <Image
                src={employee.photo}
                alt={employee.email}
                width={200}
                height={400}
            />
            <p>{new Date(employee.hire_date).toLocaleDateString("FR-fr")}</p>
        </div>
    );
};

export default EmployeeDetails;
