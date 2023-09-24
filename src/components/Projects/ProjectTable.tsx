import React from "react";
import Link from "next/link";
import { useQuery } from "react-query";
import { fetchProjectList } from "@/lib/client-data/projects";
import CreateProjectDialog from "@/components/Projects/CreateProjectDialog";
import { ProjectData } from "@/lib/types";
import { useRouter } from "next/router";
import { verifyUrlParam } from "@/lib/utils";
import NewTable, { TableRow } from "@/components/NewTable";
import { constructHrefWithOrg } from "@/components/utils";

import styles from "./styles.module.css";

export default function ProjectTable(): JSX.Element {
  const router = useRouter();
  const { orgKey } = router.query;
  const organisation: string = verifyUrlParam(orgKey);
  const { data, isLoading } = useQuery<ProjectData[]>(
    ["projects", organisation],
    () => fetchProjectList(organisation)
  );

  if (isLoading && data === undefined) {
    return <div>Loading ...</div>;
  } else if (data === undefined) {
    return <div>Something went wrong.</div>;
  }

  return (
    <>
      <NewTable>
        <thead>
          <TableRow>
            <th className={styles.nameColumn}>Name</th>
            <th className={styles.keyColumn}>Key</th>
            <th>Owner</th>
            <th className={styles.actionsColumn}>Actions</th>
          </TableRow>
        </thead>
        <tbody>
          {data.map((project: ProjectData, i: number) => (
            <TableRow key={i}>
              <td>
                <Link href={generateProjectLink(organisation, project)}>
                  {project.name}
                </Link>
              </td>
              <td>{project.key}</td>
              <td>{project.owner?.displayName ?? "No owner"}</td>
              <td>Edit • Delete</td>
            </TableRow>
          ))}
        </tbody>
      </NewTable>
      <CreateProjectDialog />
    </>
  );
}

function generateProjectLink(org: string, project: ProjectData): string {
  return constructHrefWithOrg(org, `/${project.key}/backlog`);
}
