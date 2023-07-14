import React from "react";
import { Menu, MenuItem, Sidebar, useProSidebar } from "react-pro-sidebar";
import { GoChecklist } from "react-icons/go";
import { FaBarsStaggered, FaTrello } from "react-icons/fa6";
import { Button } from "@mui/material";
import SidebarHeader from "@/components/SideNavigationBar/SidebarHeader";
import { PageType } from "@/lib/types";
import colors from "tailwindcss/colors";
import { IconContext } from "react-icons";
import { verifyUrlParam } from "@/lib/utils";
import { useRouter } from "next/router";
import Link from "next/link";

interface SideNavigationProps {
  currentPage?: PageType;
}

export default function SideNavigation(
  props: SideNavigationProps
): JSX.Element {
  const { collapseSidebar } = useProSidebar();
  const router = useRouter();
  const { pKey } = router.query;
  const projectKey: string = verifyUrlParam(pKey);

  return (
    <IconContext.Provider value={{ className: "shared-class", size: "14px" }}>
      <Sidebar width="200px" transitionDuration={200} breakPoint="sm">
        <div
          style={{ display: "flex", flexDirection: "column", height: "100%" }}>
          <div style={{ flex: 1, marginBottom: "32px", padding: "8px" }}>
            <SidebarHeader>Issue Tracker</SidebarHeader>
            <Menu
              menuItemStyles={{
                button: ({ level, active, disabled }) => {
                  // only apply styles on first level elements of the tree
                  if (level === 0)
                    return {
                      color: active ? colors.blue[700] : colors.neutral[700],
                      backgroundColor: active ? colors.blue[100] : undefined,
                      fontSize: "0.75rem",
                      padding: "6px 10px",
                      borderRadius: "4px",
                      fontWeight: 500,
                    };
                },
              }}>
              <MenuItem
                icon={<FaBarsStaggered />}
                active={props.currentPage === PageType.BACKLOG}
                component={
                  <Link
                    href={{
                      pathname: `/[pKey]/backlog`,
                      query: { pKey: projectKey },
                    }}
                  />
                }>
                Backlog
              </MenuItem>
              <MenuItem
                icon={<FaTrello />}
                active={props.currentPage === PageType.BOARD}
                component={
                  <Link
                    href={{
                      pathname: `/[pKey]/board`,
                      query: { pKey: projectKey },
                    }}
                  />
                }>
                Board
              </MenuItem>
              <MenuItem icon={<GoChecklist />}> Issues</MenuItem>
            </Menu>
          </div>
          <div style={{ paddingBottom: "20px" }}>
            <Button onClick={() => collapseSidebar()}>Collapse</Button>
          </div>
        </div>
      </Sidebar>
    </IconContext.Provider>
  );
}
