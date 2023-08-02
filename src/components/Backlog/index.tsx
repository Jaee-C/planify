import * as React from "react";
import { QueryClientProvider } from "react-query";
import BacklogTable from "@/components/Backlog/BacklogTable";
import { createContext, useState } from "react";
import SideIssueViewer from "@/components/SideIssueViewer";
import { Button } from "@mui/material";
import TableToolbar from "@/components/Table/TableToolbar";
import { IconContext } from "react-icons";
import TableAlert from "@/components/Backlog/TableAlert";
import { queryClient } from "@/lib/client-data/query";

interface SidebarContextProps {
  action: (id: string) => void;
  value: string;
}

export const SidebarEditContext = createContext<SidebarContextProps>({
  action: (id: number | string): void => {},
  value: "",
});

interface CreateIssueContextProps {
  action: () => void;
  value: boolean;
}

export const CreateIssueContext = createContext<CreateIssueContextProps>({
  action: () => {},
  value: false,
});

export default function BacklogContent(): JSX.Element {
  const [isEditing, setEditing] = useState<boolean>(false);
  const [editingKey, setEditingKey] = useState<string>("");
  const [isCreatingIssue, setCreatingIssue] = useState<boolean>(false);

  const handleEdit = (key: string): void => {
    setEditingKey(key);
    if (key === undefined || key === "") {
      setEditing(false);
      return;
    }
    setEditing(true);
  };

  const createIssueProps = {
    action: () => setCreatingIssue(!isCreatingIssue),
    value: isCreatingIssue,
  };

  const sidebarContextProps: SidebarContextProps = {
    action: handleEdit,
    value: editingKey,
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex max-w-full h-auto max-h-full overflow-x-hidden flex-shrink flex-grow flex-col">
        <div className="px-8 mt-6 mb-4">
          <IconContext.Provider value={{ size: "16px" }}>
            <TableAlert />
            <TableToolbar title="Backlog">
              <Button
                className="bg-blue-600 text-xs"
                variant="contained"
                onClick={createIssueProps.action}>
                Create&nbsp;Issue
              </Button>
            </TableToolbar>
          </IconContext.Provider>
        </div>
        <div className="max-w-full h-auto max-h-full overflow-x-hidden flex-row flex-shrink flex pl-10 flex-grow">
          <div className="pr-8 pb-12 basis-0 pt-0 max-h-full flex-col overflow-x-auto flex-shrink pl-0 overflow-y-scroll flex-grow">
            <SidebarEditContext.Provider value={sidebarContextProps}>
              <CreateIssueContext.Provider value={createIssueProps}>
                <BacklogTable />
              </CreateIssueContext.Provider>
            </SidebarEditContext.Provider>
          </div>
          {isEditing ? (
            <div className="w-[440px] min-h-full max-h-full">
              <SidebarEditContext.Provider value={sidebarContextProps}>
                <SideIssueViewer />
              </SidebarEditContext.Provider>
            </div>
          ) : null}
        </div>
      </div>
    </QueryClientProvider>
  );
}
