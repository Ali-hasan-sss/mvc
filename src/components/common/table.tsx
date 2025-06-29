import React, { useEffect, useState } from "react";
import api from "@/utils/axios";
import { IconButton, styled, Switch, Tooltip } from "@mui/material";
import { useTranslation } from "react-i18next";

import clsx from "clsx";
import { Edit, Eye, Trash } from "lucide-react";

// CSS Animation for loading bar
const loadingAnimation = `
  @keyframes loading {
    0% { width: 0%; }
    100% { width: 100%; }
  }
`;

interface Column {
  id: string;
  label: string;
}

interface DynamicTableProps {
  title: string;
  xloading?: boolean;
  onAdd?: () => void;
  columns: Column[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: Record<string, any>[];
  apiUrl?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onView?: (row: Record<string, any>) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onEdit?: (row: Record<string, any>) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onDelete?: (row: Record<string, any>) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onToggleActive?: (row: Record<string, any>) => void;
}
const CustomSwitch = styled(Switch)(({}) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: "#4ade80", // اللون عند التشغيل (لون المقبض)
    "& + .MuiSwitch-track": {
      backgroundColor: "#4ade80", // لون الخلفية عند التشغيل
    },
  },
  "& .MuiSwitch-switchBase": {
    color: "#ef4444", // اللون عند الإطفاء (لون المقبض)
    "& + .MuiSwitch-track": {
      backgroundColor: "#ef4444", // لون الخلفية عند الإطفاء
    },
  },
}));
const Table: React.FC<DynamicTableProps> = ({
  title,
  columns,
  xloading,
  data,
  apiUrl,
  onAdd,
  onView,
  onEdit,
  onDelete,
  onToggleActive,
}) => {
  const { t } = useTranslation();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [fetchedData, setFetchedData] = useState<Record<string, any>[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!data && apiUrl) {
      setLoading(true);
      api
        .get(apiUrl)
        .then((res) => {
          setFetchedData(res.data);
          setError(null);
        })
        .catch((err) => {
          console.error("Error fetching data:", err);
          setError(t("messages.network_error"));
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [apiUrl, data, t]);

  const rows = data || fetchedData;
  const hasActions = onView || onEdit || onDelete;

  return (
    <div className="relative overflow-x-auto rounded-xl border border-gray-200 ">
      <style>{loadingAnimation}</style>
      <div className="w-full flex items-center justify-between p-2 ">
        <h2 className="text-2xl font-bold ">{title}</h2>
        {onAdd && (
          <button
            onClick={onAdd}
            className="py-1 cursor-pointer text-white px-3 rounded-lg bg-red-700 hover:bg-red-600"
          >
            + {t("admin.add_new")}
          </button>
        )}
      </div>

      {loading || xloading ? (
        <div className="w-full bg-gray-100 h-1 overflow-hidden">
          <div
            className="bg-red-700 h-1 transition-all duration-1000 ease-in-out"
            style={{
              width: "0%",
              animation: "loading 2s ease-in-out infinite",
            }}
          ></div>
        </div>
      ) : null}

      {error && !rows.length ? (
        <div className="p-4 text-center text-red-500">{error}</div>
      ) : (
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
          <thead className="bg-gray-100 ">
            <tr>
              <th className="px-6 py-3">#</th>
              {columns.map((column) => (
                <th key={column.id} className="px-6 py-3">
                  {column.label}
                </th>
              ))}
              {hasActions && (
                <th className="px-6 py-3 text-center">{t("admin.actions")}</th>
              )}
            </tr>
          </thead>

          <tbody>
            {rows.map((row, rowIndex) => {
              const rowClasses = clsx(
                rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50 ",
                "border-b  hover:bg-gray-100  transition"
              );

              return (
                <tr key={rowIndex} className={rowClasses}>
                  <td className="px-6 py-4 font-bold">{rowIndex + 1}</td>
                  {/* الترقيم */}
                  {columns.map((column) => (
                    <td key={column.id} className="px-6 py-4">
                      {column.id === "isActive" && onToggleActive ? (
                        <CustomSwitch
                          checked={row[column.id]}
                          onChange={() => onToggleActive(row)}
                        />
                      ) : column.id === "image" && row[column.id] ? (
                        <img
                          src={row[column.id]}
                          alt="image"
                          className="w-10 h-10 object-cover rounded"
                        />
                      ) : column.id === "title_ar" && row.title ? (
                        <div className="text-sm font-medium text-gray-900">
                          {row.title.ar || "N/A"}
                        </div>
                      ) : column.id === "title_en" && row.title ? (
                        <div className="text-sm text-gray-600">
                          {row.title.en || "N/A"}
                        </div>
                      ) : column.id === "description_ar" && row.description ? (
                        <div className="text-sm font-medium text-gray-900">
                          {row.description.ar || "N/A"}
                        </div>
                      ) : column.id === "description_en" && row.description ? (
                        <div className="text-sm text-gray-600">
                          {row.description.en || "N/A"}
                        </div>
                      ) : column.id === "sector_name" && row.sector_name ? (
                        <div className="text-sm font-medium text-gray-900">
                          {row.sector_name}
                        </div>
                      ) : column.id === "company_name" && row.company_name ? (
                        <div className="text-sm font-medium text-gray-900">
                          {row.company_name}
                        </div>
                      ) : column.id === "title" &&
                        typeof row[column.id] === "object" ? (
                        <div className="space-y-1">
                          <div className="text-sm font-medium text-gray-900">
                            <span className="text-blue-600">العربية:</span>{" "}
                            {row[column.id]?.ar || "N/A"}
                          </div>
                          <div className="text-sm text-gray-600">
                            <span className="text-green-600">English:</span>{" "}
                            {row[column.id]?.en || "N/A"}
                          </div>
                        </div>
                      ) : column.id === "description" &&
                        typeof row[column.id] === "object" ? (
                        <div className="space-y-1">
                          <div className="text-sm font-medium text-gray-900">
                            <span className="text-blue-600">العربية:</span>{" "}
                            {row[column.id]?.ar || "N/A"}
                          </div>
                          <div className="text-sm text-gray-600">
                            <span className="text-green-600">English:</span>{" "}
                            {row[column.id]?.en || "N/A"}
                          </div>
                        </div>
                      ) : typeof row[column.id] === "object" &&
                        row[column.id] !== null ? (
                        <div className="space-y-1">
                          <div className="text-sm font-medium text-gray-900">
                            <span className="text-blue-600">العربية:</span>{" "}
                            {row[column.id]?.ar || "N/A"}
                          </div>
                          <div className="text-sm text-gray-600">
                            <span className="text-green-600">English:</span>{" "}
                            {row[column.id]?.en || "N/A"}
                          </div>
                        </div>
                      ) : (
                        row[column.id]
                      )}
                    </td>
                  ))}

                  {hasActions && (
                    <td className="px-6 py-4 min-w-[150px] text-center space-x-1 space-x-reverse">
                      {onView && (
                        <Tooltip title={t("admin.view")}>
                          <IconButton onClick={() => onView(row)} size="small">
                            <Eye fontSize="small" className="text-blue-700" />
                          </IconButton>
                        </Tooltip>
                      )}
                      {onEdit && (
                        <Tooltip title={t("admin.edit")}>
                          <IconButton onClick={() => onEdit(row)} size="small">
                            <Edit
                              fontSize="small"
                              className="text-yellow-700"
                            />
                          </IconButton>
                        </Tooltip>
                      )}
                      {onDelete && (
                        <Tooltip title={t("admin.delete")}>
                          <IconButton
                            onClick={() => onDelete(row)}
                            size="small"
                            color="error"
                          >
                            <Trash fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      )}
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Table;
