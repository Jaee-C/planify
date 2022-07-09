import React from "react";
import { Container } from "reactstrap";
import ProjectHeader from "./ProjectHeader";
import ProjectList from "./ProjectList";

const Projects = () => {

  return (
    <Container>
      <ProjectHeader />
      <ProjectList />
    </Container>
  )
}

export default Projects;

