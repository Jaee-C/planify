import React, { useState } from "react";
import { Container } from "reactstrap";
import { DragDropContext } from "react-beautiful-dnd";

import IssueList from "./IssueList";
import reorder from "../../utils/reorder";
import { issues } from "./issue-data";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchIssues } from "../../utils/api";

const Backlog = () => {
  const { data, status } = useQuery('issues', fetchIssues)
  const [allIssues, setIssues] = useState(issues);

  const params = useParams();
  const projectKey = params.key;

  const onDragEnd = result => {

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
    <Container className="mt-4">
      <h2>Backlog</h2>
      <DragDropContext onDragEnd={onDragEnd}>
        <Container className="mt-3 p-0">
          <IssueList issues={allIssues} projectKey={projectKey} />
        </Container>
      </DragDropContext>
    </Container>
  );
}

export default Backlog;
