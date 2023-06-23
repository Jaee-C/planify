import React from "react";
import { ProSidebarProvider } from "react-pro-sidebar";

import BaseSidebar from "@/components/Sidebar/BaseSidebar";
import TopNavigation from "@/components/TopNavigation/TopNavigation";
import Backlog from "@/components/Backlog";
import ProjectsPage from "@/components/Projects";

/**
 * Entrypoint page for the application.
 * @constructor
 */
export default function Home(): JSX.Element {
  return (
    <>
      <TopNavigation />
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
