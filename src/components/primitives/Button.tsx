import Button from "@mui/material/Button";
import { styled } from "@mui/material";

interface MyButtonProps {
  customColor?: string;
  hoverColor?: string;
}

const MyButton = styled(Button, {
  shouldForwardProp: prop => prop !== "customColor" && prop !== "hoverColor",
})<MyButtonProps>(({ customColor, theme, hoverColor }) => ({
  // Base styles
  "&.MuiButton-root": {
    borderRadius: "3px",
    fontWeight: 600,
    textAlign: "center",
  },
  // variant="contained"
  "&.MuiButton-contained": {
    backgroundColor: `${
      customColor ? customColor : theme.palette.primary.main
    }`,
  },
  "&.MuiButton-contained:hover": {
    backgroundColor: hoverColor,
  },

  // variant="outlined"
  "&.MuiButton-outlined": {
    fontWeight: "bold",
    color: "#42526E",
    backgroundColor: "white",
    border: "1px solid rgb(193, 199, 208)",
    "&:hover": {
      background: "rgba(9, 30, 66, 0.02)",
    },
  },
}));

export default MyButton;
