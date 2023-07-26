"use client";

import { MenuItem } from "react-pro-sidebar";
import { SidebarDivider } from "@/core/ui";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { useRouter } from "next/router";
import Link from "next/link";
import { verifyUrlParam } from "@/lib/utils";

export default function ReturnToProject(): JSX.Element {
  const router = useRouter();
  const projectKey = verifyUrlParam(router.query.pKey);
  return (
    <>
      <MenuItem
        icon={<BsFillArrowLeftCircleFill />}
        component={<Link href={{ pathname: `/${projectKey}/backlog` }} />}>
        Back
      </MenuItem>
      <SidebarDivider />
    </>
  );
}
