import Head from "next/head";
import { QueryClient, QueryClientProvider } from "react-query";

import Layout from "./_layout";
import NewUserForm from "./_newUserForm";
import UsersTable from "./_usersTable";

import styles from "./styles.module.css";
import { Alert } from "@mui/material";
import React from "react";

const queryClient = new QueryClient();

export default function Settings(): JSX.Element {
  const [alert, setAlert] = React.useState<string>("");
  const [error, setError] = React.useState<string>("");
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Head>
          <title>Settings</title>
        </Head>
        <div className={styles.usersContent}>
          <h1>Users</h1>
          {alert.length > 0 ? (
            <Alert severity="success" onClose={() => setAlert("")}>
              {alert}
            </Alert>
          ) : null}
          {error.length > 0 ? (
            <Alert severity="error" onClose={() => setError("")}>
              {error}
            </Alert>
          ) : null}
          <NewUserForm setAlert={setAlert} />
          <UsersTable setAlert={setError} />
        </div>
      </Layout>
    </QueryClientProvider>
  );
}
