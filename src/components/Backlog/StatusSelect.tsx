import * as React from "react";
import { NextRouter, useRouter } from "next/router";
import { MenuItem, Select, SelectChangeEvent, styled } from "@mui/material";
import { UseQueryResult } from "react-query";
import { verifyUrlParam } from "@/lib/utils";
import { StatusType } from "@/lib/types";
import { queryStatuses } from "@/lib/client-data/query";
import StatusChip from "@/components/utils/Form/StatusChip";
import { GridRowId, useGridApiContext } from "@mui/x-data-grid";

interface StatusSelectProps {
  /** Mui DataGrid row id */
  id: GridRowId;
  /** Mui DataGrid cell field */
  field: string;
  /** Currently editing issue's key */
  issueKey: string;
  /** Existing status value */
  defaultValue: StatusType;
  /** Whether to hide downward arrow icon */
  hideToggle?: boolean;
}

const StyledSelect = styled(Select)(() => ({
  "& .MuiSelect-root": {
    boxShadow: "none",
  },
  "& .MuiSelect-select": {
    padding: "5px",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: 0,
    "&:hover": {
      border: 0,
    },
  },
}));

/**
 * Select component for issue status for inline editing in Mui DataGrid
 * @param {StatusSelectProps} props
 * @constructor
 */
export default function StatusSelect(props: StatusSelectProps): JSX.Element {
  const router: NextRouter = useRouter();
  const projectKey: string = verifyUrlParam(router.query.pKey);
  const organisation: string = verifyUrlParam(router.query.orgKey);

  const apiRef = useGridApiContext();

  // Server queries
  const { data: statuses, isLoading }: UseQueryResult<StatusType[]> =
    queryStatuses(organisation, projectKey);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleChange = async (
    event: SelectChangeEvent<unknown>
  ): Promise<void> => {
    let newStatus: StatusType | undefined = undefined;

    if (!Number.isNaN(Number(event.target.value))) {
      newStatus = statuses?.find(
        (status: StatusType) => status.id === Number(event.target.value)
      );
    }

    if (newStatus === undefined) {
      return;
    }

    await apiRef.current.setEditCellValue({
      id: props.id,
      field: props.field,
      value: newStatus,
    });
    apiRef.current.stopCellEditMode({ id: props.id, field: props.field });
  };

  const handleClose = (): void => {
    apiRef.current.stopCellEditMode({ id: props.id, field: props.field });
  };

  return (
    <StyledSelect
      value={String(props.defaultValue.id)}
      onChange={handleChange}
      onClose={handleClose}
      renderValue={(): React.ReactNode => (
        <StatusChip value={props.defaultValue} />
      )}
      defaultOpen
      IconComponent={(): null => null}>
      {statuses?.map((status: StatusType) => (
        <MenuItem value={status.id} key={status.id} disabled={status.id === -1}>
          <StatusChip value={status} />
        </MenuItem>
      ))}
    </StyledSelect>
  );
}
