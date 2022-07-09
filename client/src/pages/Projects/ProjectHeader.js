import React, { useState } from "react";
import styled from "@emotion/styled";
import Button from "../../components/Button";
import CreateProject from "./CreateProject";

const Title = styled.h2`
  min-width: 0px;
  max-width: 100%;
  margin-bottom: 8px;
  flex: 1 1 auto;
`;

const SideButton = styled.div`
  max-width: 100%;
  margin-bottom: 8px;
  margin-left: auto;
  padding-left: 32px;
  flex: 0 0 auto;
  white-space: nowrap;
`;

const Row = styled.div`
  display: flex;
  align-items: flex-start;
  flex-wrap: nowrap;
`;

const ProjectHeader = () => {
  const [creatingProject, setCreatingProject] = useState(false);

  const toggleModal = () => {
    setCreatingProject(!creatingProject);
  }

  return (
    <div style={{ margin: "24px 0px 16px" }}>
      <Row>
        <Title>Projects</Title>
        <SideButton>
          <Button color="primary" type="button" onClick={toggleModal}>
            Create Project
          </Button>
          <CreateProject modal={creatingProject} toggle={toggleModal} />
        </SideButton>
      </Row>
    </div>
  );
};

export default ProjectHeader;
