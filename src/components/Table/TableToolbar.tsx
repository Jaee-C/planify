import * as React from "react";
import { Toolbar, Typography } from "@mui/material";
import { PropsWithChildren } from "react";

interface TableToolbarProps {
  title: string;
}

function TableToolbar(
  props: PropsWithChildren<TableToolbarProps>
): JSX.Element {
  return (
    <Toolbar
      sx={{
        pl: 0,
        pr: 0,
      }}>
      <Typography
        sx={{ flex: "1 1 100%" }}
        variant="h6"
        id="tableTitle"
        component="div">
        {props.title}
      </Typography>
      {props.children}
    </Toolbar>
  );
}

export default TableToolbar;
