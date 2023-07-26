import React from "react";
import * as yup from "yup";
import { NextRouter, useRouter } from "next/router";
import { useMutation } from "react-query";
import { FormikProps, useFormik } from "formik";
import { Alert, Button, Divider, Grid, styled } from "@mui/material";
import { addIssue } from "@/lib/client-data/issues";
import { Issue } from "@/lib/shared";
import { verifyUrlParam } from "@/lib/utils";
import FormTextField from "../Form/FormTextField";
import TextFieldLabel from "../Form/TextFieldLabel";
import { EMPTY_FORM } from "./FormConstants";
import StatusSelect from "./StatusSelect";
import PrioritySelect from "@/components/CreateIssue/PrioritySelect";
import { useSetAtom } from "jotai";
import { addOneIssueAtom } from "@/components/utils/atom";
import { createGridRowFromIssue } from "@/components/Backlog/utils";
import AppError from "@/lib/service/AppError";
import { LoadingButton } from "@mui/lab";
import { IssueFormValues } from "@/lib/shared/Issue";

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
  const newIssueMutation = useMutation(
    (data: IssueFormValues) => addIssue(projectKey, data),
    {
      onError: (err: AppError): void => {
        setError(err);
      },
    }
  );
  const addToIssueRow = useSetAtom(addOneIssueAtom);
  const [error, setError] = React.useState<AppError | null>(null);
  const [formSubmit, setFormSubmit] = React.useState<boolean>(false);

  const baseForm: IssueFormValues = EMPTY_FORM;

  const issueValidation = yup.object({
    title: yup.string().required("Enter a title"),
    description: yup.string().optional(),
    status: yup.number().oneOf([-1, 1, 2, 3]).required(),
    priority: yup.number().optional(),
  });

  const formik: FormikProps<IssueFormValues> = useFormik<IssueFormValues>({
    initialValues: baseForm,
    validationSchema: issueValidation,
    onSubmit: (values: IssueFormValues): void => {
      if (values.priority === -1) {
        delete values.priority;
      }
      setFormSubmit(true);
      newIssueMutation.mutate(values, {
        onSuccess: async (res: Issue): Promise<void> => {
          addToIssueRow(createGridRowFromIssue(res));
          console.log(values);
          setFormSubmit(false);
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
            {error !== null ? (
              <Alert severity="error" onClose={() => setError(null)}>
                {error.message}
              </Alert>
            ) : null}
            <Grid item xs={12}>
              <FormTextField
                name="title"
                label="Title"
                size="medium"
                onChange={formik.handleChange}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
              />
            </Grid>
            <FormRow item xs={12}>
              <TextFieldLabel textLabel="Description: ">
                <FormTextField
                  disabled
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
                    "Description can be added by editing the issue after creation"
                  }
                />
              </TextFieldLabel>
            </FormRow>
            <br />
            <Divider />
            <br />
            {/* <FormRow item xs={12}> */}
            {/*   <TextFieldLabel textLabel="Assignee: "> */}
            {/*     <FormTextField */}
            {/*       name="assignee" */}
            {/*       onChange={formik.handleChange} */}
            {/*       value={formik.values.assignee} */}
            {/*       error={ */}
            {/*         formik.touched.assignee && Boolean(formik.errors.assignee) */}
            {/*       } */}
            {/*       helperText={formik.touched.assignee && formik.errors.assignee} */}
            {/*     /> */}
            {/*   </TextFieldLabel> */}
            {/* </FormRow> */}
            {/* <FormRow item xs={12}> */}
            {/*   <TextFieldLabel textLabel="Reporter: "> */}
            {/*     <FormTextField */}
            {/*       name="reporter" */}
            {/*       onChange={formik.handleChange} */}
            {/*       value={formik.values.reporter} */}
            {/*       error={ */}
            {/*         formik.touched.reporter && Boolean(formik.errors.reporter) */}
            {/*       } */}
            {/*       helperText={formik.touched.reporter && formik.errors.reporter} */}
            {/*     /> */}
            {/*   </TextFieldLabel> */}
            {/* </FormRow> */}
            <FormRow item xs={12}>
              <TextFieldLabel textLabel="Status: ">
                <StatusSelect
                  handleChange={formik.handleChange}
                  error={formik.touched.status && Boolean(formik.errors.status)}
                  helperText={formik.touched.status && formik.errors.status}
                />
              </TextFieldLabel>
            </FormRow>
            <FormRow item xs={12}>
              <TextFieldLabel textLabel="Priority: ">
                <PrioritySelect
                  handleChange={formik.handleChange}
                  error={
                    formik.touched.priority && Boolean(formik.errors.priority)
                  }
                />
              </TextFieldLabel>
            </FormRow>
            <div className="w-full max-w-full flex justify-end mt-5">
              <Button onClick={handleFormClose}>Close</Button>
              <LoadingButton
                loading={formSubmit}
                variant="contained"
                color="primary"
                className="bg-blue-600 ml-3"
                type="submit">
                save
              </LoadingButton>
            </div>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
}
