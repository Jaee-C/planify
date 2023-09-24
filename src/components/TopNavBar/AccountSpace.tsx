import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { MdAccountCircle, MdOutlineSettings } from "react-icons/md";
import { verifyUrlParam } from "@/lib/utils";
import { constructHrefWithOrg } from "@/components/utils";

import styles from "./styles.module.css";
import { Menu, MenuItem } from "@mui/material";
import { signOut } from "next-auth/react";

export default function AccountSpace(): JSX.Element {
  const router = useRouter();
  const { orgKey } = router.query;
  const organisation: string = verifyUrlParam(orgKey);

  // Account Menu
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    handleClose();
    await signOut();
  };

  return (
    <div className={styles.icons}>
      <Link href={constructHrefWithOrg(organisation, "/settings")}>
        <MdOutlineSettings size={24} />
      </Link>
      <button
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}>
        <MdAccountCircle size={24} />
      </button>
      <Menu open={open} onClose={handleClose} anchorEl={anchorEl}>
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
