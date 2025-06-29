import { IconButton } from "@mui/material";
import { CircleX } from "lucide-react";
import React from "react";

interface ModalProps {
  title: string;
  content: React.ReactNode;
  onClose: () => void;
  size?: "sm" | "md" | "lg" | "xl";
}

export default function Modal({
  title,
  content,
  onClose,
  size = "md",
}: ModalProps) {
  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-3">
      <div
        className={`bg-white relative rounded-xl shadow-lg w-full ${sizeClasses[size]} max-h-[90vh] overflow-hidden flex flex-col`}
      >
        <div className="flex-shrink-0 p-3 border-b">
          <IconButton
            onClick={onClose}
            className="!absolute top-2 rtl:left-4 ltr:right-4 text-gray-500 hover:text-red-500"
          >
            <CircleX className="hover:text-red-700" />
          </IconButton>

          <h3 className="text-xl font-bold text-[rgba(0,109,119,1)] ">
            {title}
          </h3>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-2">{content}</div>
      </div>
    </div>
  );
}
