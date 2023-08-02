"use client";

import React from "react";
// @ts-ignore
import { useDebounce } from "@uidotdev/usehooks";
import { Button, TextField } from "@/core/ui";

import styles from "./users.module.css";
import { Autocomplete } from "@mui/material";
import { useQuery } from "react-query";
import { searchUserByUsername } from "@/lib/client-data/users";

function renderUserSearchInput(params: object): React.ReactNode {
  return <TextField {...params} name="username" label="Username" />;
}

export default function AddMemberForm(): JSX.Element {
  const [searchValue, setSearchValue] = React.useState("");
  const debouncedFilter = useDebounce(searchValue, 500);
  const { data, isLoading } = useQuery(
    ["users", debouncedFilter],
    () => searchUserByUsername(debouncedFilter),
    { enabled: Boolean(debouncedFilter) }
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(`Adding user ${searchValue} to project`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add a User</h3>
      <div className={styles.formControl}>
        <Autocomplete
          onInputChange={(e, value) => setSearchValue(value)}
          renderInput={renderUserSearchInput}
          options={data ?? []}
          getOptionLabel={option => {
            if (typeof option === "string") {
              return option;
            }
            return option.username ?? "";
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
