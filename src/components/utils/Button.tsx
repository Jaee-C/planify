import React, { MouseEventHandler } from "react";

interface ButtonProp {
  children: React.ReactNode;
  onClick: MouseEventHandler;
}

/**
 * React component for a basic button.
 * @param children
 * @param onClick - event handler on mouse click
 * @constructor
 */
export default function Button({ children, onClick }: ButtonProp): JSX.Element {
  return (
    <a href="#" onClick={onClick}>
      {children}
    </a>
  );
}
