import React from "react";
import TopNavBar from "@/components/TopNavBar";

import styles from "./styles.module.css";

export default function Layout(props: React.PropsWithChildren): JSX.Element {
  return (
    <>
      <TopNavBar />
      <section className={styles.content}>{props.children}</section>
    </>
  );
}
