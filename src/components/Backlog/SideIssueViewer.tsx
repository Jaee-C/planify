import * as React from "react";
import { NextRouter, useRouter } from "next/router";
import IssueForm from "@/components/Form/IssueForm";
import { FormikProps, useFormik } from "formik";
import { Issue } from "@/interfaces";
import { EMPTY_FORM } from "@/components/Form/FormConstants";
import { useContext } from "react";
import { SidebarEditContext } from "@/components/Backlog/index";
import * as yup from "yup";

const issueValidation = yup.object({
  title: yup.string().required("Enter a title"),
  description: yup.string().optional(),
  assignee: yup.string().optional(),
  reporter: yup.string().optional(),
  status: yup.number().oneOf([1, 2, 3]).required(),
  priority: yup.string().oneOf(["low", "medium", "high"]).optional(),
});

export default function SideIssueViewer(): JSX.Element {
  const router: NextRouter = useRouter();
  const { pid } = router.query;
  const editContext = useContext(SidebarEditContext);

  const baseForm: Issue = EMPTY_FORM();

  const formik: FormikProps<Issue> = useFormik<Issue>({
    initialValues: baseForm,
    validationSchema: issueValidation,
    onSubmit: (values: Issue): void => {
      if (!values.assignee) {
        values.assignee = "Daniel";
      }
      // newIssueMutation.mutate(values, {
      //   onSuccess: async () => {
      //     await queryClient.invalidateQueries(["issues", Number(pid)]);
      //   },
      //   onSettled: () => {
      //     formik.resetForm();
      //     editContext(0);
      //   },
      // });
    },
  });

  const handleClose = (): void => {
    editContext(0);
  };

  return (
    <div className="px-5">
      <IssueForm formOpen={true} closeForm={handleClose} />
    </div>
  );
}
