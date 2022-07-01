import React from "react";
import { Table } from "reactstrap";
import { Droppable } from "react-beautiful-dnd";

import Issue from "./Issue";

const IssueList = ({ issues, isDragging }) => {
  return (
    <Droppable droppableId="backlogTable" style={{ width: "100%" }}>
      {(provided) => (
        <Table
          innerRef={provided.innerRef}
          {...provided.droppableProps}
          hover
          striped
          layout="auto"
          style={{ tableLayout: "auto", width: "1200px" }}
        >
          <tbody>
            {issues.map((issue, index) => (
              <Issue
                key={issue.id}
                issue={issue}
                index={index}
                isDragging={isDragging}
              />
            ))}
            {provided.placeholder}
          </tbody>
        </Table>
      )}
    </Droppable>
  );
};

export default IssueList;
