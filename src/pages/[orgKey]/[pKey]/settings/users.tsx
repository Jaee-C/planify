import React from "react";
import Head from "next/head";
import {
  SettingPages,
  SettingsSidebar,
  Users,
} from "@/components/ProjectSettings";
import { ProSidebarProvider } from "react-pro-sidebar";
import { queryClient } from "@/lib/client-data/query";
import { QueryClientProvider } from "react-query";

export default function UsersPage(): JSX.Element {
  return (
    <>
      <Head>
        <title>Planify: Users</title>
      </Head>
      <QueryClientProvider client={queryClient}>
        <ProSidebarProvider>
          <div
            style={{
              display: "flex",
              height: "95vh",
              minHeight: "400px",
              maxWidth: "100%",
            }}>
            <SettingsSidebar activePage={SettingPages.Users} />
            <Users />
          </div>
        </ProSidebarProvider>
      </QueryClientProvider>
    </>
  );
}
