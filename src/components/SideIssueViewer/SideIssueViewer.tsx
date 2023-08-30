import * as React from "react";
import { NextRouter, useRouter } from "next/router";
import { useContext, useEffect } from "react";
import * as Yup from "yup";
import { Divider, Grid, styled, Typography } from "@mui/material";
import { Issue } from "@/lib/shared";
import { verifyUrlParam } from "@/lib/utils";
import { queryIssue } from "@/lib/client-data/query";
import { SidebarEditContext } from "@/components/Backlog";
import InlineTextField from "@/components/utils/Form/InlineEdit/InlineTextField";
import {
  QueryClient,
  useMutation,
  useQueryClient,
  UseQueryResult,
} from "react-query";
import { editIssue } from "@/lib/client-data/issues";
import FormTextField from "@/components/utils/Form/FormTextField";
import TextFieldLabel from "@/components/utils/Form/TextFieldLabel";

import StatusSelect from "./StatusSelect";
import PrioritySelect from "./PrioritySelect";
import SideActionBar from "./SideActionBar";
import DescriptionEditor from "@/components/SideIssueViewer/DescriptionEditor";

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
  const organisation: string = verifyUrlParam(router.query.orgKey);
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
  }: UseQueryResult<Issue | undefined> = queryIssue(
    organisation,
    projectKey,
    issueKey
  );

  useEffect((): void => {
    if (editingIssue === undefined) return;

    setTitle(editingIssue.title ? editingIssue.title : "");
    setDescription(editingIssue.description ? editingIssue.description : "");
  }, [editingIssue]);

  const editIssueMutation = useMutation(
    async (data: any) =>
      await editIssue(organisation, projectKey, issueKey, data),
    {
      onSuccess: async (): Promise<void> => {
        await queryClient.invalidateQueries(["issues", projectKey]);
      },
    }
  );

  const handleClose = (): void => {
    handleEdit("");
  };

  const titleValidate: Yup.StringSchema = Yup.string().required("required");

  if (isLoading || error || !editingIssue) {
    return <div>loading...</div>;
  }

  const editTitle = (newTitle: string): void => {
    if (newTitle === title) return;
    editIssueMutation.mutate({ title: newTitle });
    setTitle(newTitle);
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
          <Grid container>
            <FormRow item xs={12}>
              <Typography className="font-medium text-sm text-stone-700 mb-2">
                Description
              </Typography>
              <DescriptionEditor
                issueKey={issueKey}
                defaultValue={editingIssue.description}
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
                  placeholder="disabled"
                  disabled
                />
              </TextFieldLabel>
            </FormRow>
            <FormRow item xs={12}>
              <TextFieldLabel textLabel="Reporter: ">
                <FormTextField
                  name="reporter"
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
        </Grid>
      </Grid>
    </div>
  );
}
