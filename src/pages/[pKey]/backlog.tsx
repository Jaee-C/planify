import React from "react";
import { ProSidebarProvider } from "react-pro-sidebar";

import BaseSidebar from "@/components/SideNavigationBar/BaseSidebar";
import TopNavigation, {
  NavigationPage,
} from "@/components/TopNavigation/TopNavigation";
import BacklogContent from "@/components/Backlog";

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
          <BacklogContent />
        </div>
      </ProSidebarProvider>
    </>
  );
}
