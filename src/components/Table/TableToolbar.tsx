import * as React from 'react';
import {Button, IconButton, Toolbar, Tooltip, Typography} from '@mui/material';
import {MdFilterList} from 'react-icons/md';

interface TableToolbarProps {
  openForm: () => void;
}

function TableToolbar(props: TableToolbarProps) {
  return (
    <Toolbar
      sx={{
        pl: {sm: 2},
        pr: {xs: 1, sm: 1},
      }}
    >
      <Typography
        sx={{flex: '1 1 100%'}}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        Backlog

        <a href={"/api/issues"}>tt</a>
      </Typography>
      <Tooltip title="Filter list">
        <IconButton className="mr-3">
          <MdFilterList />
        </IconButton>
      </Tooltip>
      <Button
        className="bg-blue-600 text-xs"
        variant="contained"
        onClick={props.openForm}
      >
        Create&nbsp;Issue
      </Button>
    </Toolbar>
  );
}

export default TableToolbar;
