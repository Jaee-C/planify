import "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Card, styled } from "@mui/material";
import ProjectTable from "@/components/Projects/ProjectTable";

const queryClient: QueryClient = new QueryClient();

const StyledCard = styled(Card)({
  "& .Mui-Card-Root": {
    boxShadow: "0px",
  },
});

export default function ProjectsPage(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="p-5 flex-grow bg-slate-100 w-28">
        <StyledCard
          className="p-4 py-2.5 rounded-xl shadow-none mt-6"
          raised={false}>
          <ProjectTable />
        </StyledCard>
      </div>
    </QueryClientProvider>
  );
}
