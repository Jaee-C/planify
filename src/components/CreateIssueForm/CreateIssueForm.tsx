import React from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  Typography,
  IconButton,
  Divider,
  DialogActions,
} from '@mui/material';
import {useFormik} from 'formik';
import * as yup from 'yup';
import {MdClose} from 'react-icons/md';

import FormTextField from '@/components/CreateIssueForm/FormTextField';
import FormSelectField from '@/components/CreateIssueForm/FormSelectField';

interface CreateIssueFormProps {
  formOpen: boolean;
  closeForm: () => void;
}

const issueValidation = yup.object({
  title: yup.string().required('Enter a title'),
  description: yup.string().optional(),
  assignee: yup.string().optional(),
  status: yup.string().oneOf(['todo', 'in_progress', 'done']).required(),
  priority: yup.string().oneOf(['low', 'medium', 'high']).optional(),
});

export default function CreateIssueForm(props: CreateIssueFormProps) {
  const formik = useFormik({
    initialValues: {
      title: undefined,
      description: undefined,
      assignee: undefined,
      status: 'todo',
      priority: undefined,
    },
    validationSchema: issueValidation,
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const handleFormClose = () => {
    formik.resetForm();
    props.closeForm();
  };

  return (
    <Dialog
      open={props.formOpen}
      scroll="body"
      fullWidth
      onClose={handleFormClose}
    >
      <form onSubmit={formik.handleSubmit}>
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
        <FormTextField
          name="title"
          label="Issue Title"
          size="medium"
          onChange={formik.handleChange}
          value={formik.values.title}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
        />
        <br />
        <Divider />
        <br />
        <FormTextField
          name="description"
          label="Description"
          multiline={true}
          onChange={formik.handleChange}
          value={formik.values.description}
          error={
            formik.touched.description && Boolean(formik.errors.description)
          }
          helperText={formik.touched.description && formik.errors.description}
        />
        <FormTextField
          name="assignee"
          label="Assignee"
          onChange={formik.handleChange}
          value={formik.values.assignee}
          error={formik.touched.assignee && Boolean(formik.errors.assignee)}
          helperText={formik.touched.assignee && formik.errors.assignee}
        />
        <FormSelectField
          name="status"
          label="Status"
          onChange={formik.handleChange}
          value={formik.values.priority}
          error={formik.touched.priority && Boolean(formik.errors.priority)}
          helperText={formik.touched.priority && formik.errors.priority}
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
        <FormSelectField
          name="priority"
          label="Priority"
          options={[
            {
              label: 'High',
              value: 'high',
            },
            {
              label: 'Medium',
              value: 'medium',
            },
            {
              label: 'Low',
              value: 'Low',
            },
          ]}
        />
        <DialogActions className="flex items-center justify-between m-0 p-4">
          <Button onClick={handleFormClose}>Close</Button>
          <Button
            variant="contained"
            color="primary"
            className="bg-blue-600"
            type="submit"
          >
            save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
