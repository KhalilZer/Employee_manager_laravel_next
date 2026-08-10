"use client";

import { useState } from "react";

const searchBy_fields = [
    { key: 1, value: "fullname", display: "By FullName" },
    { key: 2, value: "email", display: "By Email" },
    { key: 3, value: "status", display: "By Status" },
];

const order_fields = [
    { value: "newest", display: "By Newest" },
    { value: "high_salary", display: "By Heigh Salary" },
    { value: "min_salary", display: "By Min Salary" },
];

type Props = {
    OnSearchBy: (searchBy: string) => void;
    onSearch: (input: string) => void;
};

const SearchBar = ({ OnSearchBy, onSearch }: Props) => {
    const [searchBy, setSearchBy] = useState("fullname");

    const handleSearchByChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        OnSearchBy(value);
        setSearchBy(value);
    };
    return (
        <div>
            <select className="border" onChange={handleSearchByChange}>
                {searchBy_fields.map((field) => {
                    return (
                        <option key={field.key} value={field.value}>
                            {field.display}
                        </option>
                    );
                })}
            </select>
            {searchBy === "email" || searchBy === "fullname" ? (
                <input
                    type={searchBy === "email" ? "email" : "text"}
                    className="border"
                    onChange={(e) => onSearch("dsqdqs")}
                />
            ) : (
                <select name="" id="">
                    <option value="1">Actif</option>
                    <option value="2">OFF</option>
                    <option value="3">Holidays</option>
                </select>
            )}

            <select name="" id="">
                {order_fields.map((field, index) => {
                    return (
                        <option key={index} value={field.value}>
                            {field.display}
                        </option>
                    );
                })}
            </select>
        </div>
    );
};

export default SearchBar;
