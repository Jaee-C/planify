import "react";
import { styled } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const MyDataGrid = styled(DataGrid)(() => ({
  "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
    outline: "none !important",
  },
}));

export default MyDataGrid;
