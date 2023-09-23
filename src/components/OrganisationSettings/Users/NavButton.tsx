import React from "react";
import Link from "next/link";

import styles from "./button.module.css";

interface Props extends React.PropsWithChildren {
  href: string;
  active?: boolean;
  disabled?: boolean;
}

export default function NavButton(props: Props): JSX.Element {
  const { active = false, disabled = false } = props;
  return (
    <div className={constructStyles(active, disabled)}>
      <Link href={props.href}>{props.children}</Link>
    </div>
  );
}

function constructStyles(active: boolean, disabled: boolean): string {
  let result = styles.navButton;

  if (active) {
    result += " " + styles.active;
  }

  if (disabled) {
    result += " " + styles.disabled;
  }

  return result;
}
