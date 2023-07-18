import { PriorityType } from "@/lib/types";
import { NextRouter, useRouter } from "next/router";
import { verifyUrlParam } from "@/lib/utils";
import {
  QueryClient,
  useMutation,
  useQueryClient,
  UseQueryResult,
} from "react-query";
import { queryPriorities } from "@/lib/client-data/query";
import FormAutocomplete from "@/components/Form/FormAutocomplete";
import * as React from "react";
import { TextField } from "@mui/material";
import { editIssue } from "@/lib/client-data/issues";
import { NONE_PRIORITY } from "@/lib/constants";
import { SyntheticEvent } from "react";

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
  const [value, setValue] = React.useState<PriorityType>(defaultValue);

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

  React.useEffect((): void => {
    if (defaultValue) setValue(defaultValue);
  }, [defaultValue]);

  const onChange = (e: SyntheticEvent, value: unknown): void => {
    e.preventDefault();
    if (value && typeof value === "object" && "id" in value) {
      const cast: PriorityType = value as PriorityType;
      editPriorityMutation.mutate({ priority: cast.id });
      setValue(cast);
    }
  };

  // Autocomplete Formatting
  const getPriorityLabel = (option: unknown): string => {
    if (option && typeof option === "object" && "name" in option) {
      const cast: PriorityType = option as PriorityType;
      return cast.name;
    }
    return "";
  };
  const verifyValue = (option: unknown, value: unknown): boolean => {
    if (
      !(
        option &&
        value &&
        typeof option === "object" &&
        typeof value === "object"
      )
    )
      return false;

    const optionCast: PriorityType = option as PriorityType;
    const valueCast: PriorityType = value as PriorityType;
    return optionCast.id === valueCast.id;
  };

  return (
    <FormAutocomplete
      hideToggle
      blurOnSelect
      disableClearable
      selectOnFocus={false}
      renderInput={(params): React.ReactNode => <TextField {...params} />}
      value={value}
      getOptionLabel={getPriorityLabel}
      isOptionEqualToValue={verifyValue}
      options={priorities ? priorities : [NONE_PRIORITY]}
      loading={isLoading}
      onChange={onChange}
    />
  );
}
