import "react";
import { MdOutlineSettings, MdAccountCircle } from "react-icons/md";
import Link from "next/link";
import { useRouter } from "next/router";
import { verifyUrlParam } from "@/lib/utils";

import styles from "./styles.module.css";
import { constructHrefWithOrg } from "@/components/utils";

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
      <div className={styles.icons}>
        <Link href={constructHrefWithOrg(organisation, "/settings")}>
          <MdOutlineSettings size={24} />
        </Link>
        <Link href={"#"}>
          <MdAccountCircle size={24} />
        </Link>
      </div>
    </nav>
  );
}
