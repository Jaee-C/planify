import React from "react";

import Form from "./Form";

import styles from "./details.module.css";

export default function Content(): JSX.Element {
  return (
    <div className={styles.container}>
      <div>
        <h3>CONTENT</h3>
        <Form />
      </div>
    </div>
  );
}
