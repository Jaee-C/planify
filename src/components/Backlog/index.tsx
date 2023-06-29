import "react";
import { QueryClient, QueryClientProvider } from "react-query";
import BacklogTable from "@/components/Backlog/BacklogTable";
import { createContext, useState, Context } from "react";
import InlineEditForm from "@/components/Backlog/InlineEditForm";
import { Grid } from "@mui/material";

const queryClient: QueryClient = new QueryClient();

type SidebarEditContextTypes = (id: number | string) => void;

export const SidebarEditContext = createContext<SidebarEditContextTypes>(
  (id: number | string): void => {}
);

export default function BacklogContent(): JSX.Element {
  const [isEditing, setEditing] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<number>(0);

  const handleEdit = (id: number | string): void => {
    setEditing(true);
    setEditingId(Number(id));
  };

  const handleClose = (): void => {
    setEditing(false);
    setEditingId(0);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="max-w-full h-auto max-h-full overflow-x-hidden flex-row flex-shrink flex pl-10 flex-grow">
        <div className="pr-8 pb-12 basis-0 pt-0 max-h-full flex-col overflow-x-auto flex-shrink pl-0 overflow-y-scroll flex-grow">
          <SidebarEditContext.Provider value={handleEdit}>
            <BacklogTable />
          </SidebarEditContext.Provider>
        </div>
        {isEditing ? (
          <div className="w-[440px] min-h-full max-h-full">
            <SidebarEditContext.Provider value={handleClose}>
              <InlineEditForm />
            </SidebarEditContext.Provider>
          </div>
        ) : null}
      </div>
    </QueryClientProvider>
  );
}
