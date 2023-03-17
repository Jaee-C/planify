import React from 'react';
import {
  FormControl,
  Input,
  InputLabel,
  ListItem,
  MenuItem,
  Select,
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
  defaultValue?: Options;
  options: Options[];
}

export default function FormSelectField({
  name,
  label,
  disabled,
  multiselect,
  defaultValue,
  options,
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
        >
          {options.map((o: Options) => (
            <MenuItem key={o.value} value={o.value}>
              {o.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </ListItem>
  );
}

FormSelectField.defaultProps = {
  disabled: false,
  multiselect: false,
};
