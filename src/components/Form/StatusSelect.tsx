import { NextRouter, useRouter } from "next/router";
import { verifyUrlParam } from "@/lib/utils";
import {
  QueryClient,
  useMutation,
  useQueryClient,
  UseQueryResult,
} from "react-query";
import { StatusType } from "@/lib/types";
import { queryStatuses } from "@/lib/data/query";
import { MenuItem, Select, SelectChangeEvent, styled } from "@mui/material";
import * as React from "react";
import { editIssue } from "@/lib/data/issues";
import StatusChip from "@/components/Backlog/StatusChip";

interface StatusSelectProps {
  issueKey: string;
  defaultValue: StatusType | undefined;
  hideToggle?: boolean;
  defaultOpen?: boolean;
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

export default function StatusSelect(props: StatusSelectProps): JSX.Element {
  const router: NextRouter = useRouter();
  const projectKey: string = verifyUrlParam(router.query.pKey);
  const [value, setValue] = React.useState<StatusType>(NONE_STATUS);

  // Server queries
  const queryClient: QueryClient = useQueryClient();
  const { data: statuses, isLoading }: UseQueryResult<StatusType[]> =
    queryStatuses(projectKey);
  const editStatusMutation = useMutation(
    async (data: any) => await editIssue(projectKey, props.issueKey, data),
    {
      onSuccess: async (): Promise<void> => {
        await queryClient.invalidateQueries(["issues", projectKey]);
      },
    }
  );
  React.useEffect((): void => {
    if (props.defaultValue) setValue(props.defaultValue);
  }, [props.defaultValue]);

  // Select mutation
  const handleSelectChange = (event: SelectChangeEvent<unknown>): void => {
    event.preventDefault();
    if (!statuses) return;
    if (Number(event.target.value) > 0) {
      const newValue: StatusType | undefined = statuses.find(
        (status: StatusType) => {
          return status.id === Number(event.target.value);
        }
      );
      if (!newValue) return;
      editStatusMutation.mutate({ status: newValue.id });
      setValue(newValue);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <StyledSelect
        value={String(value.id)}
        onChange={handleSelectChange}
        renderValue={(): React.ReactNode => <StatusChip value={value} />}
        defaultOpen={props.defaultOpen}
        IconComponent={(): null => null}>
        {statuses?.map((status: StatusType) => (
          <MenuItem value={status.id} key={status.id}>
            <StatusChip value={status} />
          </MenuItem>
        ))}
      </StyledSelect>
    </>
  );
}

const NONE_STATUS: StatusType = new StatusType(-1, "None");
