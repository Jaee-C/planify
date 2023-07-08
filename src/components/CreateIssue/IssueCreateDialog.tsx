import React from "react";
import {
  Dialog,
  DialogTitle,
  Typography,
  IconButton,
  Divider,
  DialogContent,
} from "@mui/material";
import { MdClose } from "react-icons/md";
import CreateForm, {
  IssueFormProps,
} from "@/components/CreateIssue/CreateForm";

interface CreateIssueFormProps extends IssueFormProps {}

export default function IssueCreateDialog(
  props: CreateIssueFormProps
): JSX.Element {
  return (
    <Dialog open={props.formOpen} scroll="body" fullWidth>
      <DialogTitle className="flex items-center justify-between m-0 p-4">
        <Typography variant="h6">Create Issue</Typography>
        <IconButton
          onClick={props.closeForm}
          className="text-gray-500 absolute right-2 top-2">
          <MdClose size="24px" />
        </IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <CreateForm {...props} />
      </DialogContent>
    </Dialog>
  );
}
