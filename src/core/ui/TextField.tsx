import { styled } from "@mui/material";
import TextField from "@mui/material/TextField";

const MyTextField = styled(TextField)(({ theme }) => ({
  // Base styles
  "& .MuiOutlinedInput-root": {
    "& > fieldset": {
      borderRadius: "3px",
      border: "2px solid #DFE1E6",
    },
    "& > input": {
      padding: "6px 10px",
      fontSize: "0.85rem",
      fontWeight: 400,
      backgroundColor: "#FAFBFC",
    },
  },

  // Hover
  "& .MuiOutlinedInput-root:hover": {
    "& > fieldset": {
      border: "2px solid #DFE1E6",
    },
    "& > input": {
      backgroundColor: "#efefef",
    },
  },

  // Focused
  "& .MuiOutlinedInput-root.Mui-focused": {
    "& > fieldset": {
      border: `2px solid ${theme.palette.primary.main}`,
    },
    "& > input": {
      backgroundColor: "white",
    },
  },

  "&.Mui-focused input, & .Mui-focused:hover input": {
    backgroundColor: "transparent",
  },

  // Error
  "& .MuiOutlinedInput-root.Mui-error": {
    "& > fieldset": {
      borderColor: theme.palette.error.main,
    },
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
