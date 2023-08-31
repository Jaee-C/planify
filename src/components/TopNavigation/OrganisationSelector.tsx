import React from "react";
import { queryOrganisations } from "@/lib/client-data/query";
import Organisation from "@/lib/types/data/Organisation";

import styles from "./styles.module.css";
import { useRouter } from "next/router";
import { verifyUrlParam } from "@/lib/utils";

export default function OrganisationSelector(): JSX.Element {
  const router = useRouter();
  const [current, setCurrent] = React.useState<string>("");
  const { data: orgs, status } = queryOrganisations();
  const [organisations, setOrganisations] = React.useState<Organisation[]>([]);
  const { orgKey } = router.query;
  const organisation = verifyUrlParam(orgKey);

  React.useEffect(() => {
    if (orgs === undefined) {
      return;
    }
    console.log(orgs);
    setOrganisations(orgs);
    setCurrent(organisation);
  }, [orgs]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    console.log("Switch to " + e.target.value);
    router.push(`/${e.target.value}/projects`);
  };

  if (status === "loading") {
    return <div>loading...</div>;
  }

  return (
    <>
      <div className={styles.wrapper}>
        {organisations.length > 1 && current.length > 0 ? (
          <div className={styles.customSelect}>
            <select onChange={handleChange} defaultValue={current}>
              {organisations.map(org => (
                <option key={org.id} value={org.key}>
                  {org.name}
                </option>
              ))}
            </select>
            <span className="focus"></span>
          </div>
        ) : (
          <div>...</div>
        )}
      </div>
    </>
  );
}
