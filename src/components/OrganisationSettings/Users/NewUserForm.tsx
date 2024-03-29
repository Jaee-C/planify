import React from "react";
import { TextField } from "@/core/ui";
import { FormikHelpers, useFormik } from "formik";
import * as yup from "yup";

import styles from "./styles.module.css";
import { useMutation, useQueryClient } from "react-query";
import { inviteUser } from "@/lib/client-data/users";
import { useRouter } from "next/router";
import { verifyUrlParam } from "@/lib/utils";

interface UserForm {
  email: string;
}

const validation = yup.object({
  email: yup
    .string()
    .email("Must enter a valid email")
    .required("Must enter a valid email"),
});

interface Props {
  setAlert: (_: string) => void;
}

export default function NewUserForm(props: Props): JSX.Element {
  const router = useRouter();
  const { orgKey } = router.query;
  const organisation: string = verifyUrlParam(orgKey);
  const queryClient = useQueryClient();
  const inviteUserMutation = useMutation(
    (data: UserForm) => inviteUser(organisation, data),
    {
      onSuccess: () => {
        props.setAlert("The user has been added to this organisation");
        queryClient.invalidateQueries(["users", organisation]);
      },
    }
  );
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validation,
    onSubmit: (e: UserForm, { resetForm }: FormikHelpers<UserForm>): void => {
      inviteUserMutation.mutate(e);
      resetForm();
    },
  });

  return (
    <>
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
    </>
  );
}
