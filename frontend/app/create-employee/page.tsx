import FormUpdateCreate from "@/components/form/FormUpdateCreate";
import React from "react";

const Createpage = () => {
    return (
        <div className="mx-auto w-full max-w-3xl px-4 py-8 text-3xl font-bold tracking-tight text-slate-900 sm:px-6 lg:py-12">
            Create Employee
            <FormUpdateCreate />
        </div>
    );
};

export default Createpage;
