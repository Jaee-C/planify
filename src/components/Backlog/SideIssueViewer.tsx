import * as React from "react";
import { NextRouter, useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { SidebarEditContext } from "@/components/Backlog/index";
import InlineTextField from "@/components/Form/InlineEdit/InlineTextField";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "react-query";
import { getIssue, editIssue } from "lib/data/issues";
import * as Yup from "yup";
import { Button, Divider, Grid, styled, TextField } from "@mui/material";
import FormTextField from "@/components/Form/FormTextField";
import TextFieldLabel from "@/components/Form/TextFieldLabel";
import FormSelectField from "@/components/Form/FormSelectField";
import {
  ISSUE_PRIORITIES,
  ISSUE_STATUSES,
} from "@/components/Form/FormConstants";
import { Issue, StatusType } from "lib/types";
import { FormikProps, useFormik } from "formik";
import { verifyUrlParam } from "@/lib/utils";
import { queryIssue, queryStatuses } from "@/lib/data/query";
import FormAutocomplete from "@/components/Form/FormAutocomplete";
import StatusSelect from "@/components/Form/StatusSelect";
import PrioritySelect from "@/components/Form/PrioritySelect";

const FormRow = styled(Grid)(() => ({
  "&.MuiGrid-item": {
    paddingTop: "24px",
    fontSize: "0.875rem",
  },
}));

export default function SideIssueViewer(): JSX.Element {
  const router: NextRouter = useRouter();
  const projectKey: string = verifyUrlParam(router.query.pKey);
  const { value: issueKey, action: handleEdit } =
    useContext(SidebarEditContext);
  const [title, setTitle] = React.useState<string | undefined>(undefined);

  const queryClient: QueryClient = useQueryClient();
  const {
    data: editingIssue,
    isLoading,
    error,
  }: UseQueryResult<Issue | undefined> = queryIssue(projectKey, issueKey);
  const { data: statuses } = queryStatuses(projectKey);

  useEffect((): void => {
    if (editingIssue === undefined) return;

    setTitle(editingIssue.title ? editingIssue.title : "");
  }, [editingIssue]);

  const editIssueMutation = useMutation(
    async (data: any) => await editIssue(projectKey, issueKey, data),
    {
      onSuccess: async (): Promise<void> => {
        await queryClient.invalidateQueries(["issues", projectKey]);
      },
    }
  );

  const handleClose = (): void => {
    handleEdit("");
  };

  interface formValues {
    title: string;
    description: string;
    status: number;
    priority: number;
    assignee: string;
    reporter: string;
  }

  const titleValidate: Yup.StringSchema = Yup.string().required("required");
  const formik: FormikProps<formValues> = useFormik<formValues>({
    initialValues: {
      title: "",
      description: editingIssue?.description ? editingIssue.description : "",
      status: statuses ? statuses[0] : 1,
      priority: editingIssue?.priority ? editingIssue.priority : 1,
      assignee: editingIssue?.assignee ? editingIssue.assignee : "",
      reporter: "",
    },
    onSubmit: (values: formValues): void => {
      console.log("Good job", values);
    },
  });

  if (isLoading || error || !editingIssue) {
    return <div>loading...</div>;
  }

  return (
    <div className="px-5">
      <InlineTextField
        onConfirm={setTitle}
        defaultValue={title}
        validate={titleValidate}
        readViewFitContainerWidth
      />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <form onSubmit={formik.handleSubmit}>
            <Grid container>
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
                    helperText={
                      formik.touched.assignee && formik.errors.assignee
                    }
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
                    helperText={
                      formik.touched.reporter && formik.errors.reporter
                    }
                  />
                </TextFieldLabel>
              </FormRow>
              <FormRow item xs={12}>
                <TextFieldLabel textLabel="Status: ">
                  <StatusSelect
                    issueKey={issueKey}
                    defaultValue={new StatusType(1, "To Do")}
                  />
                </TextFieldLabel>
              </FormRow>
              <FormRow item xs={12}>
                <TextFieldLabel textLabel="Priority: ">
                  <PrioritySelect
                    issueKey={issueKey}
                    defaultValue={formik.values.priority}
                  />
                </TextFieldLabel>
              </FormRow>
              <Button onClick={handleClose}>Close</Button>
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
    </div>
  );
}
