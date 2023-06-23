import React from "react";
import { ProSidebarProvider } from "react-pro-sidebar";

import BaseSidebar from "@/components/Sidebar/BaseSidebar";
import TopNavigation, {
  NavigationPage,
} from "@/components/TopNavigation/TopNavigation";
import Backlog from "@/components/Backlog";

/**
 * Entrypoint page for the application.
 * @constructor
 */
export default function BacklogPage(): JSX.Element {
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
          <Backlog />
        </div>
      </ProSidebarProvider>
    </>
  );
}
