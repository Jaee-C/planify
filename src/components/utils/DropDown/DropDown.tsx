import React, { useState } from "react";
import { Button, Menu, styled } from "@mui/material";

import { BsChevronDown } from "react-icons/bs";
import colors from "tailwindcss/colors";

const DropDownButton = styled(Button)(() => ({
  color: colors.gray[500],
  fontWeight: 400,
  fontSize: "11px",
  minWidth: 0,
  flexShrink: 0,
  "&:hover": {
    backgroundColor: colors.gray[200],
  },
}));

interface DropDownProps {
  disabled?: boolean;
  buttonLabel?: string;
  buttonAriaLabel?: string;
  buttonClassName: string;
  buttonIcon?: React.ReactNode;
}

/**
 * Button component that triggers a dropdown menu
 */
export default function DropDown(
  props: { buttonClassName?: string } & DropDownProps & React.PropsWithChildren
): JSX.Element {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (): void => {
    setAnchorEl(null);
  };

  return (
    <>
      <DropDownButton
        className={props.buttonClassName}
        disabled={props.disabled}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        endIcon={<BsChevronDown />}
        startIcon={props.buttonIcon}
        disableRipple>
        {props.buttonLabel}
      </DropDownButton>
      <Menu
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        transitionDuration={0}
        className="rounded">
        {props.children}
      </Menu>
    </>
  );
}
