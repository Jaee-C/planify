import React from "react";
import { Container, Row, Col } from "reactstrap";

import LoginForm from "./LoginForm";

const Login = () =>  (
  <Container className="py-5 h-100">
    <Row className="d-flex align-items-center justify-content-center h-100">
      <Col lg="7" xl="6" className="d-none d-lg-block">
        <img
          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
          className="img-fluid"
          alt="Securing phone"
        />
      </Col>
      <Col md="7" lg="5" xl="5" className="offset-xl-1">
        <LoginForm />
      </Col>
    </Row>
  </Container>
);

export default Login;
