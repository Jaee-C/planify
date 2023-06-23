import React from "react";
import { TextField, styled } from "@mui/material";

const StyledFormField = styled(TextField)(() => ({
  "& .MuiOutlinedInput-root": {
    color: "rgb(54, 65, 82)",
    background: "rgb(248, 250, 252)",
    borderRadius: 8,
    fontSize: "0.875rem",
    padding: 0,
  },
  "& .MuiOutlinedInput-input": {
    padding: "15.5px 14px",
    color: "rgb(18, 25, 38)",
    fontWeight: 500,
  },
  "& .MuiInputLabel-root": {
    fontSize: "0.875rem",
  },
  "&.Mui-focused": {
    color: "rgb(33, 150, 243)",
  },
}));

export interface FormTextFieldProps {
  name: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  multiline?: boolean;
  rows?: string | number;
  value?: Array<string | number | boolean> | string | number | boolean;
  size?: "small" | "medium";
  onChange?: (a: React.ChangeEvent) => void;
  error?: boolean;
  helperText?: string | false;
}

export default function FormTextField({
  name,
  label,
  placeholder = undefined,
  disabled,
  multiline,
  rows,
  value,
  size,
  onChange,
  error,
  helperText,
}: FormTextFieldProps): JSX.Element {
  return (
    <>
      <StyledFormField
        fullWidth
        placeholder={placeholder}
        type="text"
        multiline={multiline}
        rows={rows}
        label={label}
        value={value}
        disabled={disabled}
        name={name}
        size={size}
        onChange={onChange}
        error={error}
        helperText={helperText}
        variant="outlined"
      />
    </>
  );
}

FormTextField.defaultProps = {
  disabled: false,
  multiline: false,
  rows: 4,
  placeholder: " ",
  size: "small",
};
