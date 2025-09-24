import type { StylesConfig } from "react-select";

const primaryColor = "oklch(24.398% 0.10759 261.329)";

const customStyles: StylesConfig = {
  control: (provided) => ({
    ...provided,
    minHeight: "36px",
    maxWidth: "300px",
    overflow: "hidden",
    borderColor: "var(--border)",
    borderRadius: 8,
    fontSize: "14px",
    lineHeight: 1,
  }),
  multiValue: (provided) => ({
    ...provided,
    flex: "0 0 auto", // Prevent flex-grow
    marginRight: "4px",
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    whiteSpace: "nowrap",
    lineHeight: 1,
  }),
  valueContainer: (provided) => ({
    ...provided,
    display: "flex",
    flexWrap: "nowrap", // prevent wrapping
    overflowX: "auto",
    gap: "4px",
    padding: "0px 12px",
    "::-webkit-scrollbar": { display: "none" },
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? primaryColor
      : state.isFocused
        ? "#e6f0ff"
        : "white",
    color: state.isSelected ? "white" : "black",
    ":hover": { backgroundColor: state.isSelected ? primaryColor : "#f0f8ff" },
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    padding: "6px 8px 6px 3px",
  }),
  clearIndicator: (provided) => ({
    ...provided,
    padding: "0px",
  }),
  menu: (provided) => ({
    ...provided,
    zIndex: 10000,
  }),
  placeholder: (provided) => ({
    ...provided,
    whiteSpace: "nowrap",
  }),
};

export default customStyles;
