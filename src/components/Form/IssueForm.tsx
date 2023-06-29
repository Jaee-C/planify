import "react";
import { NextRouter, useRouter } from "next/router";
import { Button, Divider, Grid, styled } from "@mui/material";
import FormTextField from "@/components/Form/FormTextField";
import TextFieldLabel from "@/components/Form/TextFieldLabel";
import FormSelectField from "@/components/Form/FormSelectField";
import React, { useState } from "react";
import * as yup from "yup";
import { QueryClient, useMutation, useQueryClient } from "react-query";
import { FormikProps, useFormik } from "formik";
import { EMPTY_FORM, ISSUE_PRIORITIES, ISSUE_STATUSES } from "./FormConstants";
import { addIssue } from "@/components/data/issues";
import { Issue } from "@/interfaces";

const FormRow = styled(Grid)(() => ({
  "&.MuiGrid-item": {
    paddingTop: "24px",
    fontSize: "0.875rem",
  },
}));

const issueValidation = yup.object({
  title: yup.string().required("Enter a title"),
  description: yup.string().optional(),
  assignee: yup.string().optional(),
  reporter: yup.string().optional(),
  status: yup.number().oneOf([1, 2, 3]).required(),
  priority: yup.string().oneOf(["low", "medium", "high"]).optional(),
});

export interface IssueFormProps {
  formOpen: boolean;
  closeForm: () => void;
  editingIssue?: Issue;
}

export default function IssueForm(props: IssueFormProps): JSX.Element {
  const router: NextRouter = useRouter();
  const { pid } = router.query;
  const queryClient: QueryClient = useQueryClient();
  const newIssueMutation = useMutation((data: Issue) => addIssue(1, data));
  const [editValue, setEditValue] = useState<string>("abcd");

  const baseForm: Issue = EMPTY_FORM();
  if (props.editingIssue !== undefined) {
    baseForm.id = props.editingIssue.id;
    baseForm.title = props.editingIssue.title;
    baseForm.assignee = props.editingIssue.assignee;
    baseForm.status = props.editingIssue.status;
  }

  const formik: FormikProps<Issue> = useFormik<Issue>({
    initialValues: baseForm,
    validationSchema: issueValidation,
    onSubmit: (values: Issue): void => {
      if (!values.assignee) {
        values.assignee = "Daniel";
      }
      newIssueMutation.mutate(values, {
        onSuccess: async () => {
          await queryClient.invalidateQueries(["issues", Number(pid)]);
        },
        onSettled: () => {
          formik.resetForm();
          props.closeForm();
        },
      });
    },
  });

  const handleFormClose = (): void => {
    props.closeForm();
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <form onSubmit={formik.handleSubmit}>
          <Grid container>
            <Grid item xs={12}>
              <FormTextField
                name="title"
                label="Title"
                size="medium"
                onChange={formik.handleChange}
                value={formik.values.title}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
              />
            </Grid>
            <FormRow item xs={12}>
              <TextFieldLabel textLabel="Description: ">
                <FormTextField
                  name="description"
                  multiline={true}
                  placeholder="Enter a description"
                  onChange={formik.handleChange}
                  value={formik.values.description}
                  error={
                    formik.touched.description &&
                    Boolean(formik.errors.description)
                  }
                  helperText={
                    formik.touched.description && formik.errors.description
                  }
                />
              </TextFieldLabel>
            </FormRow>
            <br />
            <Divider />
            <br />
            <FormRow item xs={12}>
              <TextFieldLabel textLabel="Assignee: ">
                <FormTextField
                  name="assignee"
                  onChange={formik.handleChange}
                  value={formik.values.assignee}
                  error={
                    formik.touched.assignee && Boolean(formik.errors.assignee)
                  }
                  helperText={formik.touched.assignee && formik.errors.assignee}
                />
              </TextFieldLabel>
            </FormRow>
            <FormRow item xs={12}>
              <TextFieldLabel textLabel="Reporter: ">
                <FormTextField
                  name="reporter"
                  onChange={formik.handleChange}
                  value={formik.values.reporter}
                  error={
                    formik.touched.reporter && Boolean(formik.errors.reporter)
                  }
                  helperText={formik.touched.reporter && formik.errors.reporter}
                />
              </TextFieldLabel>
            </FormRow>
            <FormRow item xs={12}>
              <TextFieldLabel textLabel="Status: ">
                <FormSelectField
                  name="status"
                  label="Status"
                  onChange={formik.handleChange}
                  value={formik.values.status}
                  error={formik.touched.status && Boolean(formik.errors.status)}
                  helperText={formik.touched.status && formik.errors.status}
                  options={ISSUE_STATUSES}
                />
              </TextFieldLabel>
            </FormRow>
            <FormRow item xs={12}>
              <TextFieldLabel textLabel="Priority: ">
                <FormSelectField
                  name="priority"
                  label="Priority"
                  value={formik.values.priority}
                  error={
                    formik.touched.priority && Boolean(formik.errors.priority)
                  }
                  helperText={formik.touched.priority && formik.errors.priority}
                  options={ISSUE_PRIORITIES}
                />
              </TextFieldLabel>
            </FormRow>
            <Button onClick={handleFormClose}>Close</Button>
            <Button
              variant="contained"
              color="primary"
              className="bg-blue-600"
              type="submit">
              save
            </Button>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
}
