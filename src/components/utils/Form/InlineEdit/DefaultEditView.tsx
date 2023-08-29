import { TextField, TextFieldProps } from "@mui/material";

export default function DefaultEditView(props: TextFieldProps): JSX.Element {
  return (
    <TextField
      {...props}
      sx={[
        {
          "& .MuiOutlinedInput-input": {
            padding: "8px 6px",
          },
        },
      ]}
    />
  );
}
