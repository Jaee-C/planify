import { FormControl, MenuItem, SelectChangeEvent } from "@mui/material";
import { PriorityType } from "@/lib/types";
import { NextRouter, useRouter } from "next/router";
import { verifyUrlParam } from "@/lib/utils";
import React from "react";
import { NONE_PRIORITY } from "@/lib/constants";
import { queryPriorities } from "@/lib/client-data/query";
import { UseQueryResult } from "react-query";
import StyledSelect from "@/components/Form/FormSelectField";

interface PrioritySelectProp {
  handleChange: (e: SelectChangeEvent<unknown>) => void;
  error?: boolean;
  helperText?: string | false;
}

export default function PrioritySelect(props: PrioritySelectProp): JSX.Element {
  const router: NextRouter = useRouter();
  const projectKey: string = verifyUrlParam(router.query.pKey);
  const [validPriorities, setPriorities] = React.useState<PriorityType[]>([
    NONE_PRIORITY,
  ]);

  const { data: priorities }: UseQueryResult<PriorityType[]> =
    queryPriorities(projectKey);

  React.useEffect((): void => {
    if (priorities && priorities.length > 0) {
      setPriorities([NONE_PRIORITY, ...priorities]);
    }
  }, [priorities]);

  return (
    <FormControl>
      <StyledSelect
        name="priority"
        defaultValue={NONE_PRIORITY.id}
        onChange={props.handleChange}
        error={props.error}>
        {validPriorities.map((priority: PriorityType) => (
          <MenuItem value={priority.id} key={priority.id}>
            {priority.name}
          </MenuItem>
        ))}
      </StyledSelect>
    </FormControl>
  );
}
