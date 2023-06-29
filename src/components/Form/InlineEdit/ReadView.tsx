/** @jsxImportSource @emotion/react */
import React, { useRef } from "react";

import { css, jsx, SerializedStyles } from "@emotion/react";

const readViewContainerStyles = css({
  lineHeight: 1,
});

/*
  As inline edit allows for a custom input component, styling of `ReadViewContainer` needs to be shipped with the component.
  This keeps `editView` and `readView` components aligned when switching between the two. In this particular case, these
  styles ensure `readView` is in sync with the TextField.
  */
const readViewContainerStyles2 = css({
  display: "flex",
  maxWidth: "100%",
  padding: "8px 6px",
  fontSize: "1rem",
  lineHeight: 1,
  wordBreak: "break-word",
  border: "2px solid transparent",
});

const editButtonStyles: SerializedStyles = css({
  display: "block",
  margin: "0px",
  padding: "0px",
  appearance: "none",
  background: "transparent",
  border: 0,
  lineHeight: 1,
  outline: "0",
  "&:focus + div": {
    border: `2px solid #4C9AFF`,
  },
});

const readViewWrapperStyles: SerializedStyles = css({
  display: "inline-block",
  boxSizing: "border-box",
  width: "auto",
  maxWidth: "100%",
  border: "2px solid transparent",
  borderRadius: "5px",
  transition: "background 0.2s",
  "&:hover": {
    background: "#EBECF0",
  },
});

const readViewFitContainerWidthStyles: SerializedStyles = css({
  width: "100%",
});

const DRAG_THRESHOLD = 5;

interface ReadViewProps {
  editButtonLabel: string;
  onEditRequested: () => void;
  postReadViewClick: () => void;
  editButtonRef: React.RefObject<HTMLButtonElement>;
  readViewFitContainerWidth?: boolean;
  editValue?: string;
}

const ReadView = ({
  editButtonLabel,
  onEditRequested,
  postReadViewClick,
  editButtonRef,
  readViewFitContainerWidth,
  editValue,
}: ReadViewProps): JSX.Element => {
  const startX = useRef(0);
  const startY = useRef(0);

  const mouseHasMovedAfterMouseDown = (event: {
    clientX: number;
    clientY: number;
  }): boolean => {
    return (
      Math.abs(startX.current - event.clientX) >= DRAG_THRESHOLD ||
      Math.abs(startY.current - event.clientY) >= DRAG_THRESHOLD
    );
  };

  const onReadViewClick = (
    event: React.MouseEvent<HTMLButtonElement | HTMLDivElement>
  ): void => {
    const element = event.target as HTMLElement;
    /** If a link is clicked in the read view, default action should be taken */
    if (
      element.tagName.toLowerCase() !== "a" &&
      !mouseHasMovedAfterMouseDown(event)
    ) {
      event.preventDefault();
      onEditRequested();
      postReadViewClick();
    }
  };

  return (
    <div css={readViewContainerStyles}>
      <button
        css={editButtonStyles}
        aria-label={editButtonLabel}
        type="button"
        onClick={onEditRequested}
        ref={editButtonRef}
      />
      <div
        css={[
          readViewWrapperStyles,
          readViewFitContainerWidth && readViewFitContainerWidthStyles,
        ]}
        onClick={onReadViewClick}
        onMouseDown={(e): void => {
          startX.current = e.clientX;
          startY.current = e.clientY;
        }}
        data-read-view-fit-container-width={readViewFitContainerWidth}>
        <div css={readViewContainerStyles2}>
          {editValue || "Click to enter a value"}
        </div>
      </div>
    </div>
  );
};

export default ReadView;
