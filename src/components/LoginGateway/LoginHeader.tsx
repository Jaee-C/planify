import styles from "./login.module.css";

export default function LoginHeader(): JSX.Element {
  return (
    <header>
      <h3 className={styles.headerText}>Login to continue</h3>
    </header>
  );
}
