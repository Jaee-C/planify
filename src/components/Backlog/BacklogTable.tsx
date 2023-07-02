import * as React from "react";
import { Box, Button, IconButton, Paper, Tooltip } from "@mui/material";
import {
  GridActionsCellItem,
  GridColDef,
  GridRowId,
  GridRowParams,
  GridRowsProp,
} from "@mui/x-data-grid";
import { MdDelete, MdEdit, MdFilterList } from "react-icons/md";
import { IconContext } from "react-icons";

import TableToolbar from "@/components/Table/TableToolbar";
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
} from "@/lib/data/issues";
import { StatusType, Issue, PriorityType } from "lib/types";
import { NextRouter, useRouter } from "next/router";

export default function BacklogTable(): JSX.Element {
  const router: NextRouter = useRouter();
  const { pKey } = router.query;
  const { data, isLoading } = useQuery(
    ["issues", pKey],
    () => fetchIssueList(pKey),
    {
      enabled: !!pKey,
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

  const handleDialogClose = (): void => {
    setEditingRow(undefined);
    setDialogOpen(false);
  };

  const handleEdit = React.useCallback(
    (id: GridRowId) => (): void => {
      if (!data) {
        return;
      }

      const row = data.data.find(row => row.id === id);
      setEditingRow(row);
      setDialogOpen(true);
    },
    [data]
  );

  const deleteIssue = useMutation(
    (id: GridRowId) => serverDeleteIssue(pKey, id),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["issues", pKey]);
      },
    }
  );

  const columns: GridColDef[] = createBacklogColumns(
    deleteIssue.mutate,
    handleEdit
  );

  return (
    <IconContext.Provider value={{ size: "16px" }}>
      <Box sx={{ width: "100%" }}>
        <Paper
          sx={{ width: "100%", mb: 2 }}
          className="bg-transparent shadow-none">
          <TableToolbar title="Backlog">
            <Tooltip title="Filter list">
              <IconButton className="mr-3">
                <MdFilterList />
              </IconButton>
            </Tooltip>
            <Button
              className="bg-blue-600 text-xs"
              variant="contained"
              onClick={handleFormOpen}>
              Create&nbsp;Issue
            </Button>
          </TableToolbar>
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
        formOpen={dialogOpen}
        closeForm={handleDialogClose}
        editingIssue={editingRow}
      />
    </IconContext.Provider>
  );
}

type handler = (arg: number | string) => void;

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
          onClick={(): void => handleDelete(params.id)}
        />,
        <GridActionsCellItem
          label="Edit"
          icon={<MdEdit />}
          onClick={(): void => handleEdit(params.id)}
        />,
      ],
    },
  ];
}
