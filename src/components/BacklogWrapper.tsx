import "react";
import IssueTable from "@/components/IssueTable";
import { Card } from "@mui/material";

export default function BacklogWrapper(): JSX.Element {
  return (
    <Card className="p-4 py-2.5 rounded-xl shadow-none mt-6" raised={false}>
      <IssueTable />
    </Card>
  );
}
