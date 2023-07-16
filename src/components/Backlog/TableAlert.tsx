import AppError from "@/lib/service/AppError";
import { Alert } from "@mui/material";
import { useAtomValue, useSetAtom } from "jotai";
import {
  backlogErrorAtom,
  resetBacklogErrorAtom,
} from "@/components/utils/atom";

export default function TableAlert(): JSX.Element {
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
