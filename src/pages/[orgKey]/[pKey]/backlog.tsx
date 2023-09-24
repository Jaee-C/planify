import React from "react";
import Head from "next/head";
import { ProSidebarProvider } from "react-pro-sidebar";

import BacklogContent from "@/components/Backlog";
import SideNavigation from "@/components/SideNavigationBar/SideNavigation";
import { PageType } from "@/lib/types";
import TopNavBar from "@/components/TopNavBar";
import { queryClient } from "@/lib/client-data/query";
import { QueryClientProvider } from "react-query";

export default function BacklogPage(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <title>Planify: Backlog</title>
      </Head>
      <TopNavBar />
      <div style={{ marginTop: "52px" }}>
        <ProSidebarProvider>
          <div
            style={{
              display: "flex",
              height: "95vh",
              minHeight: "400px",
              maxWidth: "100%",
            }}>
            <SideNavigation currentPage={PageType.BACKLOG} />
            <BacklogContent />
          </div>
        </ProSidebarProvider>
      </div>
    </QueryClientProvider>
  );
}
