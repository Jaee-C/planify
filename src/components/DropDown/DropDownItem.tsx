import React, { PropsWithChildren } from "react";
import { ListItemIcon, ListItemText, MenuItem } from "@mui/material";

interface DropDownItemProps {
  onClick: (event: React.MouseEvent) => void;
  icon?: React.ReactNode;
  title?: string;
  selected?: boolean;
}

export default function DropDownItem(
  props: DropDownItemProps & PropsWithChildren
): JSX.Element {
  return (
    <MenuItem
      dense
      onClick={props.onClick}
      title={props.title}
      selected={props.selected}>
      {props.icon && <ListItemIcon>{props.icon}</ListItemIcon>}
      <ListItemText>{props.children}</ListItemText>
    </MenuItem>
  );
}
