import { PropsWithChildren } from "react";

import styles from "./Placeholder.module.css";

export default function Placeholder(props: PropsWithChildren): JSX.Element {
  return <div className={styles.placeholderRoot}>{props.children}</div>;
}
