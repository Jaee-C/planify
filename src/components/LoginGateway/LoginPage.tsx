import LoginHeader from "./LoginHeader";
import CredentialsForm from "./CredentialsForm";

import styles from "./login.module.css";
import SocialLogin from "./SocialLogin";
import AuthHelp from "./AuthHelp";

export default function LoginPage(): JSX.Element {
  return (
    <div className={styles.loginContainer}>
      <LoginHeader />
      <CredentialsForm />
      <SocialLogin />
      <AuthHelp />
    </div>
  );
}
