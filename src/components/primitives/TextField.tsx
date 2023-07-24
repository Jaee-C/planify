import { styled } from "@mui/material";
import TextField from "@mui/material/TextField";

const MyTextField = styled(TextField)(({ theme }) => ({
  "& input": {
    fontSize: "14px",
    backgroundColor: "transparent",
    fontWeight: 400,
  },
  "& fieldset": {
    borderRadius: "3px",
    border: "2px solid #DFE1E6",
  },
  "&:hover fieldset": {
    border: "2px solid #DFE1E6 !important",
  },
  "&.Mui-focused fieldset, & .Mui-focused:hover fieldset": {
    border: `2px solid ${theme.palette.primary.main} !important`,
  },

  "&:hover input": {
    backgroundColor: `${theme.palette.grey[200]}`,
  },
  "&.Mui-focused input, & .Mui-focused:hover input": {
    backgroundColor: "transparent",
  },

  // Label
  "& .MuiInputLabel-root": {
    fontSize: "14px",
  },
}));

MyTextField.defaultProps = {
  ...MyTextField.defaultProps,
  size: "small",
};

export default MyTextField;
