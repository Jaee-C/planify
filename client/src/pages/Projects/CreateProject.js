import React from "react";
import styled from "@emotion/styled";
import { Modal, FormGroup, Label, ModalFooter } from "reactstrap";
import Input from "../../components/Input";
import Button from "../../components/Button";

const Div = styled.div`
  height: 100%;
  place-content: start center;
  display: flex;
  -webkit-box-pack: center;
  margin: 0px auto;
  width: 1200px;
`;

const Body = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  -webkit-box-pack: center;
  justify-content: center;
  width: 900px;
`;

const Form = styled.form`
  width: 500px;
`;

const Divider = styled.hr`
  display: block;
  unicode-bidi: isolate;
  margin-block-start: 0.5em;
  margin-block-end: 0.5em;
  margin-inline-start: auto;
  margin-inline-end: auto;
  overflow: hidden;
`;

const CreateProject = ({ modal, toggle }) => {
  return (
    <Modal isOpen={modal} toggle={toggle} backdrop={false} fullscreen>
      <Div>
        <Body>
          <Form>
            <h2>Create a project</h2>
            <p>You can change these details in your project settings</p>
            <FormGroup>
              <Label>Name</Label>
              <Input type="text" name="projectName" />
            </FormGroup>
            <FormGroup>
              <Label>Key</Label>
              <Input type="text" name="projectKey" className="w-50" />
            </FormGroup>
          </Form>
          <Divider />
          <ModalFooter>
            <Button onClick={toggle}>Cancel</Button>
            <Button color="primary" onClick={function noRefCheck() {}}>
              Create Project
            </Button>{" "}
          </ModalFooter>
        </Body>
      </Div>
    </Modal>
  );
};

export default CreateProject;
