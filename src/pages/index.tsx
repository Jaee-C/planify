import React from "react";
import { ProSidebarProvider } from "react-pro-sidebar";
import { QueryClient, QueryClientProvider } from "react-query";

import BaseSidebar from "@/components/Sidebar/BaseSidebar";
import TopNavigation from "@/components/TopNavigation/TopNavigation";
import BacklogWrapper from "@/components/BacklogWrapper";

const queryClient: QueryClient = new QueryClient();

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
          <QueryClientProvider client={queryClient}>
            <div className="p-5 flex-grow bg-slate-100 w-28">
              <BacklogWrapper />
            </div>
          </QueryClientProvider>
        </div>
      </ProSidebarProvider>
    </>
  );
}
