import React from "react";

import styles from "./styles.module.css";

export { default as TableRow } from "./TableRow";

export default function NewTable(props: React.PropsWithChildren): JSX.Element {
  return <table className={styles.table}>{props.children}</table>;
}
