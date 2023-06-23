import React from "react";

import ProjectsPage from "@/components/Projects";
import TopNavigation from "@/components/TopNavigation/TopNavigation";
import { ProSidebarProvider } from "react-pro-sidebar";
import BaseSidebar from "@/components/Sidebar/BaseSidebar";
import Backlog from "@/components/Backlog";

export default function Projects(): JSX.Element {
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
          <ProjectsPage />
        </div>
      </ProSidebarProvider>
    </>
  );
}
