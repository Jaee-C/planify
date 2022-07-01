import React, { useState } from "react";
import { Container } from "reactstrap";
import { DragDropContext } from "react-beautiful-dnd";

import IssueList from "./IssueList";
import reorder from "../../utils/reorder";
import { issues } from "./issue-data";

const Backlog = () => {
  const [allIssues, setIssues] = useState(issues);
  const [isDragging, setDragging] = useState(false);

  // Dimension Locking
  const onBeforeDragStart = () => {
    setDragging(true);
  }

  const onDragEnd = result => {
    setDragging(false);

    // dropped outside the list
    if (
      !result.destination ||
      result.destination.index === result.source.index
    ) {
      return;
    }

    // no movement
    if (result.destination.index === result.source.index) {
      return;
    }
    const newIssues = reorder(allIssues, result.source.index, result.destination.index);
    setIssues([...newIssues]);
  }

  return (
    <Container>
      <DragDropContext onDragEnd={onDragEnd} onBeforeDragStart={onBeforeDragStart}>
        <IssueList issues={allIssues} isDragging={isDragging} />
      </DragDropContext>
    </Container>
  );
}

export default Backlog;
