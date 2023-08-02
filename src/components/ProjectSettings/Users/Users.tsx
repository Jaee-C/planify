import React from "react";

import Layout from "../Layout";
import AddMemberForm from "@/components/ProjectSettings/Users/AddMemberForm";
import MembersList from "@/components/ProjectSettings/Users/MembersList";

export default function Users(): JSX.Element {
  return (
    <Layout title="Users">
      <AddMemberForm />
      <MembersList />
    </Layout>
  );
}
