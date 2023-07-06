import * as React from "react";
import { NextRouter, useRouter } from "next/router";
import { UseQueryResult } from "react-query";
import { StatusType } from "@/lib/types";
import { queryStatuses } from "@/lib/data/query";
import { verifyUrlParam } from "@/lib/utils";
import StatusChip from "@/components/Form/StatusChip";
import {
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  SelectChangeEvent,
  styled,
} from "@mui/material";

const StyledFormField = styled(Select)(() => ({
  "& .MuiInputBase-input": {
    padding: "12px 14px",
    color: "rgb(18, 25, 38)",
    backgroundColor: "rgb(248, 250, 252)",
    fontWeight: 500,
    borderRadius: 8,
    fontSize: "0.875rem",
  },
  "&.MuiInputBase-root": {
    borderRadius: "8px",
  },
  "& .MuiInputLabel-root": {
    fontSize: "0.875rem",
  },
  "&.Mui-focused": {
    color: "rgb(33, 150, 243)",
  },
}));

interface StatusSelectProp {
  handleChange: (e: SelectChangeEvent<unknown>) => void;
  value?: number;
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
    if (props.value && statuses) {
      const foundStatus: StatusType | undefined = statuses.find(
        status => status.id === props.value
      );

      if (foundStatus) setValue(foundStatus);
    }
  }, [props.value]);

  return (
    <FormControl variant="outlined" fullWidth className="rounded-lg">
      <StyledFormField
        name="status"
        value={String(value.id)}
        onChange={props.handleChange}
        error={props.error}
        renderValue={(): React.ReactNode => <StatusChip value={value} />}>
        {statuses?.map(
          (status: StatusType): React.ReactNode => (
            <MenuItem value={status.id} key={status.id}>
              <StatusChip value={status} />
            </MenuItem>
          )
        )}
      </StyledFormField>
      {props.helperText && <FormHelperText>{props.helperText}</FormHelperText>}
    </FormControl>
  );
}

const NONE_STATUS: StatusType = new StatusType(-1, "None");
