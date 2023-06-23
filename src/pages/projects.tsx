import React from "react";

import ProjectsPage from "@/components/Projects";
import TopNavigation, {
  NavigationPage,
} from "@/components/TopNavigation/TopNavigation";
import { ProSidebarProvider } from "react-pro-sidebar";
import BaseSidebar from "@/components/Sidebar/BaseSidebar";

export default function Projects(): JSX.Element {
  return (
    <>
      <TopNavigation activePage={NavigationPage.PROJECTS} />
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
