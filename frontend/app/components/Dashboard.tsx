"use client";
import SearchBar from "./dashboard/SearchBar";
import TableContent from "./dashboard/TableContent";

type Props = {
    allEmp: IEmployee[];
};
const Dashboard = ({ allEmp }: Props) => {
    const OnSearchBy = (searchBy: string) => {
        console.log(searchBy);
    };
    const OnSearch = (input: string) => {};
    return (
        <div>
            <SearchBar OnSearchBy={OnSearchBy} onSearch={OnSearch} />
            <TableContent allEmp={allEmp} />
        </div>
    );
};

export default Dashboard;
