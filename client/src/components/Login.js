import React from "react";
import { Button, Box, Grid, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "./Link";
import "./Login.css";

const LoginSchema = Yup.object().shape({
  email: Yup.string().required("Required").email("Invalid email"),
  password: Yup.string().required("Required"),
});

const Login = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: () => {
      navigate("/home", { replace: true });
    },
  });

  return (
    <div id="base">
      <Box id="form-box">
        <form autoComplete="off" onSubmit={formik.handleSubmit}>
          <Grid container direction="column" spacing={3} id="form-container">
            <Grid item>
              <h2>Login</h2>
            </Grid>
            <Grid item>
              <TextField
                fullWidth
                id="email"
                name="email"
                label="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid item>
            <TextField
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            </Grid>
            <Grid item>
              <Button variant="contained" type="submit">
                Submit
              </Button>
            </Grid>
            <Grid item>
              <p>
                New here? <Link to="/signup">Create an account</Link>
              </p>
              <p>
                Or try out a <Link to="/home">Demo Account</Link>
              </p>
            </Grid>
          </Grid>
        </form>
      </Box>
    </div>
  );
};

export default Login;
