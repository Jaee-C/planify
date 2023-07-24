import SocialLogin from "@/components/LoginGateway/SocialLogin";
import RegisterHeader from "./RegisterHeader";
import AccountCreationForm from "./AccountCreationForm";
import RegisterHelp from "./RegisterHelp";

import styles from "../LoginGateway/login.module.css";

export default function RegisterPage(): JSX.Element {
  return (
    <div className={styles.loginContainer}>
      <RegisterHeader />
      <AccountCreationForm />
      <SocialLogin />
      <RegisterHelp />
    </div>
  );
}
