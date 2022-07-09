import React from "react";
import { Droppable } from "react-beautiful-dnd";

import Issue from "./Issue";
import NewIssue from "./NewIssue";

const IssueList = ({ issues, projectKey }) => {
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
          <NewIssue projectKey={projectKey} />
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default IssueList;
