import * as React from "react";
import { NextRouter, useRouter } from "next/router";
import { UseQueryResult } from "react-query";
import { StatusType } from "@/lib/types";
import { queryStatuses } from "@/lib/client-data/query";
import { verifyUrlParam } from "@/lib/utils";
import StatusChip from "@/components/utils/Form/StatusChip";
import {
  FormControl,
  FormHelperText,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import StyledSelect from "@/components/utils/Form/FormSelectField";
import { NONE_STATUS } from "@/lib/constants";

interface StatusSelectProp {
  handleChange: (e: SelectChangeEvent<unknown>) => void;
  error?: boolean;
  helperText?: string | false;
}

export default function StatusSelect(props: StatusSelectProp): JSX.Element {
  const router: NextRouter = useRouter();
  const projectKey: string = verifyUrlParam(router.query.pKey);
  const organisation: string = verifyUrlParam(router.query.orgKey);
  const [value, setValue] = React.useState<StatusType>(NONE_STATUS);

  // Server queries
  const { data: statuses }: UseQueryResult<StatusType[]> = queryStatuses(
    organisation,
    projectKey
  );

  // Set default status as first in list of statuses
  React.useEffect((): void => {
    if (statuses && statuses.length > 0) {
      setValue(statuses[0]);
      props.handleChange({
        target: { value: statuses[0].id, name: "status" },
      } as SelectChangeEvent<unknown>);
    }
  }, [statuses]);

  return (
    <FormControl variant="outlined" fullWidth className="rounded-lg">
      <StyledSelect
        name="status"
        defaultValue={value.id}
        onChange={props.handleChange}
        error={props.error}
        renderValue={(): React.ReactNode => <StatusChip value={value} />}
        sx={{ padding: "12px 14px" }}>
        {statuses?.map(
          (status: StatusType): React.ReactNode => (
            <MenuItem value={status.id} key={status.id}>
              <StatusChip value={status} />
            </MenuItem>
          )
        )}
      </StyledSelect>
      {props.helperText && <FormHelperText>{props.helperText}</FormHelperText>}
    </FormControl>
  );
}
