import Dashboard from "./components/Dashboard";
import { fetchALl } from "./services/employee-service";

export default async function Home() {
    const allEmp = await fetchALl();

    return (
        <div>
            <Dashboard allEmp={allEmp.data} />
        </div>
    );
}
