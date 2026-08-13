import EmployeeDetails from "@/components/EmployeeDetails";
import { showEmployee } from "@/services/employee-service";

type Props = {
    params: {
        id: number;
    };
};
const EmployeeDetailsPage = async ({ params }: Props) => {
    const { id } = await params;
    const emp = await showEmployee(id);
    if (emp.success) {
        return <EmployeeDetails employee={emp.data} />;
    } else {
        return <div>Employee not found</div>;
    }
};

export default EmployeeDetailsPage;
