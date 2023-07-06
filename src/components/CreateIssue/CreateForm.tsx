import React from "react";
import * as yup from "yup";
import { NextRouter, useRouter } from "next/router";
import { QueryClient, useMutation, useQueryClient } from "react-query";
import { FormikProps, useFormik } from "formik";
import { Button, Divider, Grid, styled } from "@mui/material";
import { addIssue } from "@/lib/data/issues";
import { Issue } from "@/lib/types";
import { verifyUrlParam } from "@/lib/utils";
import FormTextField from "../Form/FormTextField";
import TextFieldLabel from "../Form/TextFieldLabel";
import FormSelectField from "../Form/FormSelectField";
import {
  EMPTY_FORM,
  ISSUE_PRIORITIES,
  ISSUE_STATUSES,
} from "../Form/FormConstants";
import StatusSelect from "./StatusSelect";

const FormRow = styled(Grid)(() => ({
  "&.MuiGrid-item": {
    paddingTop: "24px",
    fontSize: "0.875rem",
  },
}));

export interface IssueFormProps {
  formOpen: boolean;
  closeForm: () => void;
  editingIssue?: Issue;
}

export default function CreateForm(props: IssueFormProps): JSX.Element {
  const router: NextRouter = useRouter();
  const { pKey } = router.query;
  const projectKey: string = verifyUrlParam(pKey);
  const queryClient: QueryClient = useQueryClient();
  const newIssueMutation = useMutation((data: Issue) =>
    addIssue(projectKey, data)
  );

  const baseForm: Issue = EMPTY_FORM();
  if (props.editingIssue !== undefined) {
    baseForm.id = props.editingIssue.id;
    baseForm.title = props.editingIssue.title;
    baseForm.assignee = props.editingIssue.assignee;
    baseForm.status = props.editingIssue.status;
  }

  const issueValidation = yup.object({
    title: yup.string().required("Enter a title"),
    description: yup.string().optional(),
    assignee: yup.string().optional(),
    reporter: yup.string().optional(),
    status: yup.number().oneOf([1, 2, 3]).required(),
    priority: yup.string().oneOf(["low", "medium", "high"]).optional(),
  });

  const formik: FormikProps<Issue> = useFormik<Issue>({
    initialValues: baseForm,
    validationSchema: issueValidation,
    onSubmit: (values: Issue): void => {
      if (!values.assignee) {
        values.assignee = "Daniel";
      }
      newIssueMutation.mutate(values, {
        onSuccess: async (): Promise<void> => {
          await queryClient.invalidateQueries(["issues", projectKey]);
          console.log(projectKey);
        },
        onSettled: (): void => {
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
                <StatusSelect
                  handleChange={formik.handleChange}
                  value={formik.values.status}
                  error={formik.touched.status && Boolean(formik.errors.status)}
                  helperText={formik.touched.status && formik.errors.status}
                />
              </TextFieldLabel>
            </FormRow>
            <FormRow item xs={12}>
              <TextFieldLabel textLabel="Priority: ">
                <FormSelectField
                  name="priority"
                  label="Priority"
                  value={formik.values.priority?.id}
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
