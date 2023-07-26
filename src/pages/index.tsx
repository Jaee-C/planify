import React from "react";
import Head from "next/head";

import ProjectsPage from "@/components/Projects";
import TopNavigation, {
  NavigationPage,
} from "@/components/TopNavigation/TopNavigation";
import { ProSidebarProvider } from "react-pro-sidebar";

export default function Projects(): JSX.Element {
  return (
    <>
      <Head>
        <title>Planify</title>
      </Head>
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
