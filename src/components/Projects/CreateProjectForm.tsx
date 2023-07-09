import React, { useContext } from "react";
import * as yup from "yup";
import { QueryClient, useMutation, useQueryClient } from "react-query";
import { ProjectFormValues, EMPTY_PROJECT_FORM } from "./FormConstants";
import { FormikProps, useFormik } from "formik";
import { CreateProjectContext } from "@/components/Projects";
import { Button, Grid, styled } from "@mui/material";
import FormTextField from "@/components/Form/FormTextField";
import TextFieldLabel from "@/components/Form/TextFieldLabel";
import { addProject } from "@/lib/data/projects";

const FormRow = styled(Grid)(() => ({
  "&.MuiGrid-item": {
    paddingTop: "24px",
    fontSize: "0.875rem",
  },
}));

const formValidation = yup.object({
  name: yup.string().required("Enter a name for your project"),
  description: yup.string().optional(),
  key: yup
    .string()
    .required("Enter a key")
    .max(4, "Must be no more than 5 characters"),
});

export default function CreateProjectForm(): JSX.Element {
  const createProjectContext = useContext(CreateProjectContext);
  const queryClient: QueryClient = useQueryClient();
  const newProjectMutation = useMutation((data: ProjectFormValues) =>
    addProject(data)
  );

  const formik: FormikProps<ProjectFormValues> = useFormik<ProjectFormValues>({
    initialValues: EMPTY_PROJECT_FORM,
    validationSchema: formValidation,
    onSubmit: (values: ProjectFormValues): void => {
      newProjectMutation.mutate(values, {
        onSuccess: async (): Promise<void> => {
          await queryClient.invalidateQueries(["projects"]);
        },
        onSettled: (): void => {
          formik.resetForm();
          createProjectContext.action();
        },
      });
    },
  });

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <form onSubmit={formik.handleSubmit}>
          <Grid container>
            <Grid item xs={12}>
              <FormTextField
                name="name"
                label="Name"
                size="medium"
                onChange={formik.handleChange}
              />
            </Grid>
            <FormRow item xs={12}>
              <TextFieldLabel textLabel="Project Key: ">
                <FormTextField
                  name="key"
                  placeholder="A key identifies issues in this project"
                  onChange={formik.handleChange}
                  value={formik.values.key}
                  error={formik.touched.key && Boolean(formik.errors.key)}
                  helperText="Must be 2-4 characters long"
                />
              </TextFieldLabel>
            </FormRow>
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
            <div className="w-full max-w-full flex justify-end mt-5">
              <Button onClick={createProjectContext.action}>Close</Button>
              <Button
                variant="contained"
                color="primary"
                className="bg-blue-600 ml-3"
                type="submit">
                save
              </Button>
            </div>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
}
