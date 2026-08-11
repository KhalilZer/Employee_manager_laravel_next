"use client";
import { useEffect, useState } from "react";
import SearchBar from "./dashboard/SearchBar";
import TableContent from "./dashboard/TableContent";
import { searchEmployees } from "../services/employee-service";

type Props = {
    allEmp: IEmployee[];
};

const Dashboard = ({ allEmp }: Props) => {
    const [searchBy, setSearchBy] = useState("full_name");
    const [searchInput, setSearchInput] = useState("");
    const [searchStatus, setSearchStatus] = useState(0);
    const [sortValue, setSortValue] = useState(1);

    const [loading, setLoading] = useState(false);
    const [listEmployees, setListEmployees] = useState<IEmployee[]>(allEmp);

    useEffect(() => {
        fetchSearchEmployee();
    }, [searchBy, searchInput, searchStatus.toString(), sortValue.toString()]);

    const fetchSearchEmployee = async () => {
        setLoading(true);
        const fetchedEmployees = await searchEmployees(
            [searchBy, "status", "sort"],
            [searchInput, searchStatus, sortValue],
        );
        setLoading(false);
        setListEmployees(fetchedEmployees.data);
    };

    return (
        <div>
            <SearchBar
                searchBy={searchBy}
                onSearchBy={setSearchBy}
                searchStatus={searchStatus}
                onChangeStatus={setSearchStatus}
                searchInput={searchInput}
                onChangeSearchInput={setSearchInput}
                onSortChange={setSortValue}
            />
            {loading ? (
                <h1>Loading.....</h1>
            ) : (
                <TableContent allEmp={listEmployees} />
            )}
        </div>
    );
};

export default Dashboard;
