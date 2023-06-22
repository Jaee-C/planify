import React from 'react';
import {
  Dialog,
  DialogTitle,
  Typography,
  IconButton,
  Divider,
  DialogContent,
} from '@mui/material';
import {MdClose} from 'react-icons/md';
import IssueForm, {IssueFormProps} from '@/components/Form/IssueForm';

interface CreateIssueFormProps extends IssueFormProps {}

export default function IssueEditDialog(props: CreateIssueFormProps) {
  return (
    <Dialog open={props.formOpen} scroll="body" fullWidth>
      <DialogTitle className="flex items-center justify-between m-0 p-4">
        <Typography variant="h6">Create Issue</Typography>
        <IconButton
          onClick={props.closeForm}
          className="text-gray-500 absolute right-2 top-2"
        >
          <MdClose size="24px" />
        </IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <IssueForm {...props} />
      </DialogContent>
    </Dialog>
  );
}
