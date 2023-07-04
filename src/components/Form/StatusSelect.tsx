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
import FormAutocomplete from "@/components/Form/FormAutocomplete";
import { TextField } from "@mui/material";
import * as React from "react";
import { editIssue } from "@/lib/data/issues";

interface StatusSelectProps {
  issueKey: string;
  defaultValue: StatusType | undefined;
}

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

  // Autocomplete formatting
  const getStatusLabel = (option: unknown): string => {
    if (option instanceof StatusType) {
      const cast: StatusType = option as StatusType;
      return cast.name;
    }
    return "";
  };
  const verifyValue = (option: unknown, value: unknown): boolean => {
    if (!(option instanceof StatusType && value instanceof StatusType))
      return false;

    const optionCast: StatusType = option as StatusType;
    const valueCast: StatusType = value as StatusType;
    return optionCast.id === valueCast.id;
  };
  const handleChange = (
    event: React.ChangeEvent<{}>,
    newValue: unknown
  ): void => {
    if (newValue instanceof StatusType && newValue.id !== value.id) {
      editStatusMutation.mutate({ status: newValue.id });
      setValue(newValue);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <FormAutocomplete
      hideToggle
      blurOnSelect
      disableClearable
      selectOnFocus={false}
      renderInput={(params): React.ReactNode => <TextField {...params} />}
      value={value}
      getOptionLabel={getStatusLabel}
      isOptionEqualToValue={verifyValue}
      options={statuses ? statuses : []}
      loading={isLoading}
      onChange={handleChange}
    />
  );
}

const NONE_STATUS: StatusType = new StatusType(-1, "None");
