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
import { useEffect, useState } from "react";

interface StatusSelectProps {
  issueKey: string;
  defaultValue: StatusType;
}

export default function StatusSelect(props: StatusSelectProps): JSX.Element {
  const router: NextRouter = useRouter();
  const projectKey: string = verifyUrlParam(router.query.pKey);

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
  const handleChange = (event: React.ChangeEvent<{}>, value: unknown): void => {
    if (value instanceof StatusType) {
      editStatusMutation.mutate({ status: value.id });
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <FormAutocomplete
      hideToggle
      renderInput={(params): React.ReactNode => <TextField {...params} />}
      value={props.defaultValue}
      getOptionLabel={getStatusLabel}
      isOptionEqualToValue={verifyValue}
      options={statuses ? statuses : []}
      loading={isLoading}
      onChange={handleChange}
    />
  );
}
