import Link from "next/link";
import React from "react";

const Navbar = () => {
    return (
        <div>
            <ul className="flex gap-2 justify-center">
                <Link href={"/"}>
                    <li>Dashboard</li>
                </Link>
                <Link href={"create-employee"}>
                    <li>Create Employee</li>
                </Link>
            </ul>
        </div>
    );
};

export default Navbar;
