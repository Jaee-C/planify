import { Button } from "@/components/primitives";

import styles from "./login.module.css";
import { FaApple, FaGithub, FaGoogle } from "react-icons/fa6";

export default function SocialLogin(): JSX.Element {
  return (
    <div className={styles.socialsContainer}>
      <div className={styles.socialsDividerText}>Or continue with:</div>
      <Button
        variant="outlined"
        startIcon={<FaGoogle />}
        fullWidth
        className={styles.socialButton}>
        Google
      </Button>
      <Button
        variant="outlined"
        startIcon={<FaApple />}
        fullWidth
        className={styles.socialButton}>
        Apple
      </Button>
      <Button
        variant="outlined"
        startIcon={<FaGithub />}
        fullWidth
        className={styles.socialButton}>
        Github
      </Button>
    </div>
  );
}
