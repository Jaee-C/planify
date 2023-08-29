"use client";

import React, { FormEvent } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";

import { Button, TextField } from "@/core/ui";
import { blue } from "@mui/material/colors";

import styles from "./login.module.css";
import { Alert } from "@mui/material";

export default function CredentialsForm(): JSX.Element {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const [serverError, setServerError] = React.useState<string | null>(null);

  const onSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    const res = await signIn("credentials", {
      redirect: false,
      email: event.currentTarget.email.value,
      password: event.currentTarget.password.value,
      callbackUrl,
    });

    if (!res?.error) {
      router.push(callbackUrl);
    } else {
      handleError(res.status);
    }
  };

  const handleError = (status: number): void => {
    if (status === 401) {
      setServerError("Invalid credentials");
    } else {
      setServerError("Something went wrong");
    }
  };

  const displayError = (): React.ReactNode | null => {
    if (!serverError) return null;

    return (
      <Alert severity="error" onClose={() => setServerError(null)}>
        {serverError}
      </Alert>
    );
  };

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      {displayError()}
      <TextField
        placeholder="Enter your email"
        name="email"
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
