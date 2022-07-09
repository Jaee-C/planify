import React from "react";
import { Link } from "react-router-dom";
import { Table } from "reactstrap";

const projects = [
  {
    name: "Issue Tracker",
    key: "IT",
    lead: "Weng Jae Chin"
  },
  {
    name: "Project Management",
    key: "PM",
    lead: "Weng Jae Chin",
  }
];

const ProjectList = () => {
  return (
    <Table hover striped>
      <thead>
        <tr>
          <th>Name</th>
          <th>Key</th>
          <th>Lead</th>
        </tr>
      </thead>
      <tbody>
        {projects.map(project => (
          <tr key={project.key}>
            <td><Link to={`${project.key}/backlog`}>{project.name}</Link></td>
            <td>{project.key}</td>
            <td>{project.lead}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ProjectList;
