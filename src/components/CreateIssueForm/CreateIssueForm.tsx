import React from 'react';
import {
  Button,
  DialogTitle,
  Typography,
  IconButton,
  Divider,
  DialogActions,
} from '@mui/material';
import {MdClose} from 'react-icons/md';

import FormTextField from '@/components/CreateIssueForm/FormTextField';
import FormSelectField from '@/components/CreateIssueForm/FormSelectField';

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
        <FormTextField name="title" label="Issue Title" size="medium" />
        <br />
        <Divider />
        <br />
        <FormTextField
          name="description"
          label="Description"
          multiline={true}
        />
        <FormTextField name="assignee" label="Assignee" />
        <FormSelectField
          name="status"
          label="Status"
          options={[
            {
              label: 'Done',
              value: 'done',
            },
            {
              label: 'In Progress',
              value: 'in_progress',
            },
            {
              label: 'To Do',
              value: 'todo',
            },
          ]}
        />
        <DialogActions className="flex items-center justify-between m-0 p-4">
          <Button>Close</Button>
          <Button
            variant="contained"
            color="primary"
            className="bg-blue-600"
            onClick={props.closeForm}
          >
            save
          </Button>
        </DialogActions>
      </form>
    </>
  );
}
