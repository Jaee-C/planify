import AppError from "@/server/service/AppError";
import { Alert } from "@mui/material";
import { useAtomValue, useSetAtom } from "jotai";
import {
  backlogErrorAtom,
  resetBacklogErrorAtom,
} from "@/components/utils/atom";

export default function TableError(): JSX.Element {
  const error: AppError | null = useAtomValue(backlogErrorAtom);
  const removeError = useSetAtom(resetBacklogErrorAtom);

  if (error === null) {
    return <></>;
  }

  return (
    <Alert severity="error" onClose={removeError}>
      {error.message}
    </Alert>
  );
}
