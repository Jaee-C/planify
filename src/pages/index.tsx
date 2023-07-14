import React from "react";

import ProjectsPage from "@/components/Projects";
import TopNavigation, {
  NavigationPage,
} from "@/components/TopNavigation/TopNavigation";
import { ProSidebarProvider } from "react-pro-sidebar";
import SideNavigation from "@/components/SideNavigationBar/SideNavigation";

export default function Projects(): JSX.Element {
  return (
    <>
      <TopNavigation activePage={NavigationPage.HOME} />
      <ProSidebarProvider>
        <div
          style={{
            display: "flex",
            height: "95vh",
            minHeight: "400px",
            maxWidth: "100%",
          }}>
          <ProjectsPage />
        </div>
      </ProSidebarProvider>
    </>
  );
}
