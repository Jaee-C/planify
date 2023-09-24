import React from "react";
import Head from "next/head";
import Board from "@/components/Board";
import { ProSidebarProvider } from "react-pro-sidebar";
import SideNavigation from "@/components/SideNavigationBar/SideNavigation";
import { PageType } from "@/lib/types";
import TopNavBar from "@/components/TopNavBar";
import { queryClient } from "@/lib/client-data/query";
import { QueryClientProvider } from "react-query";

export default function BoardPage(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <title>Planify: Board</title>
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
            <SideNavigation currentPage={PageType.BOARD} />
            <Board />
          </div>
        </ProSidebarProvider>
      </div>
    </QueryClientProvider>
  );
}
