import styles from "../LoginGateway/login.module.css";

export default function RegisterHelp(): JSX.Element {
  return (
    <div className={styles.helpContainer}>
      <a href="/auth/signin">Already have an account? Log in</a>
    </div>
  );
}
