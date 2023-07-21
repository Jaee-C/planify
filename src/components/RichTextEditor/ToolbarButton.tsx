import { Button, ButtonProps, styled } from "@mui/material";
import colors from "tailwindcss/colors";
import { PropsWithChildren } from "react";

const StyledButton = styled(Button)(() => ({
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

export default function ToolbarButton(
  props: { className?: string } & ButtonProps & PropsWithChildren
): JSX.Element {
  return (
    <StyledButton {...props} disableRipple className={props.className}>
      {props.children}
    </StyledButton>
  );
}
