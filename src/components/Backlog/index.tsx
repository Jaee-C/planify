import "react";
import { QueryClient, QueryClientProvider } from "react-query";
import BacklogTable from "@/components/Backlog/BacklogTable";
import { Card } from "@mui/material";
import { ProjectContext } from "./ProjectContext";

interface BacklogProps {
  project?: string;
}

const queryClient: QueryClient = new QueryClient();

export default function Backlog(props: BacklogProps): JSX.Element {
  const projectNum: number = props.project ? parseInt(props.project) : -1;

  return (
    <QueryClientProvider client={queryClient}>
      <div className="p-5 flex-grow bg-slate-100 w-28">
        <Card className="p-4 py-2.5 rounded-xl shadow-none mt-6" raised={false}>
          <ProjectContext.Provider value={projectNum}>
            <BacklogTable />
          </ProjectContext.Provider>
        </Card>
      </div>
    </QueryClientProvider>
  );
}
