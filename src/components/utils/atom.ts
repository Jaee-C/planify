import { atom } from "jotai";
import { GridRowsProp } from "@mui/x-data-grid";
import AppError from "@/lib/service/AppError";
import { ALERT_DURATION } from "@/lib/constants";

export const issueRowsAtom = atom<GridRowsProp>([]);
export const addOneIssueAtom = atom<null, [GridRowsProp], void>(
  null,
  (get, set, update): void => {
    set(issueRowsAtom, [...get(issueRowsAtom), update[0]]);
  }
);
export const editOneIssueAtom = atom<null, [number, GridRowsProp], void>(
  null,
  (get, set, id, row): void => {
    const rows = get(issueRowsAtom);
    const index: number = rows.findIndex((item): boolean => item.id === id);
    set(issueRowsAtom, [
      ...rows.slice(0, index),
      row[0],
      ...rows.slice(index + 1),
    ]);
  }
);
export const removeOneIssueAtom = atom<null, [string], void>(
  null,
  (get, set, key): void => {
    const rows = get(issueRowsAtom);
    console.log(key);
    const newRows = rows.filter(item => item.key !== key);
    set(issueRowsAtom, newRows);
  }
);

// Backlog Error
export const backlogErrorAtom = atom<AppError | null>(null);
export const setBacklogErrorAtom = atom<null, [AppError], void>(
  null,
  (get, set, error): void => {
    set(backlogErrorAtom, error);
    setTimeout(() => {
      set(backlogErrorAtom, null);
    }, ALERT_DURATION);
  }
);
export const resetBacklogErrorAtom = atom<null, [], void>(
  null,
  (get, set): void => {
    set(backlogErrorAtom, null);
  }
);
