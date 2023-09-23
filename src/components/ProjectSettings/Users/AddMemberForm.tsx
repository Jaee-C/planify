"use client";

import React from "react";
// @ts-ignore
import { useDebounce } from "@uidotdev/usehooks";
import { Button, TextField } from "@/core/ui";

import styles from "./users.module.css";
import { Autocomplete } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { addProjectUser, searchUserByUsername } from "@/lib/client-data/users";
import { UserData } from "@/lib/types";
import { NextRouter, useRouter } from "next/router";
import { verifyUrlParam } from "@/lib/utils";

function renderUserSearchInput(params: object): React.ReactNode {
  return <TextField {...params} name="username" label="Username" />;
}

export default function AddMemberForm(): JSX.Element {
  const router: NextRouter = useRouter();
  const projectKey: string = verifyUrlParam(router.query.pKey);
  const [searchValue, setSearchValue] = React.useState("");
  const [selectedUser, setSelectedUser] = React.useState<UserData | null>(null);
  const debouncedFilter = useDebounce(searchValue, 500);
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery(
    ["users", debouncedFilter],
    () => searchUserByUsername(projectKey, debouncedFilter),
    { enabled: Boolean(debouncedFilter) }
  );
  const addUserMutation = useMutation(
    async (user: UserData) => await addProjectUser(projectKey, user),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["projectUsers", projectKey]);
      },
    }
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(selectedUser);
    if (!selectedUser) return;
    addUserMutation.mutate(selectedUser);
  };

  const handleChange = (e: React.ChangeEvent<{}>, value: UserData | string) => {
    if (typeof value === "string") {
      return;
    }
    setSelectedUser(value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add a User</h3>
      <div className={styles.formControl}>
        <Autocomplete
          onInputChange={(e, value) => setSearchValue(value)}
          onChange={handleChange}
          renderInput={renderUserSearchInput}
          options={data ?? []}
          getOptionLabel={option => {
            if (typeof option === "string") {
              return option;
            }
            return `${option.displayName} (${option.email ?? ""})`;
          }}
          disableClearable
          freeSolo
          filterOptions={x => x}
          fullWidth
        />
        <Button type="submit" variant="contained">
          Add
        </Button>
      </div>
    </form>
  );
}
