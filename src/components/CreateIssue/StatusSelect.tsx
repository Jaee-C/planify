import { StatusType } from "@/lib/types";
import { QueryClient, useQueryClient, UseQueryResult } from "react-query";
import { queryStatuses } from "@/lib/data/query";
import { NextRouter, useRouter } from "next/router";
import { verifyUrlParam } from "@/lib/utils";
import * as React from "react";
import StatusChip from "@/components/Form/StatusChip";
import {
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

interface StatusSelectProp {
  handleChange: (e: SelectChangeEvent) => void;
  value?: StatusType;
  error?: boolean;
  helperText?: string | false;
}

export default function StatusSelect(props: StatusSelectProp): JSX.Element {
  const router: NextRouter = useRouter();
  const projectKey: string = verifyUrlParam(router.query.pKey);
  const [value, setValue] = React.useState<StatusType>(NONE_STATUS);

  // Server queries
  const { data: statuses, isLoading }: UseQueryResult<StatusType[]> =
    queryStatuses(projectKey);

  React.useEffect(() => {
    if (props.value) {
      setValue(props.value);
    }
  }, [props.value]);

  return (
    <FormControl variant="outlined" fullWidth className="rounded-lg">
      <Select
        name="status"
        value={String(value.id)}
        onChange={props.handleChange}
        error={props.error}
        renderValue={(): React.ReactNode => <StatusChip value={value} />}>
        {statuses?.map((status: StatusType) => (
          <MenuItem value={status.id} key={status.id}>
            <StatusChip value={status} />
          </MenuItem>
        ))}
      </Select>
      {props.helperText && <FormHelperText>{props.helperText}</FormHelperText>}
    </FormControl>
  );
}

const NONE_STATUS: StatusType = new StatusType(-1, "None");
