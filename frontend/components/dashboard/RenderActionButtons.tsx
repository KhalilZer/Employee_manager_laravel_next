import { Delete, Eye, UserPlus } from "@deemlol/next-icons";

type Props = {
    employeeId: number;
    updateEmpClicked: () => void;
};
const RenderActionButtons = ({ employeeId, updateEmpClicked }: Props) => {
    return (
        <td>
            <button>
                <UserPlus onClick={updateEmpClicked} />
            </button>
            <button>
                <Delete />
            </button>
            <button>
                <Eye />
            </button>
        </td>
    );
};

export default RenderActionButtons;
