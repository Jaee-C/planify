import React from "react";

import Layout from "../Layout";
import Form from "./Form";

import styles from "./details.module.css";

export default function Details(): JSX.Element {
  return (
    <Layout title="Details">
      <div className={styles.container}>
        <Form />
      </div>
    </Layout>
  );
}
