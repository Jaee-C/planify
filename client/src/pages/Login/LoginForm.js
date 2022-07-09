import React from "react";
import {
  FormGroup,
  FormFeedback,
  Input,
  Label,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faFacebookF } from "@fortawesome/free-brands-svg-icons";
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Divider from "../../components/Divider";
import Button from "../../components/Button";

const LoginSchema = Yup.object().shape({
  email: Yup.string().required("Required").email("Invalid email"),
  password: Yup.string().required("Required"),
});

const LoginForm = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: () => {
      console.log("hi");
      navigate("/home");
    },
  });

  return (
    <form autoComplete="off" onSubmit={formik.handleSubmit}>
      <h3 className="mb-5">Log in</h3>
      {/* Email input */}
      <FormGroup floating className="mb-4">
        <Input
          type="email"
          placeholder="Email"
          bsSize="lg"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          invalid={formik.touched.email && Boolean(formik.errors.email)}
        />
        <Label className="form-label">Email</Label>
        <FormFeedback>{formik.errors.email}</FormFeedback>
      </FormGroup>

      {/* Password Input */}
      <FormGroup floating className="mb-4">
        <Input
          type="password"
          placeholder="Password"
          bsSize="lg"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          invalid={formik.touched.password && Boolean(formik.errors.password)}
        />
        <Label className="form-label">Password</Label>
        <FormFeedback>{formik.errors.password}</FormFeedback>
      </FormGroup>

      <div className="d-flex justify-content-around align-items-center mb-4">
        {/* Checkbox */}
        <FormGroup check>
          <Input type="checkbox" value="rmb" />
          <Label check> Remember me </Label>
        </FormGroup>
        <a href="#!" className="text-primary">
          Forgot password?
        </a>
      </div>

      {/* Submit Button */}
      <Button size="lg" block color="primary" className="mb-3" type="submit">
        Login
      </Button>

      <p class="mb-5 pb-lg-2" color="primary">
        Don't have an account?{" "}
        <a href="#!" className="text-primary">
          Register here
        </a>
      </p>

      <Divider>OR</Divider>

      <Button
        size="lg"
        block
        color="primary"
        className="mb-2"
        style={{ backgroundColor: "#dd4b39" }}
        role="a"
        href="/home"
      >
        <FontAwesomeIcon icon={faGoogle} className="me-2" />
        Sign in with google
      </Button>
      <Button
        size="lg"
        block
        color="primary"
        className=" mb-2"
        style={{ backgroundColor: "#3b5998" }}
        role="a"
        href="/home"
      >
        <FontAwesomeIcon icon={faFacebookF} className="me-2"></FontAwesomeIcon>
        Sign in with facebook
      </Button>
      <Button
        size="lg"
        block
        color="secondary"
        className=" mb-2"
        role="a"
        href="/home"
      >
        <FontAwesomeIcon icon={faUserSecret} className="me-2"></FontAwesomeIcon>
        Try out a Demo Account
      </Button>
    </form>
  );
};

export default LoginForm;
