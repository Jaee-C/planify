import React from "react";
import { Droppable } from "react-beautiful-dnd";

import Issue from "./Issue";
import NewIssue from "./NewIssue";

const IssueList = ({ issues, projectId }) => {
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
          <NewIssue projectId={projectId} />
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default IssueList;
