import React from "react";

import SettingsHeader from "../SettingsHeader";
import Content from "./Content";

import settingsStyles from "../settings.module.css";

export default function Details(): JSX.Element {
  return (
    <div className={settingsStyles.pageContainer}>
      <SettingsHeader title="Details" />
      <Content />
    </div>
  );
}
