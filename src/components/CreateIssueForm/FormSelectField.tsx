import React from 'react';
import {
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  ListItem,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';

interface Options {
  label: any;
  value: string;
}

interface FormSelectFieldProps {
  name: string;
  label: string;
  placeholder?: string;
  disabled?: boolean;
  multiselect?: boolean;
  defaultValue?: string;
  options: Options[];
  onChange?: (a: SelectChangeEvent) => void;
  value?: string;
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
}: FormSelectFieldProps) {
  return (
    <ListItem className="pr-4">
      <FormControl className="w-full">
        <InputLabel shrink>{label}</InputLabel>
        <Select
          input={<Input name={name} />}
          multiple={multiselect}
          disabled={disabled}
          defaultValue={defaultValue}
          onChange={onChange}
          value={value}
          error={error}
        >
          {options.map((o: Options) => (
            <MenuItem key={o.value} value={o.value}>
              {o.label}
            </MenuItem>
          ))}
        </Select>
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    </ListItem>
  );
}

FormSelectField.defaultProps = {
  disabled: false,
  multiselect: false,
};
