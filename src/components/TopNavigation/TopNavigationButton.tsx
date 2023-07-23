import React, { MouseEventHandler } from "react";
import Link from "next/link";

interface TopNavButtonProps {
  children: React.ReactNode;
  href: string;
  active: boolean;
}

export const borderClassNames = "border-b-black";

/**
 * React component for a button in the top navigation bar
 * @param children
 * @param onClick - event handler for a mouse click
 * @param active - whether the button is in an active state (e.g. it is clicked)
 * @constructor
 */
export default function TopNavigationButton({
  children,
  href,
  active,
}: TopNavButtonProps): JSX.Element {
  return (
    <div
      className={
        "mx-1 flex items-center justify-center flex-col h-full" +
        " border-4 border-transparent " +
        (active ? borderClassNames : "")
      }>
      <div className="px-2 py-1.5 rounded-md hover:bg-neutral-500/30">
        <Link href={href}>{children}</Link>
      </div>
    </div>
  );
}
