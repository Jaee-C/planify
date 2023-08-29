import { FormEvent, useState } from "react";
import { useRouter } from "next/router";
import AppError from "@/server/service/AppError";
import RegisterFormData from "./RegisterFormData";
import { UNKNOWN_ERROR } from "@/lib/client-data/errors";

import { Button, TextField } from "@/core/ui";
import { blue } from "@mui/material/colors";

import styles from "../LoginGateway/login.module.css";
import { Alert } from "@mui/material";

export default function AccountCreationForm(): JSX.Element {
  const router = useRouter();
  const [error, setError] = useState<AppError | null>(null);

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    const data = new RegisterFormData(event.currentTarget);

    if (!data.isValid()) {
      setError(new AppError(UNKNOWN_ERROR, "Invalid form data"));
      return;
    }

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: data.toString(),
    });
    if (res.status === 200) {
      await router.push("/api/auth/signin");
    } else {
      const json = await res.json();
      if (json.code && json.message) {
        setError(new AppError(json.code, json.message));
      }
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Alert
        severity="error"
        className={`mb-2 ${error === null && "hidden"}`}
        hidden={error === null}>
        {error?.message}
      </Alert>
      <div className="flex gap-1.5">
        <TextField
          type="text"
          label="First Name"
          name="firstName"
          className={styles.textField}
        />
        <TextField
          type="text"
          label="Last Name"
          name="lastName"
          className={styles.textField}
        />
      </div>
      <TextField
        type="text"
        label="Email"
        name="email"
        placeholder="Enter an email"
        fullWidth
        className={styles.textField}
      />
      <TextField
        type="password"
        label="Password"
        name="password"
        placeholder="Enter a password"
        fullWidth
        className={styles.textField}
      />
      <TextField
        type="password"
        label="Confirm Password"
        placeholder="Re-enter your password"
        fullWidth
        className={styles.textField}
      />
      <Button
        variant="contained"
        hoverColor={blue[600]}
        type="submit"
        fullWidth>
        Sign Up
      </Button>
    </form>
  );
}
