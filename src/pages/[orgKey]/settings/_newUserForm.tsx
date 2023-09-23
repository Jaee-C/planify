import React from "react";
import { TextField } from "@/core/ui";
import { FormikHelpers, useFormik } from "formik";
import * as yup from "yup";

import styles from "./styles.module.css";

interface UserForm {
  email: string;
}

const validation = yup.object({
  email: yup
    .string()
    .email("Must enter a valid email")
    .required("Must enter a valid email"),
});

export default function NewUserForm(): JSX.Element {
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validation,
    onSubmit: (e: UserForm, { resetForm }: FormikHelpers<UserForm>): void => {
      console.log(e.email);
      resetForm();
    },
  });

  return (
    <form className={styles.form} onSubmit={formik.handleSubmit}>
      <TextField
        placeholder="Email Address"
        name="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        error={Boolean(formik.touched.email && formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
      />
      <button className={styles.submitButton}>Invite to Organisation</button>
    </form>
  );
}
