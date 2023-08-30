import React from "react";
import Head from "next/head";
import Board from "@/components/Board";
import TopNavigation, {
  NavigationPage,
} from "@/components/TopNavigation/TopNavigation";
import { ProSidebarProvider } from "react-pro-sidebar";
import SideNavigation from "@/components/SideNavigationBar/SideNavigation";
import { PageType } from "@/lib/types";

export default function BoardPage(): JSX.Element {
  return (
    <>
      <Head>
        <title>Planify: Board</title>
      </Head>
      <TopNavigation activePage={NavigationPage.BACKLOG} />
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
    </>
  );
}
