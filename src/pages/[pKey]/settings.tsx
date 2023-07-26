import Head from "next/head";
import { Details, SettingsSidebar } from "@/components/ProjectSettings";
import { ProSidebarProvider } from "react-pro-sidebar";

export default function Settings(): JSX.Element {
  return (
    <>
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
    </>
  );
}
