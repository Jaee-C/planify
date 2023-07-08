import React from "react";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  styled,
} from "@mui/material";

interface Options {
  label: any;
  value: string | number;
}

const StyledFormField = styled(Select)(() => ({
  "& .MuiInputBase-input": {
    padding: "15.5px 14px",
    color: "rgb(18, 25, 38)",
    backgroundColor: "rgb(248, 250, 252)",
    fontWeight: 500,
    borderRadius: 8,
    fontSize: "0.875rem",
  },
  "&.MuiInputBase-root": {
    borderRadius: "8px",
  },
  "& .MuiInputLabel-root": {
    fontSize: "0.875rem",
  },
  "&.Mui-focused": {
    color: "rgb(33, 150, 243)",
  },
}));

interface FormSelectFieldProps {
  name: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  multiselect?: boolean;
  defaultValue?: string;
  options: Options[];
  onChange?: (a: SelectChangeEvent<unknown>, child: React.ReactNode) => void;
  value?: string | number;
  error?: boolean;
  helperText?: string | false;
}

export default function FormSelectField({
  name,
  label,
  disabled,
  multiselect,
  defaultValue,
  options,
  onChange,
  value,
  error,
  helperText,
}: FormSelectFieldProps): JSX.Element {
  return (
    <FormControl variant="outlined" fullWidth className="rounded-lg">
      <InputLabel id={`form-${label}-label`} shrink>
        {label}
      </InputLabel>
      <StyledFormField
        labelId={`form-${label}-label`}
        name={name}
        multiple={multiselect}
        disabled={disabled}
        defaultValue={defaultValue}
        onChange={onChange}
        value={value}
        error={error}
        label={label}>
        {options.map((o: Options) => (
          <MenuItem key={o.value} value={o.value} selected={o.value === value}>
            {o.label}
          </MenuItem>
        ))}
      </StyledFormField>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
}

FormSelectField.defaultProps = {
  disabled: false,
  multiselect: false,
};
