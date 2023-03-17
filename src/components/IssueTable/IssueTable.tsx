import * as React from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Typography,
  Paper,
  IconButton,
  Tooltip,
  Button,
} from '@mui/material';
import {MdFilterList, MdDelete} from 'react-icons/md';
import {IconContext} from 'react-icons';
import {visuallyHidden} from '@mui/utils';

import RoundButton from 'components/utils/RoundButton';
import CreateIssueForm from 'components/CreateIssueForm/CreateIssueForm';

interface Data {
  key: string;
  title: string;
  assignee: string;
  status: string;
}

function createData(
  key: string,
  title: string,
  assignee: string,
  status: string
): Data {
  return {
    key,
    title,
    assignee,
    status,
  };
}

const rows = [
  createData('PRJ-1', 'Create PoC', 'Daniel', 'In Progress'),
  createData('PRJ-2', 'Raise Issues', 'Daniel', 'To Do'),
  createData('PRJ-3', 'Update Progress on Issues', 'Daniel', 'To Do'),
  createData('PRJ-4', 'Record all issues', 'Daniel', 'To Do'),
  createData('PRJ-5', 'Manage Issues', 'Daniel', 'To Do'),
  createData('PRJ-6', 'Notify users', 'Daniel', 'To Do'),
];

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: {[key in Key]: number | string},
  b: {[key in Key]: number | string}
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  sortable: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'key',
    disablePadding: true,
    label: 'Key',
    sortable: true,
  },
  {
    id: 'title',
    disablePadding: false,
    label: 'Title',
    sortable: true,
  },
  {
    id: 'assignee',
    disablePadding: false,
    label: 'Assignee',
    sortable: true,
  },
  {
    id: 'status',
    disablePadding: false,
    label: 'Status',
    sortable: true,
  },
];

interface EnhancedTableProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  order: Order;
  orderBy: string;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const {order, orderBy, onRequestSort} = props;
  const createSortHandler =
    (property: keyof Data, sortable: boolean) =>
    (event: React.MouseEvent<unknown>) => {
      if (sortable) {
        onRequestSort(event, property);
      }
    };

  return (
    <TableHead>
      <TableRow>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.id === 'key' ? 'center' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id, headCell.sortable)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell size="small"></TableCell>
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  openForm: () => void;
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
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

export default function IssueTable() {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('key');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleFormOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    // const selectedIndex = selected.indexOf(name);
    // let newSelected: readonly string[] = [];
    //
    // if (selectedIndex === -1) {
    //   newSelected = newSelected.concat(selected, name);
    // } else if (selectedIndex === 0) {
    //   newSelected = newSelected.concat(selected.slice(1));
    // } else if (selectedIndex === selected.length - 1) {
    //   newSelected = newSelected.concat(selected.slice(0, -1));
    // } else if (selectedIndex > 0) {
    //   newSelected = newSelected.concat(
    //     selected.slice(0, selectedIndex),
    //     selected.slice(selectedIndex + 1)
    //   );
    // }
    //
    // setSelected(newSelected);

    console.log(`Selected entry ${name}`);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <IconContext.Provider value={{size: '16px'}}>
      <Box sx={{width: '100%'}}>
        <Paper
          sx={{width: '100%', mb: 2}}
          className="bg-transparent shadow-none"
        >
          <EnhancedTableToolbar openForm={handleFormOpen} />
          <TableContainer>
            <Table
              sx={{minWidth: 750}}
              aria-labelledby="tableTitle"
              size="medium"
            >
              <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
              />
              <TableBody>
                {stableSort(rows, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const labelId = `issue-table-entry-${index}`;

                    return (
                      <TableRow
                        hover
                        onClick={event => handleClick(event, row.key)}
                        role="button"
                        tabIndex={-1}
                        key={row.key}
                      >
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                          align="center"
                        >
                          {row.key}
                        </TableCell>
                        <TableCell align="left">{row.title}</TableCell>
                        <TableCell align="left">{row.assignee}</TableCell>
                        <TableCell align="left">{row.status}</TableCell>
                        <TableCell align="center">
                          <RoundButton onClick={() => {}}>
                            <MdDelete className="inline" />
                          </RoundButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: 53 * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
      <CreateIssueForm formOpen={dialogOpen} closeForm={handleDialogClose} />
    </IconContext.Provider>
  );
}
