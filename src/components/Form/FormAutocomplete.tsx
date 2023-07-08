import { Autocomplete, styled } from "@mui/material";

interface FormAutocompleteProps {
  hideToggle?: boolean;
}

const FormAutocomplete = styled(Autocomplete, {
  shouldForwardProp: (prop: PropertyKey): boolean => prop !== "hideToggle",
})<FormAutocompleteProps>(({ hideToggle }) => ({
  "& .MuiAutocomplete-inputRoot": {
    padding: "2px 39px 2px 6px",
    "& fieldset": {
      borderWidth: 0,
    },
    "&:hover, &:target": {
      backgroundColor: "#EBECF0",
    },
  },
  "& .MuiAutocomplete-input": {
    cursor: "default",
    padding: 0,
  },
  "& .MuiAutocomplete-endAdornment": {
    display: hideToggle ? "none" : "block",
  },
}));

export default FormAutocomplete;
