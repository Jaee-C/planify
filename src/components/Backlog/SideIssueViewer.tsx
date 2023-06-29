import * as React from "react";
import { NextRouter, useRouter } from "next/router";
import { useContext } from "react";
import { SidebarEditContext } from "@/components/Backlog/index";
import InlineTextField from "@/components/Form/InlineEdit/InlineTextField";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import { getIssue, editIssue } from "@/components/data/issues";
import * as Yup from "yup";
import { Button, Divider, Grid, styled } from "@mui/material";
import FormTextField from "@/components/Form/FormTextField";
import TextFieldLabel from "@/components/Form/TextFieldLabel";
import FormSelectField from "@/components/Form/FormSelectField";
import {
  ISSUE_PRIORITIES,
  ISSUE_STATUSES,
} from "@/components/Form/FormConstants";
import { Issue } from "@/interfaces";
import { FormikProps, useFormik } from "formik";

const FormRow = styled(Grid)(() => ({
  "&.MuiGrid-item": {
    paddingTop: "24px",
    fontSize: "0.875rem",
  },
}));

export default function SideIssueViewer(): JSX.Element {
  const router: NextRouter = useRouter();
  const { pid } = router.query;
  const { value: issueKey, action: handleEdit } =
    useContext(SidebarEditContext);
  const [title, setTitle] = React.useState<string>("");

  const queryClient: QueryClient = useQueryClient();
  const {
    data: editingIssue,
    isLoading,
    error,
  } = useQuery(
    ["issue", issueKey],
    async () => getIssue(Number(pid), issueKey),
    {
      enabled: !!pid,
      onSuccess: (data: Issue | undefined): void => {
        if (data === undefined) {
          handleClose();
          return;
        }
        setTitle(data.title ? data.title : "");
      },
    }
  );

  if (isLoading || error) {
    return <div></div>;
  }

  const editIssueMutation = useMutation(
    async (data: any) => await editIssue(Number(pid), issueKey, data),
    {
      onSuccess: async (): Promise<void> => {
        await queryClient.invalidateQueries(["issues", Number(pid)]);
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
      status: editingIssue?.status ? editingIssue.status : 1,
      priority: editingIssue?.priority ? editingIssue.priority : 1,
      assignee: editingIssue?.assignee ? editingIssue.assignee : "",
      reporter: "",
    },
    onSubmit: (values: formValues): void => {
      console.log("Good job");
    },
  });

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
                  <FormSelectField
                    name="status"
                    label="Status"
                    onChange={formik.handleChange}
                    value={formik.values.status}
                    error={
                      formik.touched.status && Boolean(formik.errors.status)
                    }
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
                    helperText={
                      formik.touched.priority && formik.errors.priority
                    }
                    options={ISSUE_PRIORITIES}
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
