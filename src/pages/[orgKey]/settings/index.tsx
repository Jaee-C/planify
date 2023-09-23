import Head from "next/head";
import NewTable, { TableRow } from "@/components/NewTable";
import Layout from "./_layout";

import styles from "./styles.module.css";

export default function Settings(): JSX.Element {
  return (
    <Layout>
      <Head>
        <title>Settings</title>
      </Head>
      <div className={styles.usersContent}>
        <h1>Users</h1>
        <div className={styles.table}>
          <NewTable>
            <thead className={styles.tableHeader}>
              <TableRow>
                <th className={styles.userColumn}>User</th>
                <th>Status</th>
                <th className={styles.actionsColumn}>Actions</th>
              </TableRow>
            </thead>
            <tbody className={styles.tableBody}>
              <TableRow>
                <td>user@test.mail</td>
                <td>Active</td>
                <td>Edit, Delete</td>
              </TableRow>
            </tbody>
          </NewTable>
        </div>
      </div>
    </Layout>
  );
}
