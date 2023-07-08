/** @jsxImportSource @emotion/react */
import { css, jsx } from "@emotion/react";

import Button from "@mui/material/Button";
import { MdDone, MdClose } from "react-icons/md";

import React from "react";

const inlineEditButtonStyles = {
  minWidth: "32px",
  backgroundColor: "transparent",
};

const buttonsContainerStyles = css({
  display: "flex",
  marginTop: "6px",
  position: "absolute",
  top: "100%",
  right: 0,
  flexShrink: 0,
});

const buttonWrapperElevationDarkStyles = css({
  boxShadow:
    "0 4px 8px -2px rgba(13, 20, 36, 0.85), 0 0 1px rgba(13, 20, 36, 0.81)",
});

const buttonWrapperElevationLightStyles = css({
  boxShadow:
    "0 4px 8px -2px rgba(9, 30, 66, 0.25), 0 0 1px rgba(9, 30, 66, 0.31)",
});

const buttonWrapperBaseStyles = css({
  boxSizing: "border-box",
  width: "32px",
  zIndex: 200,
  backgroundColor: "#FFFFFF",
  borderRadius: "3px",
  fontSize: "1rem",
  "&:last-child": {
    marginLeft: "4px",
  },
});

interface ButtonsProp {
  confirmButtonLabel: string;
  cancelButtonLabel: string;
  onMouseDown: () => void;
  onCancelClick: (event: React.MouseEvent<HTMLElement>) => void;
  mode?: string;
}
const Buttons = ({
  mode = "light",
  confirmButtonLabel,
  cancelButtonLabel,
  onMouseDown,
  onCancelClick,
}: ButtonsProp): JSX.Element => {
  return (
    <div css={buttonsContainerStyles}>
      <div
        css={[
          buttonWrapperBaseStyles,
          mode === "light"
            ? buttonWrapperElevationLightStyles
            : buttonWrapperElevationDarkStyles,
        ]}>
        <Button
          sx={inlineEditButtonStyles}
          aria-label={confirmButtonLabel}
          type="submit"
          onMouseDown={onMouseDown}>
          <MdDone />
        </Button>
      </div>
      <div
        css={[
          buttonWrapperBaseStyles,
          mode === "light"
            ? buttonWrapperElevationLightStyles
            : buttonWrapperElevationDarkStyles,
        ]}>
        <Button
          sx={inlineEditButtonStyles}
          aria-label={cancelButtonLabel}
          onClick={onCancelClick}
          onMouseDown={onMouseDown}>
          <MdClose />
        </Button>
      </div>
    </div>
  );
};

export default Buttons;
