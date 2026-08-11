"use client";

import {
    order_fields,
    searchBy_fields,
    status_fields,
} from "@/constants/search-bar";

type Props = {
    searchBy: string;
    onSearchBy: (searchBy: string) => void;
    searchInput: string;
    onChangeSearchInput: (input: string) => void;
    searchStatus: number;
    onChangeStatus: (input: number) => void;
    onSortChange: (value: number) => void;
};

const SearchBar = ({
    searchStatus,
    onChangeStatus,
    onChangeSearchInput,
    onSearchBy,
    searchBy,
    onSortChange,
}: Props) => {
    return (
        <div>
            <select
                className="border"
                onChange={(e) => onSearchBy(e.target.value)}
            >
                {searchBy_fields.map((field) => {
                    return (
                        <option key={field.key} value={field.value}>
                            {field.display}
                        </option>
                    );
                })}
            </select>

            <input
                type={searchBy === "email" ? "email" : "text"}
                className="border"
                onChange={(e) => onChangeSearchInput(e.target.value)}
            />

            <select onChange={(e) => onChangeStatus(Number(e.target.value))}>
                {status_fields.map((field) => {
                    return (
                        <option key={field.value} value={field.value}>
                            {field.display}
                        </option>
                    );
                })}
            </select>

            <select onChange={(e) => onSortChange(Number(e.target.value))}>
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
