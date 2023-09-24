import React, { createContext, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Button, Card } from "@mui/material";
import ProjectTable from "@/components/Projects/ProjectTable";
import { TableToolbar } from "@/components/NewTable";
import Layout from "./Layout";

const queryClient: QueryClient = new QueryClient();

export const CreateProjectContext = createContext({
  action: () => {},
  value: false,
});

export default function ProjectsPage(): JSX.Element {
  const [isCreatingProject, setCreatingProject] = useState<boolean>(false);

  const createProjectProps = {
    action: () => setCreatingProject(!isCreatingProject),
    value: isCreatingProject,
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <div className="p-5 flex-grow">
          <Card
            className="p-4 py-2.5 rounded-xl mt-6"
            sx={{ boxShadow: "none" }}
            raised={false}>
            <TableToolbar title={"Projects"}>
              <Button
                className="bg-blue-600 text-xs"
                variant="contained"
                onClick={createProjectProps.action}>
                Create&nbsp;Project
              </Button>
            </TableToolbar>
            <CreateProjectContext.Provider value={createProjectProps}>
              <ProjectTable />
            </CreateProjectContext.Provider>
          </Card>
        </div>
      </Layout>
    </QueryClientProvider>
  );
}
