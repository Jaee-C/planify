import { Button } from "@/core/ui";

import styles from "./login.module.css";
import { FaApple, FaGithub, FaGoogle } from "react-icons/fa6";

export default function SocialLogin(): JSX.Element {
  return (
    <div className={styles.socialsContainer}>
      <div className={styles.socialsDividerText}>
        More login methods to be added soon...
      </div>
      <Button
        variant="outlined"
        startIcon={<FaGoogle />}
        fullWidth
        disabled
        className={styles.socialButton}>
        Google
      </Button>
      <Button
        variant="outlined"
        startIcon={<FaApple />}
        fullWidth
        disabled
        className={styles.socialButton}>
        Apple
      </Button>
      <Button
        variant="outlined"
        startIcon={<FaGithub />}
        fullWidth
        disabled
        className={styles.socialButton}>
        Github
      </Button>
    </div>
  );
}
