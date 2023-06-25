import React from "react";
import { ProSidebarProvider } from "react-pro-sidebar";

import BaseSidebar from "@/components/Sidebar/BaseSidebar";
import TopNavigation, {
  NavigationPage,
} from "@/components/TopNavigation/TopNavigation";
import BacklogContent from "@/components/Backlog";
import { NextRouter, useRouter } from "next/router";

/**
 * Entrypoint page for the application.
 * @constructor
 */
export default function BacklogPage(): JSX.Element {
  const router: NextRouter = useRouter();
  const project: string | undefined = Array.isArray(router.query.pid)
    ? router.query.pid[0]
    : router.query.pid;

  return (
    <>
      <TopNavigation activePage={NavigationPage.BACKLOG} />
      <ProSidebarProvider>
        <div
          style={{
            display: "flex",
            height: "95vh",
            minHeight: "400px",
            maxWidth: "100%",
          }}>
          <BaseSidebar />
          <BacklogContent project={project} />
        </div>
      </ProSidebarProvider>
    </>
  );
}
