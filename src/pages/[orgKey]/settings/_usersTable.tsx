import { useRouter } from "next/router";
import { useMutation, useQuery, useQueryClient } from "react-query";

import NewTable, { TableRow } from "@/components/NewTable";
import { verifyUrlParam } from "@/lib/utils";
import { getAllUsersInOrganisation, removeUser } from "@/lib/client-data/users";

import styles from "./styles.module.css";

export default function UsersTable(): JSX.Element {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { orgKey } = router.query;
  const organisation: string = verifyUrlParam(orgKey);
  const deleteUser = useMutation(
    (email: string) => removeUser(organisation, email),
    {
      onSuccess: () => queryClient.invalidateQueries(["users", organisation]),
      onError: error => console.log(error),
    }
  );
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
              <td>
                Edit,{" "}
                <button
                  onClick={(): void => deleteUser.mutate(user.email)}
                  className={styles.actionButton}>
                  Delete
                </button>
              </td>
            </TableRow>
          ))}
        </tbody>
      </NewTable>
    </div>
  );
}
