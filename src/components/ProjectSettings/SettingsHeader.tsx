import React from "react";

import styles from "./settings.module.css";

interface SettingsHeaderProps {
  title: string;
}

export default function SettingsHeader(
  props: SettingsHeaderProps
): JSX.Element {
  return (
    <div className={styles.header}>
      <h1>{props.title}</h1>
    </div>
  );
}
