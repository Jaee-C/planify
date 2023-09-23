import React from "react";
import { useRouter } from "next/router";
import { verifyUrlParam } from "@/lib/utils";

import NavButton from "./NavButton";

import styles from "./styles.module.css";
import { constructHrefWithOrg as getHref } from "@/components/utils";

export default function SettingsSidebar(): JSX.Element {
  const router = useRouter();
  const { orgKey } = router.query;
  const organisation: string = verifyUrlParam(orgKey);

  return (
    <section className={styles.sidebar}>
      <div className={styles.buttonsContainer}>
        <NavButton href={getHref(organisation, "/settings")} active={true}>
          Users
        </NavButton>
        <NavButton href={getHref(organisation, "/settings")}>Details</NavButton>
        <NavButton href={getHref(organisation, "/settings")}>
          Settings
        </NavButton>
      </div>
    </section>
  );
}
