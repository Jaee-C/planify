import "react";
import {
  GridActionsCellItem,
  GridColDef,
  GridRowParams,
} from "@mui/x-data-grid";
import { MdDelete, MdEdit } from "react-icons/md";

type handler = (args0: number | string) => void;

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
