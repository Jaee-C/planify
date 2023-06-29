import * as React from "react";
import { Box, Paper } from "@mui/material";
import {
  GridActionsCellItem,
  GridColDef,
  GridRowId,
  GridRowParams,
  GridRowsProp,
} from "@mui/x-data-grid";
import { MdDelete, MdEdit } from "react-icons/md";
import { IconContext } from "react-icons";

import DataGrid from "@/components/Table/DataGrid";
import IssueEditDialog from "@/components/IssueEditDialog";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import {
  convertNumtoStatus,
  fetchIssueList,
  serverDeleteIssue,
} from "@/components/data/issues";
import { StatusType, Issue, PriorityType } from "@/interfaces";
import { NextRouter, useRouter } from "next/router";
import {
  CreateIssueContext,
  SidebarEditContext,
} from "@/components/Backlog/index";

export default function BacklogTable(): JSX.Element {
  const router: NextRouter = useRouter();
  const { pid } = router.query;
  const { data, isLoading } = useQuery(
    ["issues", Number(pid)],
    () => fetchIssueList(Number(pid)),
    {
      enabled: !!pid,
    }
  );
  const [dialogOpen, setDialogOpen] = React.useState<boolean>(false);
  const [editingRow, setEditingRow] = React.useState<Issue | undefined>(
    undefined
  );
  const [statuses, setStatuses] = React.useState<StatusType[]>([]);
  const [priorities, setPriorities] = React.useState<PriorityType[]>([]);
  const [rows, setRows] = React.useState<GridRowsProp>([]);
  const queryClient: QueryClient = useQueryClient();
  const editContext = React.useContext(SidebarEditContext);
  const createIssueContext = React.useContext(CreateIssueContext);

  React.useEffect((): void => {
    if (!isLoading && data) {
      if (data.data.length > 0) {
        const newRows: GridRowsProp = data.data.map((row: Issue) => {
          return {
            id: row.id,
            key: row.issueKey,
            title: row.title,
            assignee: row.assignee,
            status: convertNumtoStatus(row.status),
            priority: "low",
          };
        });
        setRows(newRows);
      }
      if (data.statuses.length > 0) {
        setStatuses(data.statuses);
      }
      if (data.priorities.length > 0) {
        setPriorities(data.priorities);
      }
    }
  }, [data]);

  const handleFormOpen = (): void => {
    setEditingRow(undefined);
    setDialogOpen(true);
  };

  const deleteIssue = useMutation(
    (key: string) => serverDeleteIssue(Number(pid), key),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["issues", Number(pid)]);
      },
    }
  );

  const columns: GridColDef[] = createBacklogColumns(
    deleteIssue.mutate,
    editContext.action
  );

  return (
    <IconContext.Provider value={{ size: "16px" }}>
      <Box sx={{ width: "100%" }}>
        <Paper
          sx={{ width: "100%", mb: 2 }}
          className="bg-transparent shadow-none">
          <DataGrid
            sx={{
              "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
                outline: "none !important",
              },
            }}
            columns={columns}
            rows={rows}
          />
        </Paper>
      </Box>
      <IssueEditDialog
        formOpen={createIssueContext.value}
        closeForm={createIssueContext.action}
        editingIssue={editingRow}
      />
    </IconContext.Provider>
  );
}

type handler = (arg: string) => void;

export function createBacklogColumns(
  handleDelete: handler,
  handleEdit: handler
): GridColDef[] {
  return [
    { field: "key", headerName: "Key", width: 100 },
    {
      field: "title",
      headerName: "Title",
      editable: true,
      align: "left",
      flex: 1,
      minWidth: 125,
    },
    {
      field: "assignee",
      headerName: "Assignee",
      align: "left",
      width: 150,
    },
    {
      field: "status",
      headerName: "Status",
      editable: true,
      align: "left",
      width: 125,
    },
    {
      field: "priority",
      headerName: "Priority",
      editable: true,
      width: 75,
    },
    {
      field: "actions",
      type: "actions",
      width: 100,
      getActions: (params: GridRowParams) => [
        <GridActionsCellItem
          label="Delete"
          icon={<MdDelete />}
          onClick={(): void => handleDelete(params.row.key)}
        />,
        <GridActionsCellItem
          label="Edit"
          icon={<MdEdit />}
          onClick={(): void => handleEdit(params.row.key)}
        />,
      ],
    },
  ];
}
