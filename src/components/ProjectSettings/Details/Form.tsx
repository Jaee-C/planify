"use client";

import React from "react";
import { Button, TextField } from "@/core/ui";
import { useFormik } from "formik";
import * as Yup from "yup";

import styles from "./details.module.css";
import { useQuery } from "react-query";
import { editProject, getProjectDetails } from "@/lib/client-data/projects";
import { useRouter } from "next/router";
import { verifyUrlParam } from "@/lib/utils";
import { convertProjectToFormValues } from "@/components/ProjectSettings/utils";

const formValidation = Yup.object().shape({
  name: Yup.string()
    .min(2)
    .required("Give your project a name (longer than 2 characters"),
  key: Yup.string()
    .required("You must specify a valid project key.")
    .max(5, "Project key must be 5 characters or less."),
});

export default function Form(): JSX.Element {
  const router = useRouter();
  const pKey = router.query.pKey;
  const projectKey: string = verifyUrlParam(pKey);
  const { data } = useQuery(["project", projectKey], () =>
    getProjectDetails(projectKey)
  );
  const serverProjectDetails = convertProjectToFormValues(data);
  const formik = useFormik({
    validationSchema: formValidation,
    initialValues: serverProjectDetails,
    enableReinitialize: true,
    onSubmit: async (values): Promise<void> => {
      console.log(values);
      await editProject(values, projectKey);
    },
  });

  return (
    <div>
      <form className={styles.form} onSubmit={formik.handleSubmit}>
        <TextField
          type="text"
          name="name"
          label="Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={Boolean(formik.touched.name && formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
        <TextField
          type="text"
          name="key"
          label="Key"
          value={formik.values.key}
          onChange={formik.handleChange}
          error={Boolean(formik.touched.key && formik.errors.key)}
          helperText={formik.touched.key && formik.errors.key}
        />
        <Button type="submit" variant="contained">
          Save
        </Button>
      </form>
    </div>
  );
}
