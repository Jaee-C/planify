import "react";
import { Box, Paper } from "@mui/material";
import DataGrid from "@/components/Table/DataGrid";
import { IconContext } from "react-icons";
import React from "react";
import {
  GridActionsCellItem,
  GridCellParams,
  GridColDef,
  GridEventListener,
  GridRenderCellParams,
  GridRowParams,
  GridRowsProp,
} from "@mui/x-data-grid";
import { MdDelete, MdEdit } from "react-icons/md";
import TableToolbar from "@/components/Table/TableToolbar";
import Link from "next/link";

const columns: GridColDef[] = [
  { field: "key", headerName: "Key", width: 100 },
  {
    field: "name",
    headerName: "Name",
    align: "left",
    flex: 1,
    minWidth: 150,
    renderCell: (params: GridRenderCellParams) => (
      <Link
        href={`/${params.id}/backlog`}
        className="hover:underline hover:text-blue-600">
        {params.value}
      </Link>
    ),
  },
  {
    field: "owner",
    headerName: "Owner",
    align: "left",
    width: 150,
  },
  {
    field: "actions",
    type: "actions",
    width: 100,
    getActions: (params: GridRowParams) => [
      <GridActionsCellItem
        label="Delete"
        icon={<MdDelete />}
        onClick={(): void => {
          return;
        }}
      />,
      <GridActionsCellItem
        label="Edit"
        icon={<MdEdit />}
        onClick={(): void => {
          return;
        }}
      />,
    ],
  },
];

const rows: GridRowsProp = [
  {
    id: 1,
    key: "PRJ",
    name: "Projects",
    owner: "Cheche",
  },
];

export default function ProjectTable(): JSX.Element {
  const handleMoveToProject: GridEventListener<"cellClick"> = (
    params: GridCellParams<any>
  ) => {};
  return (
    <IconContext.Provider value={{ size: "16px" }}>
      <Box sx={{ width: "100%" }}>
        <Paper
          sx={{ width: "100%", mb: 2 }}
          className="bg-transparent shadow-none">
          <TableToolbar title={"Projects"} />
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
    </IconContext.Provider>
  );
}
