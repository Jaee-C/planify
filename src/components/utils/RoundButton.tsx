import React, { MouseEventHandler } from "react";
import Button from "./Button";

interface RoundButtonProp {
  children: React.ReactNode;
  onClick: MouseEventHandler;
  className?: string;
}

/**
 * React component for a round button. Intended for use as an icon button.
 * @param children
 * @param onClick - event handler on mouse click
 * @param className - string containing additional class names the button
 * should have
 * @constructor
 */
export default function RoundButton({
  children,
  onClick,
  className,
}: RoundButtonProp): JSX.Element {
  const allClasses: string =
    "px-1 py-1 rounded-full hover:bg-neutral-500/30 " + className;
  return (
    <div className={allClasses}>
      <Button onClick={onClick}>{children}</Button>
    </div>
  );
}
