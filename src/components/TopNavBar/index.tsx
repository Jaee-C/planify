import "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { verifyUrlParam } from "@/lib/utils";
import { constructHrefWithOrg } from "@/components/utils";
import AccountSpace from "./AccountSpace";

import styles from "./styles.module.css";

export default function TopNavBar(): JSX.Element {
  const router = useRouter();
  const { orgKey } = router.query;
  const organisation: string = verifyUrlParam(orgKey);

  return (
    <nav className={styles.navbarContainer}>
      <h1>
        <Link href={"/"}>Planify</Link>
      </h1>
      <ul className={styles.navigationLinks}>
        <li>
          <Link href={"/"}>Home</Link>
        </li>
        <li>
          <Link href={constructHrefWithOrg(organisation, "/projects")}>
            Projects
          </Link>
        </li>
      </ul>
      <AccountSpace />
    </nav>
  );
}
