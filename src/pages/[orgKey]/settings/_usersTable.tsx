import { useQuery } from "react-query";
import styles from "@/pages/[orgKey]/settings/styles.module.css";
import NewTable, { TableRow } from "@/components/NewTable";
import { useRouter } from "next/router";
import { verifyUrlParam } from "@/lib/utils";
import { getAllUsersInOrganisation } from "@/lib/client-data/users";

export default function UsersTable(): JSX.Element {
  const router = useRouter();
  const { orgKey } = router.query;
  const organisation: string = verifyUrlParam(orgKey);
  const { data, status } = useQuery(["users", organisation], () =>
    getAllUsersInOrganisation(organisation)
  );

  if (status !== "success" && data === undefined) {
    return <div>Loading...</div>;
  }

  if (data === undefined) {
    return <div>Something went wrong.</div>;
  }

  return (
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
          {data.map((user, i) => (
            <TableRow key={i}>
              <td>{user.email}</td>
              <td>Active</td>
              <td>Edit, Delete</td>
            </TableRow>
          ))}
        </tbody>
      </NewTable>
    </div>
  );
}
