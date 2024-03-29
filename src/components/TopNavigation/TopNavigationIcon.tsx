import React, { MouseEventHandler } from "react";
import RoundButton from "../utils/RoundButton";
import Link from "next/link";

interface NavigationIconProp {
  icon: React.ReactNode;
  onClick?: MouseEventHandler;
  link?: string;
}

/**
 * React component for Icon Button on the top navigation bar.
 *
 * @param icon - A react-icons component, acts as the icon for the button
 * @param onClick - event handler for a mouse click on the button
 * @returns Icon button component
 */
export default function TopNavigationIcon({
  icon,
  onClick,
  link,
}: NavigationIconProp): JSX.Element {
  return (
    <RoundButton className="mr-2" onClick={onClick}>
      <Link href={link ? link : "#"}>{icon}</Link>
    </RoundButton>
  );
}
