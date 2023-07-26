import React from "react";
import { Button, TextField } from "@/core/ui";
import { useFormik } from "formik";
import * as Yup from "yup";

import styles from "./details.module.css";

const formValidation = Yup.object().shape({
  name: Yup.string()
    .min(2)
    .required("Give your project a name (longer than 2" + " characters"),
  key: Yup.string()
    .required("You must specify a valid project key.")
    .max(5, "Project key must be 5 characters or less."),
});

export default function Form(): JSX.Element {
  // const formik = useFormik({
  //   validationSchema: formValidation,
  // });

  return (
    <div>
      <form className={styles.form}>
        <TextField type="text" name="name" label="Name" />
        <TextField type="text" name="key" label="Key" />
        <Button type="submit" variant="contained">
          Save
        </Button>
      </form>
    </div>
  );
}
