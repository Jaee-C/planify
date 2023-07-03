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
import { QueryClient, useMutation, useQueryClient } from "react-query";
import { toStatusString, serverDeleteIssue } from "@/lib/data/issues";
import { Issue } from "lib/types";
import { NextRouter, useRouter } from "next/router";
import {
  CreateIssueContext,
  SidebarEditContext,
} from "@/components/Backlog/index";
import { verifyUrlParam } from "@/lib/utils";
import { queryIssues, queryStatuses } from "@/lib/data/query";

export default function BacklogTable(): JSX.Element {
  const router: NextRouter = useRouter();
  const { pKey } = router.query;
  const projectKey: string = verifyUrlParam(pKey);
  const { data: issues, isLoading } = queryIssues(projectKey);
  const { data: statuses } = queryStatuses(projectKey);
  const [editingRow, setEditingRow] = React.useState<Issue | undefined>(
    undefined
  );
  const [rows, setRows] = React.useState<GridRowsProp>([]);
  const queryClient: QueryClient = useQueryClient();
  const editContext = React.useContext(SidebarEditContext);
  const createIssueContext = React.useContext(CreateIssueContext);

  React.useEffect((): void => {
    if (!isLoading && issues) {
      if (issues.data.length > 0) {
        const newRows: GridRowsProp = issues.data.map((row: Issue) => {
          return {
            id: row.id,
            key: row.issueKey,
            title: row.title,
            assignee: row.assignee,
            status: toStatusString(row.status?.id, statuses),
            priority: "low",
          };
        });
        setRows(newRows);
      }
    }
  }, [issues, statuses]);

  const deleteIssue = useMutation(
    (id: GridRowId) => serverDeleteIssue(projectKey, id),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["issues", projectKey]);
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
