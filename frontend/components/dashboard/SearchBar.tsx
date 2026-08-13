"use client";

import {
    order_fields,
    searchBy_fields,
    status_fields,
} from "@/constants/search-bar";
import { Filter, Search, Sliders, UserCheck } from "@deemlol/next-icons";

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
        <div className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-2 lg:grid-cols-4 lg:p-5">
            <div className="relative">
            <Filter className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <select
                className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 py-2 pl-11 pr-3 text-sm font-medium text-slate-700 outline-none hover:border-slate-300 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
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
            </div>

            <div className="relative">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
                type={searchBy === "email" ? "email" : "text"}
                className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-11 pr-4 text-sm text-slate-800 outline-none placeholder:text-slate-400 hover:border-slate-300 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                onChange={(e) => onChangeSearchInput(e.target.value)}
            />
            </div>

            <div className="relative">
            <UserCheck className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <select className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 py-2 pl-11 pr-3 text-sm font-medium text-slate-700 outline-none hover:border-slate-300 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100" onChange={(e) => onChangeStatus(Number(e.target.value))}>
                {status_fields.map((field) => {
                    return (
                        <option key={field.value} value={field.value}>
                            {field.display}
                        </option>
                    );
                })}
            </select>
            </div>

            <div className="relative">
            <Sliders className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <select className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 py-2 pl-11 pr-3 text-sm font-medium text-slate-700 outline-none hover:border-slate-300 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100" onChange={(e) => onSortChange(Number(e.target.value))}>
                {order_fields.map((field, index) => {
                    return (
                        <option key={index} value={field.value}>
                            {field.display}
                        </option>
                    );
                })}
            </select>
            </div>
        </div>
    );
};

export default SearchBar;
