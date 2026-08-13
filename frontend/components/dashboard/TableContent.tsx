import RenderTable from "./RenderTable";

type Props = {
    allEmp: IEmployee[] | null;
};
const TableContent = ({ allEmp }: Props) => {
    return (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            {allEmp?.length ? (
                <RenderTable allEmp={allEmp} />
            ) : (
                <h1 className="px-6 py-24 text-center text-lg font-semibold text-slate-500">No employees found</h1>
            )}
        </div>
    );
};

export default TableContent;
