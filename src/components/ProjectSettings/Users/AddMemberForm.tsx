"use client";

import { Button, TextField } from "@/core/ui";

import styles from "./users.module.css";

export default function AddMemberForm(): JSX.Element {
  return (
    <form>
      <h3>Add a User</h3>
      <div className={styles.formControl}>
        <TextField name="username" label="Username" />
        <Button type="submit" variant="contained">
          Add
        </Button>
      </div>
    </form>
  );
}
