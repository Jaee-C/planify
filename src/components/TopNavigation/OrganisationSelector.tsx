import React from "react";

import styles from "./styles.module.css";

interface Organisation {
  id: number;
  name: string;
  key: string;
}

export default function OrganisationSelector(): JSX.Element {
  const [current, setCurrent] = React.useState<string>("");
  const [organisations, setOrganisations] = React.useState<Organisation[]>([]);

  React.useEffect(() => {
    const orgs = [
      {
        id: 1,
        name: "Default",
        key: "def",
      },
      {
        id: 2,
        name: "Home",
        key: "hom",
      },
    ];

    setOrganisations(orgs);
    setCurrent("def");
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    console.log("Switch to " + e.target.value);
  };

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
