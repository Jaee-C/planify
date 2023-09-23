import React from "react";

import styles from "./styles.module.css";

export default function TableRow(props: React.PropsWithChildren): JSX.Element {
  return <tr className={styles.tableRow}>{props.children}</tr>;
}
