import "react";
import { QueryClient, QueryClientProvider } from "react-query";
import BacklogTable from "@/components/Backlog/BacklogTable";

const queryClient: QueryClient = new QueryClient();

export default function BacklogContent(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="p-10 flex-grow w-28">
        <BacklogTable />
      </div>
    </QueryClientProvider>
  );
}
