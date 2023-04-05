import React from 'react';
import {InputAdornment, TextField, ListItem} from '@mui/material';

import {MdCreate} from 'react-icons/md';

interface FormTextFieldProps {
  name: string;
  label: string;
  placeholder?: string;
  disabled?: boolean;
  multiline?: boolean;
  rows?: string | number;
  value?: Array<string | number | boolean> | string | number | boolean;
  size?: 'small' | 'medium';
  onChange?: (a: React.ChangeEvent) => void;
  error?: boolean;
  helperText?: string | false;
}

export default function FormTextField({
  name,
  label,
  placeholder,
  disabled,
  multiline,
  rows,
  value,
  size,
  onChange,
  error,
  helperText,
}: FormTextFieldProps) {
  const lowerlabel = label.toLowerCase();
  placeholder = placeholder || `Please insert the ${lowerlabel} here...`;

  return (
    <ListItem className="pr-4">
      <TextField
        fullWidth
        placeholder={placeholder}
        type="text"
        multiline={multiline}
        rows={rows}
        label={label}
        InputLabelProps={{shrink: true}}
        value={value}
        disabled={disabled}
        name={name}
        size={size}
        onChange={onChange}
        error={error}
        helperText={helperText}
        variant="standard"
        InputProps={{
          endAdornment: (
            <InputAdornment
              position="end"
              className="self-center cursor-pointer"
            >
              <MdCreate
                fontSize="small"
                style={{color: '#757575', alignSelf: 'center'}}
              />
            </InputAdornment>
          ),
        }}
      />
    </ListItem>
  );
}

FormTextField.defaultProps = {
  disabled: false,
  multiline: false,
  rows: 4,
  placeholder: ' ',
  size: 'small',
};
