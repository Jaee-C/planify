import React from "react";
import {
  Button,
  FormGroup,
  FormFeedback,
  Input,
  Label,
  Row,
  Col,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faFacebookF } from "@fortawesome/free-brands-svg-icons";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Divider from "../../components/Divider";

const SignupSchema = Yup.object().shape({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  email: Yup.string().required("Required").email("Invalid email"),
  password: Yup.string().required("Required"),
  passwordRepeat: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

const SignupForm = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordRepeat: "",
    },
    validationSchema: SignupSchema,
    onSubmit: () => {
      navigate("/", { replace: true });
    },
  });

  return (
    <form autoComplete="off" onSubmit={formik.handleSubmit}>
      <h3 className="text-center mb-4">Sign up</h3>
      {/* Form input for first name and last name */}
      <Row>
        <Col md="6">
          <FormGroup floating>
            <Input
              type="text"
              placeholder="First Name"
              name="firstName"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              invalid={
                formik.touched.firstName && Boolean(formik.errors.firstName)
              }
            />
            <Label className="form-label">First Name</Label>
            <FormFeedback>{formik.errors.firstName}</FormFeedback>
          </FormGroup>
        </Col>

        <Col md="6">
          <FormGroup floating>
            <Input
              type="text"
              placeholder="Last Name"
              name="lastName"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              invalid={
                formik.touched.lastName && Boolean(formik.errors.lastName)
              }
            />
            <Label className="form-label">Last Name</Label>
            <FormFeedback>{formik.errors.lastName}</FormFeedback>
          </FormGroup>
        </Col>
      </Row>

      {/* Email input */}
      <FormGroup floating>
        <Input
          type="email"
          placeholder="Email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          invalid={formik.touched.email && Boolean(formik.errors.email)}
        />
        <Label className="form-label">Email</Label>
        <FormFeedback>{formik.errors.email}</FormFeedback>
      </FormGroup>

      {/* Password input */}
      <FormGroup floating>
        <Input
          type="password"
          placeholder="Password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          invalid={formik.touched.password && Boolean(formik.errors.password)}
        />
        <Label className="form-label">Password</Label>
        <FormFeedback>{formik.errors.password}</FormFeedback>
      </FormGroup>

      {/* Confirm Password input */}
      <FormGroup floating>
        <Input
          type="password"
          placeholder="Confirm Password"
          name="passwordRepeat"
          value={formik.values.passwordRepeat}
          onChange={formik.handleChange}
          invalid={
            formik.touched.passwordRepeat &&
            Boolean(formik.errors.passwordRepeat)
          }
        />
        <Label className="form-label">Confirm Password</Label>
        <FormFeedback>{formik.errors.passwordRepeat}</FormFeedback>
      </FormGroup>

      <Button type="submit" color="primary" block className="mb-4">
        Sign Up
      </Button>

      {/* Alt sign up methods */}
      <div className="text-center">
        <Divider> OR </Divider>
        <Button type="button" className="mx-1">
          <FontAwesomeIcon icon={faGoogle}></FontAwesomeIcon>
        </Button>
        <Button type="button" className="mx-1">
          <FontAwesomeIcon icon={faFacebookF}></FontAwesomeIcon>
        </Button>
      </div>
    </form>
  );
};

export default SignupForm;
