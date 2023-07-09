import "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Button, Card, styled } from "@mui/material";
import ProjectTable from "@/components/Projects/ProjectTable";
import { boolean } from "yup";
import { createContext, useState } from "react";
import TableToolbar from "@/components/Table/TableToolbar";

const queryClient: QueryClient = new QueryClient();

export const CreateProjectContext = createContext({
  action: () => {},
  value: false,
});

const StyledCard = styled(Card)({
  "& .Mui-Card-Root": {
    boxShadow: "0px",
  },
});

export default function ProjectsPage(): JSX.Element {
  const [isCreatingProject, setCreatingProject] = useState<boolean>(false);

  const createProjectProps = {
    action: () => setCreatingProject(!isCreatingProject),
    value: isCreatingProject,
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="p-5 flex-grow bg-slate-100 w-28">
        <StyledCard
          className="p-4 py-2.5 rounded-xl shadow-none mt-6"
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
        </StyledCard>
      </div>
    </QueryClientProvider>
  );
}
