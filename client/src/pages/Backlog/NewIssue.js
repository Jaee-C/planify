import React, { useState } from "react";
import styled from "@emotion/styled";
import { useFormik } from "formik";
import { useMutation } from "react-query";

import Row from "../../components/Row";
import Col from "../../components/Col";
import Container from "../../components/IssueContainer";
import Input from "../../components/Input";
import { addIssue } from "../../utils/api";

const NewIssueContainer = styled(Container)`
  border-left: none;
  border-right: none;
  border-bottom: none;
  &:hover {
    background-color: #f2f3f5;
  }
`;

const NewIssue = ({ projectKey }) => {
  const mutation = useMutation(newIssue => ( addIssue(newIssue) ));
  const [creatingIssue, setCreatingIssue] = useState(false);
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      assignee: "",
      status: "TODO",
      projectKey: projectKey,
      order: 0,
    },
    onSubmit: (values) => {
      console.log(values);
      mutation.mutate(values);
      setCreatingIssue(false);
    },
  });

  const handleFocus = () => {
    setCreatingIssue(true);
  };

  const handleBlur = () => {
    setCreatingIssue(false);
  };

  return (
    <NewIssueContainer onClick={handleFocus} onBlur={handleBlur}>
      <Row className="issue-item">
        {creatingIssue ? (
          <form style={{ width: "100%" }} onSubmit={formik.handleSubmit}>
            <Input
              type="text"
              placeholder="What needs to be done?"
              name="title"
              onChange={formik.handleChange}
              autoFocus
            />
          </form>
        ) : (
          <>
            <Col>+</Col>
            <Col>Create issue</Col>
          </>
        )}
      </Row>
    </NewIssueContainer>
  );
};

export default NewIssue;
