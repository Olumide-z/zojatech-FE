import React, { useEffect, useState } from "react";
import { IoCheckmarkCircle, IoAlertCircle, IoClose } from "react-icons/io5";

export type ToastType = "success" | "error";

export interface ToastProps {
    id: string;
    title: string;
    description?: React.ReactNode;
    type: ToastType;
    onClose: (id: string) => void;
    duration?: number;
}

const Toast: React.FC<ToastProps> = ({ id, title, description, type, onClose, duration = 8000 }) => {
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            handleClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration]);

    const handleClose = () => {
        setIsExiting(true);
        setTimeout(() => {
            onClose(id);
        }, 200); // Wait for exit animation
    };

    const config = {
        success: {
            icon: <IoCheckmarkCircle className="text-(--success,#10B981)" size={22} />,
        },
        error: {
            icon: <IoAlertCircle className="text-(--error,#EF4444)" size={22} />,
        },
    };

    return (
        <div
            className={`
                flex items-start gap-3 px-5 py-4 w-full max-w-[400px] sm:w-auto sm:min-w-[360px]
                bg-[#0A0A0A] text-white rounded-[12px] shadow-2xl font-inter
                animate-in fade-in zoom-in-95 slide-in-from-bottom-4 lg:slide-in-from-right-8 duration-300
                ${isExiting ? "animate-out fade-out zoom-out-95 slide-out-to-bottom-4 lg:slide-out-to-right-8" : ""}
            `}
        >
            <div className="shrink-0 mt-px">{config[type].icon}</div>
            <div className="flex-1 flex flex-col gap-1.5 pt-px">
                <h4 className="text-[14px] font-semibold text-white tracking-wide">{title}</h4>
                {description && (
                    <div className="text-[14px] text-gray-300 leading-[1.6]">
                        {description}
                    </div>
                )}
            </div>
            <button
                onClick={handleClose}
                className="shrink-0 hover:bg-white/10 p-1 -mr-1 -mt-1 rounded-md transition-colors text-gray-400 hover:text-white cursor-pointer"
            >
                <IoClose size={20} />
            </button>
        </div>
    );
};

export default Toast;
