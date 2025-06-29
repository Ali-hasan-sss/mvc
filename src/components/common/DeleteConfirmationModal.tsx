import React from "react";
import Modal from "./modal";
import { CircularProgress } from "@mui/material";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
  loadingText?: string;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Yes, Delete",
  cancelText = "Cancel",
  loading = false,
  loadingText = "Deleting...",
}) => {
  if (!isOpen) return null;

  return (
    <Modal
      title={title}
      onClose={onClose}
      content={
        <div className="p-4 space-y-4">
          <p>{message}</p>
          <div className="flex justify-end gap-3">
            <button
              onClick={onConfirm}
              disabled={loading}
              className="bg-red-600 text-white px-4 py-2 rounded disabled:opacity-50 flex items-center gap-2"
            >
              {loading ? (
                <>
                  <CircularProgress size={20} color="inherit" />
                  {loadingText}
                </>
              ) : (
                confirmText
              )}
            </button>
            <button
              onClick={onClose}
              className="bg-gray-300 text-gray-900 px-4 py-2 rounded"
              disabled={loading}
            >
              {cancelText}
            </button>
          </div>
        </div>
      }
    />
  );
};

export default DeleteConfirmationModal;
