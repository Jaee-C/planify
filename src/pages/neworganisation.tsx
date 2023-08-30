import Head from "next/head";
import React from "react";
import CreateOrganisation from "@/components/CreateOrganisation";

export default function NewOrganisation(): JSX.Element {
  return (
    <>
      <Head>
        <title>Create Organisation</title>
      </Head>
      <CreateOrganisation />
    </>
  );
}
