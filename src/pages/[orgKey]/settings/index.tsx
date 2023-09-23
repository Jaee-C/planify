import Head from "next/head";
import { QueryClient, QueryClientProvider } from "react-query";

import Layout from "./_layout";
import NewUserForm from "./_newUserForm";
import UsersTable from "./_usersTable";

import styles from "./styles.module.css";

const queryClient = new QueryClient();

export default function Settings(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Head>
          <title>Settings</title>
        </Head>
        <div className={styles.usersContent}>
          <h1>Users</h1>
          <div style={{ height: "75px" }}>
            <NewUserForm />
          </div>
          <UsersTable />
        </div>
      </Layout>
    </QueryClientProvider>
  );
}
