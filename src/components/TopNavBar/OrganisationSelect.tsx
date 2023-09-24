import React from "react";
import { queryOrganisations } from "@/lib/client-data/query";
import { useRouter } from "next/router";
import { verifyUrlParam } from "@/lib/utils";

export default function OrganisationSelect(): JSX.Element {
  const { data, status } = queryOrganisations();
  const router = useRouter();
  const { orgKey } = router.query;
  const organisation: string = verifyUrlParam(orgKey);

  if (status === "loading" && data === undefined) {
    return <div>...</div>;
  } else if (data === undefined) {
    return <></>;
  }

  const changeOrganisation = (e: React.ChangeEvent<HTMLSelectElement>) => {
    router.push(`/${e.target.value}/projects`);
  };

  return (
    <select value={organisation} onChange={changeOrganisation}>
      {data.map(org => (
        <option key={org.id} value={org.key}>
          {org.name}
        </option>
      ))}
    </select>
  );
}
