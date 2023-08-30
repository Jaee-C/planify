import FormTextField from "@/components/utils/Form/FormTextField";
import React from "react";
import AppError from "@/server/service/AppError";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import styles from "./styles.module.css";
import { Button } from "@/core/ui";

export default function Form(): JSX.Element {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [error, setError] = React.useState<AppError | null>(null);

  const onSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    console.log(session);

    const form = new FormData(event.currentTarget);
    const data = {
      name: form.get("name") as string,
      key: form.get("key") as string,
      description: form.get("description") as string,
      user: session?.user.email,
    };

    const res = await fetch("/api/organisation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.status === 200) {
      router.push("/");
    } else {
      const json = await res.json();
      if (json.code && json.message) {
        setError(new AppError(json.code, json.message));
      }
    }
  };

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <form onSubmit={onSubmit}>
      <div className={styles.formEntry}>
        <FormTextField name="name" label="Organisation Name" />
      </div>
      <div className={styles.formEntry}>
        <FormTextField name="description" label="Description" />
      </div>

      <div className={styles.formEntry}>
        <FormTextField name="key" label="Key" />
      </div>

      <Button type="submit" variant="contained" fullWidth>
        Submit
      </Button>
    </form>
  );
}
