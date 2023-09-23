import React from "react";

import TopNavBar from "@/components/TopNavBar";
import SettingsSidebar from "./Sidebar";

import styles from "./styles.module.css";

export default function _layout(props: React.PropsWithChildren): JSX.Element {
  return (
    <div className={styles.layout}>
      <TopNavBar />
      <SettingsSidebar />
      <section className={styles.content}>{props.children}</section>
    </div>
  );
}
