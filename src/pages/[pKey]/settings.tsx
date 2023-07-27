import Head from "next/head";
import { Details, SettingsSidebar } from "@/components/ProjectSettings";
import { ProSidebarProvider } from "react-pro-sidebar";
import { queryClient } from "@/lib/client-data/query";
import { QueryClientProvider } from "react-query";

export default function Settings(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <title>Planify: Settings</title>
      </Head>
      <ProSidebarProvider>
        <div
          style={{
            display: "flex",
            height: "95vh",
            minHeight: "400px",
            maxWidth: "100%",
          }}>
          <SettingsSidebar />
          <Details />
        </div>
      </ProSidebarProvider>
    </QueryClientProvider>
  );
}
