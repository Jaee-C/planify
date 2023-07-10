import * as React from "react";
import { Box, Paper } from "@mui/material";
import {
  GridActionsCellItem,
  GridColDef,
  GridRenderCellParams,
  GridRowParams,
  GridRowsProp,
  GridValueFormatterParams,
} from "@mui/x-data-grid";
import { MdDelete, MdEdit } from "react-icons/md";
import { IconContext } from "react-icons";

import DataGrid from "@/components/Table/DataGrid";
import IssueCreateDialog from "@/components/CreateIssue/IssueCreateDialog";
import { useMutation } from "react-query";
import { editIssue, serverDeleteIssue } from "@/lib/data/issues";
import { Issue } from "lib/types";
import { NextRouter, useRouter } from "next/router";
import {
  CreateIssueContext,
  SidebarEditContext,
} from "@/components/Backlog/index";
import { verifyUrlParam } from "@/lib/utils";
import { queryIssues, queryStatuses } from "@/lib/data/query";
import StatusSelect from "./StatusSelect";
import StatusChip from "@/components/Form/StatusChip";
import PrioritySelect from "@/components/Backlog/PrioritySelect";
import { NONE_PRIORITY } from "@/lib/constants";
import { useAtom, useSetAtom } from "jotai";
import {
  editOneIssueAtom,
  issueRowsAtom,
  removeOneIssueAtom,
  setBacklogErrorAtom,
} from "@/components/utils/atom";
import { createGridRowFromIssue } from "@/components/Backlog/utils";
import AppError from "@/server/service/AppError";

function getDistinctValues(updated: any, original: any): any {
  const distinct: any = {};
  Object.keys(updated).forEach((key: string) => {
    if (updated[key] !== original[key]) {
      distinct[key] = updated[key];
    }
  });
  return distinct;
}

export default function BacklogTable(): JSX.Element {
  const router: NextRouter = useRouter();
  const { pKey } = router.query;
  const projectKey: string = verifyUrlParam(pKey);
  const { data: issues, isLoading } = queryIssues(projectKey);
  const { data: statuses } = queryStatuses(projectKey);

  // Global states
  const [issueRows, setIssueRows] = useAtom(issueRowsAtom);
  const editOneRow = useSetAtom(editOneIssueAtom);
  const removeOneRow = useSetAtom(removeOneIssueAtom);
  const setError = useSetAtom(setBacklogErrorAtom);

  // Server queries
  const editIssueMutation = useMutation(
    async ([issueKey, data]: any) =>
      await editIssue(projectKey, issueKey, data),
    {
      onSuccess: async (res: Issue): Promise<void> => {
        const newRow: GridRowsProp = createGridRowFromIssue(res);
        editOneRow(newRow[0].id, newRow);
      },
      onError: (err: AppError): void => {
        setError(err);
      },
    }
  );
  const handleRowEdit = (updatedRow: any, originalRow: any): void => {
    const changes: any = getDistinctValues(updatedRow, originalRow);
    if (Object.keys(changes).length === 0) return originalRow;
    if (changes.status) {
      changes.status = changes.status.id;
    }
    if (changes.priority) {
      changes.priority = changes.priority.id;
    }
    editIssueMutation.mutate([updatedRow.key, changes]);
    return updatedRow;
  };

  const editContext = React.useContext(SidebarEditContext);
  const createIssueContext = React.useContext(CreateIssueContext);

  // Load table rows
  React.useEffect((): void => {
    if (!isLoading && issues) {
      if (issues.data.length > 0) {
        const newRows: GridRowsProp = issues.data.map((row: Issue) => {
          return {
            id: row.id,
            key: row.issueKey,
            title: row.title,
            // assignee: row.assignee,
            status: row.status,
            priority: row.priority ? row.priority : NONE_PRIORITY,
          };
        });
        setIssueRows(newRows);
      }
    }
  }, [issues, statuses]);

  const deleteIssue = useMutation(
    (issueKey: string) => serverDeleteIssue(projectKey, issueKey),
    {
      onSuccess: async (id: string) => {
        removeOneRow(id);
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
            rows={issueRows}
            processRowUpdate={handleRowEdit}
            singleClickEdit
          />
        </Paper>
      </Box>
      <IssueCreateDialog
        formOpen={createIssueContext.value}
        closeForm={createIssueContext.action}
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
    {
      field: "key",
      headerName: "Key",
      width: 100,
      renderCell: (params: GridRenderCellParams): React.ReactNode => (
        <strong
          className="text-stone-500 font-medium cursor-pointer"
          onClick={(): void => {
            handleEdit(params.row.key);
          }}>
          {params.row.key}
        </strong>
      ),
    },
    {
      field: "title",
      headerName: "Title",
      align: "left",
      flex: 1,
      minWidth: 125,
      renderCell: (params: GridRenderCellParams): React.ReactNode => {
        return (
          <div
            className="hover:underline cursor-pointer"
            onClick={(): void => {
              handleEdit(params.row.key);
            }}>
            {params.row.title}
          </div>
        );
      },
    },
    // {
    //   field: "assignee",
    //   headerName: "Assignee",
    //   align: "left",
    //   width: 150,
    // },
    {
      field: "status",
      headerName: "Status",
      editable: true,
      align: "left",
      width: 125,
      valueFormatter: (params: GridValueFormatterParams): string =>
        params.value.name,
      renderEditCell: (params: GridRenderCellParams): React.ReactNode => {
        return (
          <StatusSelect
            id={params.id}
            field={params.field}
            issueKey={params.row.key}
            defaultValue={params.row.status}
            hideToggle
          />
        );
      },
      renderCell: (params: GridRenderCellParams): React.ReactNode => (
        <StatusChip value={params.row.status} />
      ),
      sortComparator: (v1, v2) => v1.id - v2.id,
    },
    {
      field: "priority",
      headerName: "Priority",
      editable: true,
      width: 75,
      valueFormatter: (params: GridValueFormatterParams): string =>
        params.value.name,
      renderEditCell: (params: GridRenderCellParams): React.ReactNode => (
        <PrioritySelect
          id={params.id}
          field={params.field}
          issueKey={params.row.key}
          defaultValue={params.row.priority}
        />
      ),
      renderCell: (params: GridRenderCellParams): React.ReactNode => (
        <div className="hover:cursor-pointer">{params.row.priority.name}</div>
      ),
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
