import { MenuItem, Select, SelectChangeEvent, styled } from "@mui/material";
import { NextRouter, useRouter } from "next/router";
import { verifyUrlParam } from "@/lib/utils";
import { GridRowId, useGridApiContext } from "@mui/x-data-grid";
import { PriorityType } from "@/lib/types";
import { queryPriorities } from "@/lib/client-data/query";
import { UseQueryResult } from "react-query";
import React from "react";
import { NONE_PRIORITY } from "@/lib/constants";

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

interface PrioritySelectProps {
  /** Mui DataGrid row id */
  id: GridRowId;
  /** Mui DataGrid cell field */
  field: string;
  /** Currently editing issue's key */
  issueKey: string;
  /** Existing status value */
  defaultValue: PriorityType;
}

export default function PrioritySelect(
  props: PrioritySelectProps
): JSX.Element {
  const router: NextRouter = useRouter();
  const projectKey: string = verifyUrlParam(router.query.pKey);
  const organisation: string = verifyUrlParam(router.query.orgKey);
  const [validPriorities, setValidPriorities] = React.useState<PriorityType[]>([
    NONE_PRIORITY,
  ]);

  const apiRef = useGridApiContext();

  // Server queries
  const { data: priorities, isLoading }: UseQueryResult<PriorityType[]> =
    queryPriorities(organisation, projectKey);
  React.useEffect(() => {
    if (priorities) {
      setValidPriorities([NONE_PRIORITY, ...priorities]);
    }
  }, [priorities]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleChange = async (
    event: SelectChangeEvent<unknown>
  ): Promise<void> => {
    let newPriority: PriorityType | undefined = undefined;

    if (!Number.isNaN(Number(event.target.value))) {
      newPriority = priorities?.find(
        (status: PriorityType): boolean =>
          status.id === Number(event.target.value)
      );
    }

    if (newPriority === undefined || newPriority.id === NONE_PRIORITY.id) {
      return;
    }

    await apiRef.current.setEditCellValue({
      id: props.id,
      field: props.field,
      value: newPriority,
    });
    apiRef.current.stopCellEditMode({ id: props.id, field: props.field });
  };
  const handleClose = (): void => {
    apiRef.current.stopCellEditMode({ id: props.id, field: props.field });
  };

  return (
    <StyledSelect
      value={props.defaultValue.id}
      onChange={handleChange}
      onClose={handleClose}
      renderValue={(): React.ReactNode => <div>{props.defaultValue.name}</div>}
      IconComponent={(): null => null}
      defaultOpen>
      {validPriorities?.map((priority: PriorityType) => (
        <MenuItem key={priority.id} value={priority.id}>
          {priority.name}
        </MenuItem>
      ))}
    </StyledSelect>
  );
}
