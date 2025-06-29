import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import axiosInstance from "../../utils/axios";

interface FileUploaderProps {
  onUpload: (data: { fileName: string; fileUrl: string }) => void;
  onUploadingChange: (isUploading: boolean) => void;
  initialFileName?: string;
  initialFileUrl?: string;
}

const isImage = (fileName: string) => {
  return /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(fileName);
};

const FileUploader: React.FC<FileUploaderProps> = ({
  onUpload,
  onUploadingChange,
  initialFileName,
  initialFileUrl,
}) => {
  const { t } = useTranslation();
  const [fileName, setFileName] = useState<string | null>(
    initialFileName || null
  );
  const [fileUrl, setFileUrl] = useState<string | null>(initialFileUrl || null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    isImage(initialFileName || "") ? initialFileUrl || null : null
  );
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialFileName && initialFileUrl) {
      setFileName(initialFileName);
      setFileUrl(initialFileUrl);
      if (isImage(initialFileName)) {
        setPreviewUrl(initialFileUrl);
      }
    }
  }, [initialFileName, initialFileUrl]);

  const handleFile = async (file: File) => {
    setError(null);
    setIsUploading(true);
    onUploadingChange(true);
    setFileName(file.name);
    setPreviewUrl(null);
    setFileUrl(null);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axiosInstance.post("/admin/uploadFile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const { file: fileUrl, fileName } = res.data.data;
      setFileUrl(fileUrl);
      setFileName(fileName);
      console.log("inuploaderdata:", fileName, fileUrl);
      onUpload({ fileName: fileName, fileUrl: fileUrl });
      if (isImage(fileName)) {
        setPreviewUrl(fileUrl);
      }
    } catch (e: unknown) {
      const error = e as { message?: string };
      setError(error.message || t("messages.operation_failed"));
    } finally {
      setIsUploading(false);
      onUploadingChange(false);
    }
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  return (
    <div>
      <div
        onDrop={onDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => inputRef.current?.click()}
        style={{
          border: "2px dashed #aaa",
          borderRadius: 8,
          padding: 24,
          textAlign: "center",
          cursor: "pointer",
          background: "#fafafa",
          position: "relative",
        }}
      >
        {isUploading && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(255,255,255,0.7)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 2,
            }}
          >
            <div
              className="spinner"
              style={{
                width: 32,
                height: 32,
                border: "4px solid #ccc",
                borderTop: "4px solid #333",
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
              }}
            />
          </div>
        )}
        {!fileUrl && !isUploading && (
          <>
            <p>{t("forms.upload_image")}</p>
          </>
        )}
        {fileUrl && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {previewUrl ? (
              <img
                src={previewUrl}
                alt={fileName || ""}
                style={{
                  maxWidth: 120,
                  maxHeight: 120,
                  marginBottom: 8,
                  borderRadius: 8,
                }}
              />
            ) : (
              <>
                <svg width="48" height="48" fill="gray" viewBox="0 0 24 24">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zm4 16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h7v5h5z" />
                </svg>
                <div style={{ fontSize: 14, marginTop: 4 }}>{fileName}</div>
              </>
            )}
          </div>
        )}
        <input
          type="file"
          ref={inputRef}
          style={{ display: "none" }}
          onChange={onChange}
        />
      </div>
      {error && <div style={{ color: "red", marginTop: 8 }}>{error}</div>}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default FileUploader;
