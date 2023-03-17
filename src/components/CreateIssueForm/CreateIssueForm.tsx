import React from 'react';
import {
  Button,
  DialogTitle,
  Typography,
  IconButton,
  Divider,
  ListItem,
} from '@mui/material';
import {MdClose} from 'react-icons/md';

import FormTextField from '@/components/CreateIssueForm/FormTextField';

interface CreateIssueFormProps {
  closeForm: () => void;
}

export default function CreateIssueForm(props: CreateIssueFormProps) {
  return (
    <>
      <form>
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
        <ListItem className="pr-4">
          <FormTextField name="title" label="Issue Title" />
        </ListItem>
        <ListItem className="pr-4">
          <FormTextField
            name="description"
            label="Description"
            multiline={true}
          />
        </ListItem>
        <ListItem className="pr-4">
          <FormTextField name="assignee" label="Assignee" />
        </ListItem>
        <ListItem className="pr-4">
          <FormTextField name="status" label="Status" />
        </ListItem>
        <ListItem className="pr-4">
          <Button
            variant="contained"
            color="primary"
            className="bg-blue-600"
            onClick={props.closeForm}
          >
            save
          </Button>
        </ListItem>
      </form>
    </>
  );
}
