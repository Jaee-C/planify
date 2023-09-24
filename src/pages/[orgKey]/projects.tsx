import React from "react";
import Head from "next/head";

import ProjectsPage from "@/components/Projects";

export default function Projects(): JSX.Element {
  return (
    <>
      <Head>
        <title>Planify: Projects</title>
      </Head>
      <ProjectsPage />
    </>
  );
}
