import { deleteEmployee } from "@/services/employee-service";
import { Delete, Eye, UserPlus } from "@deemlol/next-icons";
import Link from "next/link";
import { showToast } from "nextjs-toast-notify";

type Props = {
    employeeId: number;
    updateEmpClicked?: () => void;
    refreshTable?: () => void;
};

const RenderActionButtons = ({
    updateEmpClicked,
    employeeId,
    refreshTable,
}: Props) => {
    const deleteEmp = async () => {
        const deleted = await deleteEmployee(employeeId);
        if (deleted.success) {
            showToast.success(deleted.message, {
                duration: 4000,
                progress: true,
                position: "top-right",
                transition: "bounceIn",
                icon: "",
                sound: true,
            });
            refreshTable && refreshTable();
        } else {
            showToast.error(deleted.message, {
                duration: 4000,
                progress: true,
                position: "top-right",
                transition: "bounceIn",
                icon: "",
                sound: true,
            });
        }
    };

    return (
        <td className="whitespace-nowrap px-4 py-4">
            <button className="mr-2 inline-flex size-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-indigo-600 shadow-sm hover:border-indigo-200 hover:bg-indigo-50">
                <UserPlus onClick={updateEmpClicked} />
            </button>
            <button className="mr-2 inline-flex size-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-rose-600 shadow-sm hover:border-rose-200 hover:bg-rose-50">
                <Delete onClick={deleteEmp} />
            </button>
            <button className="inline-flex size-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-sky-600 shadow-sm hover:border-sky-200 hover:bg-sky-50">
                <Link href={`/employee-details/${employeeId}`} className="inline-flex size-full items-center justify-center">
                    <Eye />
                </Link>
            </button>
        </td>
    );
};

export default RenderActionButtons;
