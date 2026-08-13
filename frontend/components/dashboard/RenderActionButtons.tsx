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
        <td>
            <button>
                <UserPlus onClick={updateEmpClicked} />
            </button>
            <button>
                <Delete onClick={deleteEmp} />
            </button>
            <button>
                <Link href={`/employee-details/${employeeId}`}>
                    <Eye />
                </Link>
            </button>
        </td>
    );
};

export default RenderActionButtons;
