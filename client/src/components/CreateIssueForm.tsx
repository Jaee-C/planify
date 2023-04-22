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
import {useMutation, useQueryClient} from 'react-query';

import FormTextField from '@/components/Form/FormTextField';
import FormSelectField from '@/components/Form/FormSelectField';
import {Data} from '@/interfaces';

const ISSUE_STATUSES = [
  {
    label: 'Done',
    value: 'Done',
  },
  {
    label: 'In Progress',
    value: 'In Progress',
  },
  {
    label: 'To Do',
    value: 'To Do',
  },
];

const ISSUE_PRIORITIES = [
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
    value: 'low',
  },
];

const EMPTY_FORM = {
  key: 'IT-69',
  title: '',
  description: '',
  assignee: '',
  reporter: '',
  status: 'To Do',
  priority: 'low',
};

interface CreateIssueFormProps {
  formOpen: boolean;
  closeForm: () => void;
  editingIssue?: Data;
}

const issueValidation = yup.object({
  key: yup.string(),
  title: yup.string().required('Enter a title'),
  description: yup.string().optional(),
  assignee: yup.string().optional(),
  reporter: yup.string().optional(),
  status: yup.string().oneOf(['To Do', 'In Progress', 'Done']).required(),
  priority: yup.string().oneOf(['low', 'medium', 'high']).optional(),
});

function addIssue(data: Data) {
  return fetch('/api/issues', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}

export default function CreateIssueForm(props: CreateIssueFormProps) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: addIssue,
    onSuccess: () => {
      queryClient.invalidateQueries('issues');
    },
  });

  const baseForm = EMPTY_FORM;
  if (props.editingIssue !== undefined) {
    baseForm.key = props.editingIssue.key;
    baseForm.title = props.editingIssue.title;
    baseForm.assignee = props.editingIssue.assignee;
    baseForm.status = props.editingIssue.status;
  } else {
    baseForm.key = 'IT-69';
    baseForm.title = '';
    baseForm.assignee = 'Daniel';
    baseForm.status = 'To Do';
  }

  const formik = useFormik({
    initialValues: baseForm,
    validationSchema: issueValidation,
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
      values.key = 'IT-69';
      if (!values.assignee) {
        values.assignee = 'Daniel';
      }
      mutation.mutate(values);

      handleFormClose();
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
        <FormTextField
          name="reporter"
          label="Reporter"
          onChange={formik.handleChange}
          value={formik.values.reporter}
          error={formik.touched.reporter && Boolean(formik.errors.reporter)}
          helperText={formik.touched.reporter && formik.errors.reporter}
        />
        <FormSelectField
          name="status"
          label="Status"
          onChange={formik.handleChange}
          value={formik.values.status}
          error={formik.touched.status && Boolean(formik.errors.status)}
          helperText={formik.touched.status && formik.errors.status}
          options={ISSUE_STATUSES}
        />
        <FormSelectField
          name="priority"
          label="Priority"
          value={formik.values.priority}
          error={formik.touched.priority && Boolean(formik.errors.priority)}
          helperText={formik.touched.priority && formik.errors.priority}
          options={ISSUE_PRIORITIES}
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
