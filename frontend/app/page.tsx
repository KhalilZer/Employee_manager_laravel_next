import Dashboard from "../components/Dashboard";
import { fetchALlEmployees } from "../services/employee-service";

export default async function Home() {
    const allEmp = await fetchALlEmployees();

    return (
        <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <Dashboard allEmp={allEmp.data} />
        </div>
    );
}
