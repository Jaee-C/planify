import { Button, styled } from "@mui/material";
import colors from "tailwindcss/colors";

const ToolbarButton = styled(Button)(() => ({
  color: colors.gray[500],
  fontWeight: 400,
  fontSize: "18px",
  padding: "8px",
  border: 0,
  display: "flex",
  borderRadius: "10px",
  cursor: "pointer",
  verticalAlign: "middle",
  marginRight: "2px",
  minWidth: 0,
  "&:hover": {
    backgroundColor: colors.gray[200],
  },
}));

export default ToolbarButton;
