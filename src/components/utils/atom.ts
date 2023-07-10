import { atom } from "jotai";
import { GridRowsProp } from "@mui/x-data-grid";

export const issueRowsAtom = atom<GridRowsProp>([]);
export const addOneIssueAtom = atom<null, [GridRowsProp], void>(
  null,
  (get, set, update): void => {
    set(issueRowsAtom, [...get(issueRowsAtom), update[0]]);
  }
);
