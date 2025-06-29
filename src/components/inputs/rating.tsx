import Rating from "@mui/material/Rating";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface StarRatingInputProps {
  onChange: (value: number | null) => void;
}

export default function StarRatingInput({ onChange }: StarRatingInputProps) {
  const { t } = useTranslation();
  const [value, setValue] = useState<number | null>(0);

  const handleChange = (
    event: React.SyntheticEvent,
    newValue: number | null
  ) => {
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-gray-500">
        {t("suppliers.Add_Review")}
      </label>
      <Rating
        name="simple-controlled"
        value={value}
        onChange={handleChange}
        size="large"
        sx={{ color: "#f59e0b" }}
      />
    </div>
  );
}
