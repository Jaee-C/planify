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
import {addTodo} from '@/components/IssueTable/TodoSlice';

import FormTextField from '@/components/CreateIssueForm/FormTextField';
import FormSelectField from '@/components/CreateIssueForm/FormSelectField';
import {useAppDispatch} from '@/hooks';

const ISSUE_STATUSES = [
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

interface CreateIssueFormProps {
  formOpen: boolean;
  closeForm: () => void;
}

const issueValidation = yup.object({
  key: yup.string(),
  title: yup.string().required('Enter a title'),
  description: yup.string().optional(),
  assignee: yup.string().optional(),
  reporter: yup.string().optional(),
  status: yup.string().oneOf(['todo', 'in_progress', 'done']).required(),
  priority: yup.string().oneOf(['low', 'medium', 'high']).optional(),
});

export default function CreateIssueForm(props: CreateIssueFormProps) {
  const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues: {
      key: 'IT-69',
      title: '',
      description: '',
      assignee: '',
      reporter: '',
      status: 'todo',
      priority: 'low',
    },
    validationSchema: issueValidation,
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
      values.key = 'IT-69';
      if (!values.assignee) {
        values.assignee = 'Daniel';
      }
      dispatch(addTodo(values));
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
