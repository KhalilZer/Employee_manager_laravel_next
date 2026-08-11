import Dashboard from "./components/Dashboard";
import { fetchALlEmployees } from "./services/employee-service";

export default async function Home() {
    const allEmp = await fetchALlEmployees();

    return (
        <div>
            <Dashboard allEmp={allEmp.data} />
        </div>
    );
}
