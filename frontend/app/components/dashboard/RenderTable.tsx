type Props = {
    allEmp: IEmployee[];
};
const RenderTable = ({ allEmp }: Props) => {
    return (
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
                </tr>
            </thead>
            <tbody>
                {allEmp.map((emp) => {
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
                                {new Date(emp.created_at).toLocaleDateString(
                                    "FR-fr",
                                )}
                            </td>
                            <td>{emp.deleted_at ? "YES" : "NO"}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default RenderTable;
