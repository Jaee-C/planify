import React from "react";

import SettingsHeader from "./SettingsHeader";

import settingsStyles from "./settings.module.css";

interface Props {
  title: string;
}

export default function Layout(
  props: Props & React.PropsWithChildren
): JSX.Element {
  return (
    <div className={settingsStyles.pageContainer}>
      <SettingsHeader title={props.title} />
      {props.children}
    </div>
  );
}
