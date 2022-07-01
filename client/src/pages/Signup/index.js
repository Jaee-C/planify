import React from "react";
import { 
  Card,
  CardBody,
  Container,
  Row,
  Col,
} from "reactstrap";

import SignupForm from "./SignupForm";

const Signup = () => (
  <Container className="py-5 h-100">
      <Row className="d-flex align-items-center justify-content-center h-100">
        <Col lg="5" className="me-5">
          <Card className="shadow-lg" style={{borderRadius: "15px" }}>
            <CardBody className="py-5 px-5">
              <SignupForm />
            </CardBody>
          </Card>
        </Col>

        <Col lg="6" className="mb-5 mb-lg-0 d-lg-block d-none">
        <h1 class="my-5 display-4 fw-bold ls-tight">
            The best issue tracker <br />
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

export default Signup;
