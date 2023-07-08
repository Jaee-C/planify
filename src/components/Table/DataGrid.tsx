import "react";
import { styled } from "@mui/material";
import {
  DataGrid,
  DataGridProps,
  GridCellModes,
  GridCellModesModel,
  GridCellParams,
} from "@mui/x-data-grid";
import * as React from "react";

const StyledDataGrid = styled(DataGrid)(() => ({
  "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
    outline: "none !important",
  },
}));

interface SingleClickDataGridProps {
  singleClickEdit?: boolean;
}

export default function SingleClickDataGrid(
  props: SingleClickDataGridProps & DataGridProps
): JSX.Element {
  const [cellModesModel, setCellModesModel] =
    React.useState<GridCellModesModel>({});
  // Allow single click editing
  const handleCellClick = React.useCallback(
    (params: GridCellParams, event: React.MouseEvent) => {
      if (!params.isEditable) {
        return;
      }

      // Ignore portal
      if (!event.currentTarget.contains(event.target as Element)) {
        return;
      }

      setCellModesModel(prevModel => {
        return {
          // Revert the mode of the other cells from other rows
          ...Object.keys(prevModel).reduce(
            (acc, id) => ({
              ...acc,
              [id]: Object.keys(prevModel[id]).reduce(
                (acc2, field) => ({
                  ...acc2,
                  [field]: { mode: GridCellModes.View },
                }),
                {}
              ),
            }),
            {}
          ),
          [params.id]: {
            // Revert the mode of other cells in the same row
            ...Object.keys(prevModel[params.id] || {}).reduce(
              (acc, field) => ({
                ...acc,
                [field]: { mode: GridCellModes.View },
              }),
              {}
            ),
            [params.field]: { mode: GridCellModes.Edit },
          },
        };
      });
    },
    []
  );

  const handleCellModesModelChange = React.useCallback(
    (newModel: GridCellModesModel) => {
      setCellModesModel(newModel);
    },
    []
  );

  if (props.singleClickEdit) {
    return (
      <StyledDataGrid
        sx={{
          "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
            outline: "none !important",
          },
        }}
        onCellClick={handleCellClick}
        cellModesModel={cellModesModel}
        onCellModesModelChange={handleCellModesModelChange}
        {...props}
      />
    );
  }
  return (
    <StyledDataGrid
      sx={{
        "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
          outline: "none !important",
        },
      }}
      {...props}
    />
  );
}
