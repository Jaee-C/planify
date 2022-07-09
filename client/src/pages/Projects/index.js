import React from "react";
import { Container } from "reactstrap";
import ProjectHeader from "./ProjectHeader";
import ProjectList from "./ProjectList";
import  { useQuery } from "react-query";
import { fetchProjects } from "../../utils/api";

const Projects = () => {
  const { data, status } = useQuery('projects', fetchProjects);

  return (
    <Container>
      <ProjectHeader />
      <ProjectList />
    </Container>
  )
}

export default Projects;

