import { XCircle } from "@deemlol/next-icons";
import React from "react";

type Props = {
    onClose: () => void;
    children: React.ReactNode;
};
const Modal = ({ children, onClose }: Props) => {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-slate-950/60 p-4 backdrop-blur-sm sm:p-6 [&>div]:my-auto [&>div]:w-full [&>div]:max-w-2xl">
            <button className="fixed right-5 top-5 z-[110] inline-flex size-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white shadow-lg backdrop-blur-md hover:scale-105 hover:bg-white hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white" onClick={onClose}>
                <XCircle />
            </button>
            {children}
        </div>
    );
};

export default Modal;
