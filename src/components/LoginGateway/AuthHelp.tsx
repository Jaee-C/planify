import React from "react";

import styles from "./login.module.css";

export default function AuthHelp(): JSX.Element {
  return (
    <div className={styles.helpContainer}>
      <ul>
        <li>
          <a href="#">Can't log in?</a>
        </li>
        <p>&#x2022;</p>
        <li>
          <a href="/auth/register">Create an account</a>
        </li>
      </ul>
    </div>
  );
}
