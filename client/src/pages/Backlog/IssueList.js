import React from "react";
import { Droppable } from "react-beautiful-dnd";

import Issue from "./Issue";

const IssueList = ({ issues }) => {
  return (
    <Droppable droppableId="backlogTable" style={{ width: "100%" }}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {issues.map((issue, index) => (
            <Issue
              key={issue.id}
              issue={issue}
              index={index}
            />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default IssueList;
