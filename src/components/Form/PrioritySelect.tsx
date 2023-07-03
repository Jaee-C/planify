import { PriorityType } from "@/lib/types";
import { NextRouter, useRouter } from "next/router";
import { verifyUrlParam } from "@/lib/utils";
import {
  QueryClient,
  useMutation,
  useQueryClient,
  UseQueryResult,
} from "react-query";
import { queryPriorities } from "@/lib/data/query";
import FormAutocomplete from "@/components/Form/FormAutocomplete";
import * as React from "react";
import { TextField } from "@mui/material";
import { editIssue } from "@/lib/data/issues";

interface PriorityProps {
  issueKey: string;
  defaultValue?: PriorityType;
}

export default function PrioritySelect({
  issueKey,
  defaultValue = NONE_PRIORITY,
}: PriorityProps): JSX.Element {
  const router: NextRouter = useRouter();
  const projectKey: string = verifyUrlParam(router.query.pKey);

  const { data: priorities, isLoading }: UseQueryResult<PriorityType[]> =
    queryPriorities(projectKey);
  const queryClient: QueryClient = useQueryClient();
  const editPriorityMutation = useMutation(
    async (data: any) => await editIssue(projectKey, issueKey, data),
    {
      onSuccess: async (): Promise<void> => {
        await queryClient.invalidateQueries(["issues", projectKey]);
      },
    }
  );

  // Autocomplete Formatting
  const getPriorityLabel = (option: unknown): string => {
    if (option instanceof PriorityType) {
      const cast: PriorityType = option as PriorityType;
      return cast.name;
    }
    return "";
  };
  const verifyValue = (option: unknown, value: unknown): boolean => {
    if (!(option instanceof PriorityType && value instanceof PriorityType))
      return false;

    const optionCast: PriorityType = option as PriorityType;
    const valueCast: PriorityType = value as PriorityType;
    return optionCast.id === valueCast.id;
  };

  return (
    <FormAutocomplete
      hideToggle
      renderInput={(params): React.ReactNode => <TextField {...params} />}
      value={defaultValue}
      getOptionLabel={getPriorityLabel}
      isOptionEqualToValue={verifyValue}
      options={priorities ? priorities : [NONE_PRIORITY]}
      loading={isLoading}
      getOptionDisabled={(option: unknown): boolean => option === NONE_PRIORITY}
    />
  );
}

const NONE_PRIORITY: PriorityType = new PriorityType(-1, "None");
