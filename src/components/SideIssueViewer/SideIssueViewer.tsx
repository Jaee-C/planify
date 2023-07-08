import * as React from "react";
import { NextRouter, useRouter } from "next/router";
import { useContext, useEffect } from "react";
import * as Yup from "yup";
import { Divider, Grid, styled, Typography } from "@mui/material";
import { Issue } from "@/lib/types";
import { FormikProps, useFormik } from "formik";
import { verifyUrlParam } from "@/lib/utils";
import { queryIssue } from "@/lib/data/query";
import { SidebarEditContext } from "@/components/Backlog";
import InlineTextField from "@/components/Form/InlineEdit/InlineTextField";
import {
  QueryClient,
  useMutation,
  useQueryClient,
  UseQueryResult,
} from "react-query";
import { editIssue } from "@/lib/data/issues";
import FormTextField from "@/components/Form/FormTextField";
import TextFieldLabel from "@/components/Form/TextFieldLabel";

import StatusSelect from "./StatusSelect";
import PrioritySelect from "./PrioritySelect";
import SideActionBar from "./SideActionBar";

const FormRow = styled(Grid)(() => ({
  "&.MuiGrid-item": {
    paddingTop: "24px",
    fontSize: "0.875rem",
  },
}));

/**
 * Issue viewer that appears on the right side of the screen, typically in the
 * backlog page
 * @constructor
 */
export default function SideIssueViewer(): JSX.Element {
  const router: NextRouter = useRouter();
  const projectKey: string = verifyUrlParam(router.query.pKey);
  const { value: issueKey, action: handleEdit } =
    useContext(SidebarEditContext);
  const [title, setTitle] = React.useState<string | undefined>(undefined);
  const [description, setDescription] = React.useState<string | undefined>(
    undefined
  );

  const queryClient: QueryClient = useQueryClient();
  const {
    data: editingIssue,
    isLoading,
    error,
  }: UseQueryResult<Issue | undefined> = queryIssue(projectKey, issueKey);

  useEffect((): void => {
    if (editingIssue === undefined) return;

    setTitle(editingIssue.title ? editingIssue.title : "");
    setDescription(editingIssue.description ? editingIssue.description : "");
    formik.setFieldValue("assignee", editingIssue.assignee);
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
    assignee: string;
    reporter: string;
  }

  const titleValidate: Yup.StringSchema = Yup.string().required("required");
  const formik: FormikProps<formValues> = useFormik<formValues>({
    initialValues: {
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

  const editTitle = (newTitle: string): void => {
    if (newTitle === title) return;
    editIssueMutation.mutate({ title: newTitle });
    setTitle(newTitle);
  };
  const editDescription = (newDescription: string): void => {
    console.log(newDescription);
  };
  const createReadView = (value?: string): React.ReactNode => {
    return (
      <Typography
        color="text.primary"
        variant="h6"
        component="div"
        className={
          "flex max-w-full break-words border-solid border-2 border-transparent text-xl"
        }>
        {value ? value : "No value"}
      </Typography>
    );
  };

  const createDescriptionReadView = (value?: string): React.ReactNode => {
    const isPlaceholder: boolean = value === "" || value === undefined;
    const placeholderText: string = "Enter a description...";
    const textColor: string = isPlaceholder ? "text-gray-400" : "text-black";
    return (
      <Typography
        paragraph
        className={
          "flex max-w-full break-words border-solid border-transparent base" +
          " border-2 mb-0 " +
          textColor
        }>
        {isPlaceholder ? placeholderText : value}
      </Typography>
    );
  };

  return (
    <div className="px-5">
      <SideActionBar
        closeAction={handleClose}
        issueKey={editingIssue.issueKey}
      />
      <InlineTextField
        onConfirm={editTitle}
        defaultValue={title}
        validate={titleValidate}
        readView={createReadView(title)}
        readViewFitContainerWidth
      />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <form onSubmit={formik.handleSubmit}>
            <Grid container>
              <FormRow item xs={12}>
                <Typography className="font-medium text-sm text-stone-700 mb-2">
                  Description
                </Typography>
                <InlineTextField
                  multiline={true}
                  defaultValue={editingIssue.description}
                  onConfirm={editDescription}
                  readView={createDescriptionReadView(description)}
                  readViewFitContainerWidth
                />
              </FormRow>
              <br />
              <Divider />
              <br />
              <FormRow item xs={12}>
                <TextFieldLabel textLabel="Status: ">
                  <StatusSelect
                    issueKey={issueKey}
                    defaultValue={editingIssue.status}
                    hideToggle
                  />
                </TextFieldLabel>
              </FormRow>
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
                    placeholder="disabled"
                    disabled
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
                    placeholder="disabled"
                    disabled
                  />
                </TextFieldLabel>
              </FormRow>
              <FormRow item xs={12}>
                <TextFieldLabel textLabel="Priority: ">
                  <PrioritySelect
                    issueKey={issueKey}
                    defaultValue={editingIssue.priority}
                  />
                </TextFieldLabel>
              </FormRow>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </div>
  );
}
