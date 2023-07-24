"use client";

import { FormEvent } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";

import { Button, TextField } from "@/components/primitives";
import { blue } from "@mui/material/colors";

import styles from "./login.module.css";
import { Alert } from "@mui/material";

export default function CredentialsForm(): JSX.Element {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const onSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    const res = await signIn("credentials", {
      redirect: false,
      username: event.currentTarget.username.value,
      password: event.currentTarget.password.value,
      callbackUrl,
    });

    if (!res?.error) {
      router.push(callbackUrl);
    } else {
      console.error(res.error);
    }
  };

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <TextField
        placeholder="Enter your username"
        name="username"
        type="text"
        fullWidth
        className={styles.textField}
      />
      <TextField
        placeholder="Enter your password"
        name="password"
        type="password"
        fullWidth
        className={styles.textField}
      />
      <Button
        variant="contained"
        hoverColor={blue[600]}
        type="submit"
        fullWidth>
        Log In
      </Button>
    </form>
  );
}
