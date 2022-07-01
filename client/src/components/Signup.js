import React from "react";
import {
  Button,
  Container,
  FormGroup,
  FormFeedback,
  Input,
  Label,
  Row,
  Col,
  Card,
  CardBody,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faFacebookF } from "@fortawesome/free-brands-svg-icons";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Divider from "./Divider/Divider";

const SignupSchema = Yup.object().shape({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  email: Yup.string().required("Required").email("Invalid email"),
  password: Yup.string().required("Required"),
  passwordRepeat: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

const Signup = () => {
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
      navigate("/home", { replace: true });
    },
  });

  return (
    <Container className="py-5 h-100">
      <Row className="d-flex align-items-center justify-content-center h-100">
        <Col lg="5" className="me-5">
          <Card className="shadow-lg" style={{borderRadius: "15px" }}>
            <CardBody className="py-5 px-md-5">
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
                      invalid={formik.touched.firstName && Boolean(formik.errors.firstName)}
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
                      invalid={formik.touched.lastName && Boolean(formik.errors.lastName)}
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
                  invalid={formik.touched.passwordRepeat && Boolean(formik.errors.passwordRepeat)}
                />
                <Label className="form-label">Confirm Password</Label>
                <FormFeedback>{formik.errors.passwordRepeat}</FormFeedback>
              </FormGroup>

              <Button type="submit" color="primary" block className="mb-4">Sign Up</Button>

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
            </CardBody>
          </Card>
        </Col>

        <Col lg="6" className="mb-5 mb-lg-0">
        <h1 class="my-5 display-3 fw-bold ls-tight">
            Best issue tracker <br />
            <span class="text-primary">for your projects</span>
          </h1>
          <p style={{color: "hsl(217, 10%, 50.8%)"}}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Eveniet, itaque accusantium odio, soluta, corrupti aliquam
            quibusdam tempora at cupiditate quis eum maiores libero
            veritatis? Dicta facilis sint aliquid ipsum atque?
          </p>
        </Col>
      </Row>


    </Container>
  );
};
// <div id="base">
//   <Box id="form-box">
//     <form autoComplete="off" onSubmit={formik.handleSubmit}>
//       <Grid container direction="column" spacing={3} id="form-container">
//         <Grid item>
//           <h2>Create an Account</h2>
//         </Grid>
//         <Grid item>
//         <TextField
//           fullWidth
//           id="email"
//           name="email"
//           label="Email"
//           value={formik.values.email}
//           onChange={formik.handleChange}
//           error={formik.touched.email && Boolean(formik.errors.email)}
//           helperText={formik.touched.email && formik.errors.email}
//         />
//         </Grid>
//         <Grid item>
//         <TextField
//           fullWidth
//           id="password"
//           name="password"
//           label="Password"
//           type="password"
//           value={formik.values.password}
//           onChange={formik.handleChange}
//           error={formik.touched.password && Boolean(formik.errors.password)}
//           helperText={formik.touched.password && formik.errors.password}
//         />
//         </Grid>
//         <Grid item>
//           <TextField
//             label="Confirm Password"
//             type="password"
//             name="passwordRepeat"
//             variant="outlined"
//             value={formik.values.passwordRepeat}
//             onChange={formik.handleChange}
//             error={formik.touched.passwordRepeat && Boolean(formik.errors.passwordRepeat)}
//             helperText={formik.touched.passwordRepeat && formik.errors.passwordRepeat}
//             fullWidth
//           />
//         </Grid>
//         <Grid item>
//           <Button variant="contained" type="submit">
//             Submit
//           </Button>
//         </Grid>
//         <Grid item>
//           <p>
//             Already have an account? <Link to="/">Log In</Link>
//           </p>
//           <p>
//             Or try out a <Link to="/home">Demo Account</Link>
//           </p>
//         </Grid>
//       </Grid>
//     </form>
//   </Box>
// </div>

export default Signup;
