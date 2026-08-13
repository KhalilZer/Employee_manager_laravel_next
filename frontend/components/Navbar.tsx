import Link from "next/link";
import React from "react";

const Navbar = () => {
    return (
        <div className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 shadow-sm backdrop-blur-lg">
            <ul className="mx-auto flex h-16 max-w-7xl items-center justify-center gap-2 px-4 sm:px-6 lg:px-8">
                <Link href={"/"} className="rounded-xl px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 hover:text-indigo-600">
                    <li className="list-none">Dashboard</li>
                </Link>
                <Link href={"create-employee"} className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-indigo-200 hover:bg-indigo-700 hover:shadow-md">
                    <li className="list-none">Create Employee</li>
                </Link>
            </ul>
        </div>
    );
};

export default Navbar;
