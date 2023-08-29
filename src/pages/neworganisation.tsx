import Head from "next/head";
import React from "react";
import { useSession } from "next-auth/react";
import AppError from "@/server/service/AppError";
import { redirect, useRouter } from "next/navigation";

export default function NewOrganisation(): JSX.Element {
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
    <>
      <Head>
        <title>Create Organisation</title>
      </Head>
      <form onSubmit={onSubmit}>
        <label htmlFor="org-name">Organisation Name</label>
        <input id="org-name" name="name" type="text" />

        <label htmlFor="org-description">Description</label>
        <input id="org-description" name="description" type="text" />

        <label htmlFor="org-key">Key</label>
        <input id="org-key" name="key" type="text" maxLength={10} />

        <button type="submit">Submit</button>
      </form>
    </>
  );
}
