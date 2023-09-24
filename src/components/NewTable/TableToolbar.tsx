import * as React from "react";
import { Typography } from "@mui/material";
import { PropsWithChildren } from "react";

import styles from "./styles.module.css";

interface TableToolbarProps {
  title: string;
}

function TableToolbar(
  props: PropsWithChildren<TableToolbarProps>
): JSX.Element {
  return (
    <div className={styles.toolbar}>
      <Typography
        sx={{ flex: "1 1 100%" }}
        variant="h6"
        id="tableTitle"
        component="div">
        {props.title}
      </Typography>
      {props.children}
    </div>
  );
}

export default TableToolbar;
