import React from "react";
import Select, { MultiValue } from "react-select";

interface OptionType {
  label: string;
  value: string | number;
}

interface MultiSelectFieldProps {
  label?: string;
  name: string;
  type?: string; // if "searchable", enable search
  options: OptionType[];
  value: MultiValue<OptionType>;
  onChange: (selected: MultiValue<OptionType>) => void;
  error?: { message?: string } | string;
}

const MultiSelectField = ({
  label,
  name,
  type = "text",
  options,
  value,
  onChange,
  error,
}: MultiSelectFieldProps) => {
  const errorMessage = typeof error === "string" ? error : error?.message;
  const isSearchable = type === "searchable";

  return (
    <div className="md:col-span-2">
      {label && (
        <label className="mb-2 block text-sm font-medium">{label}</label>
      )}

      {errorMessage && (
        <p className="mb-1 text-sm text-red-500">{errorMessage}</p>
      )}

      <Select<OptionType, true>
        isMulti
        isSearchable={isSearchable}
        name={name}
        options={options}
        value={value}
        onChange={onChange}
        className={`react-select-container ${
          error ? "border-red-500" : "border-gray-300"
        }`}
        classNamePrefix="react-select"
        styles={{
          control: (base) => ({
            ...base,
            borderColor: error ? "#ef4444" : "#d1d5db",
            boxShadow: "none",
            "&:hover": { borderColor: error ? "#ef4444" : "#9ca3af" },
            borderRadius: "0.375rem",
            padding: "2px",
            minHeight: "38px",
          }),
          multiValue: (base) => ({
            ...base,
            backgroundColor: "#e5e7eb",
          }),
          multiValueLabel: (base) => ({
            ...base,
            color: "#374151",
          }),
        }}
      />
    </div>
  );
};

export default MultiSelectField;
