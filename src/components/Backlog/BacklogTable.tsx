import * as React from "react";
import { Box, Button, IconButton, Paper, Tooltip } from "@mui/material";
import { GridColDef, GridRowId, GridRowsProp } from "@mui/x-data-grid";
import { MdFilterList } from "react-icons/md";
import { IconContext } from "react-icons";

import TableToolbar from "@/components/Table/TableToolbar";
import DataGrid from "@/components/Table/DataGrid";
import IssueEditDialog from "@/components/IssueEditDialog";
import type { UIIssue } from "@/interfaces";
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
import { useContext } from "react";
import { BacklogContext } from "@/components/Backlog/BacklogContext";
import { createBacklogColumns } from "@/components/Backlog/BacklogColumns";

export default function BacklogTable(): JSX.Element {
  const project: number = useContext(BacklogContext);
  const [dialogOpen, setDialogOpen] = React.useState<boolean>(false);
  const [editingRow, setEditingRow] = React.useState<UIIssue | undefined>(
    undefined
  );
  const { data, isLoading } = useQuery<UIIssue[]>("issues", () =>
    fetchIssueList(project)
  );
  const [rows, setRows] = React.useState<GridRowsProp>([]);
  const queryClient: QueryClient = useQueryClient();

  React.useEffect((): void => {
    if (!isLoading && data && data.length > 0) {
      const newRows: GridRowsProp = data.map((row: UIIssue) => {
        return {
          id: row.id,
          key: row.key,
          title: row.title,
          assignee: row.assignee,
          status: convertNumtoStatus(row.status),
          priority: "low",
        };
      });
      setRows(newRows);
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
    (id: GridRowId) => () => {
      if (!data) {
        return;
      }

      const row = data.find(row => row.id === id);
      setEditingRow(row);
      setDialogOpen(true);
    },
    [data]
  );

  const deleteIssue = useMutation((id: GridRowId) =>
    serverDeleteIssue(project, id)
  );

  const handleDelete = (id: GridRowId): void => {
    deleteIssue.mutate(id);
    queryClient.invalidateQueries("issues");
    setRows(rows.filter(row => row.id !== id));
  };

  const columns: GridColDef[] = createBacklogColumns(handleDelete, handleEdit);

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
