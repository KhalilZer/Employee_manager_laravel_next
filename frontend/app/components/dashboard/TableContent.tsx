import React from "react";
import RenderTable from "./RenderTable";

type Props = {
    allEmp: IEmployee[];
};
const TableContent = ({ allEmp }: Props) => {
    return (
        <div>
            {allEmp.length ? (
                <RenderTable allEmp={allEmp} />
            ) : (
                <h1>No Employee Found</h1>
            )}
        </div>
    );
};

export default TableContent;
