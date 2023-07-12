import { useEffect, useState } from "react";
import {
  DragDropContext,
  Droppable,
  DroppableProvided,
  DropResult,
} from "@hello-pangea/dnd";
import { queryIssuesConverted, queryStatuses } from "@/lib/data/query";
import { verifyUrlParam } from "@/lib/utils";
import { ColumnDefinition, getIssuesByStatus } from "@/components/Board/utils";
import { Issue, StatusType } from "@/lib/types";
import Column from "@/components/Board/Column";
import { useRouter } from "next/router";
import { styled } from "@mui/material";
import { PartialAutoScrollerOptions } from "@hello-pangea/dnd/src/state/auto-scroller/fluid-scroller/auto-scroller-options-types";

const Container = styled("div")(() => ({
  display: "inline-flex",
  minWidth: "100vw",
}));

interface BoardProps {
  autoScrollerOptions?: PartialAutoScrollerOptions;
  isCombineEnabled?: boolean;
  ignoreContainerClipping: boolean;
  withScrollableColumns?: boolean;
  useClone?: boolean;
}

export default function Board(props: BoardProps): JSX.Element {
  const [ordered, setOrdered] = useState<ColumnDefinition[]>([]);
  const [allIssues, setAllIssues] = useState<Issue[]>([]);

  const router = useRouter();
  const { pKey } = router.query;
  const projectKey: string = verifyUrlParam(pKey);
  const { data: issues, isLoading: issueLoading } =
    queryIssuesConverted(projectKey);
  const { data: statuses, isLoading: statusLoading } =
    queryStatuses(projectKey);

  // Define Columns
  useEffect(() => {
    if (!statuses) return;

    setOrdered(
      statuses.map(
        (status: StatusType): ColumnDefinition => ({
          order: status.id,
          name: status.name,
          status,
        })
      )
    );
  }, [statuses]);

  useEffect(() => {
    if (!issues || !statuses) return;

    setAllIssues(issues);
  }, [issues, statuses]);

  const onDragEnd = (result: DropResult): void => {
    // Dropped nowhere
    if (!result.destination || !statuses) return;

    const destStatus: string = result.destination.droppableId;
    const moved: Issue | undefined = allIssues.find(
      issue => String(issue.id) === result.draggableId
    );

    if (!moved) return;

    // Update status
    moved.status = statuses.find(status => String(status.name) === destStatus);
    const updated = [...allIssues.filter(issue => issue.id !== moved.id)];
    updated.push(moved);
    setAllIssues(updated);
  };

  if (issueLoading || statusLoading) {
    return <div>Loading...</div>;
  }
  return (
    <DragDropContext
      onDragEnd={onDragEnd}
      autoScrollerOptions={props.autoScrollerOptions}>
      <Droppable
        droppableId="board"
        type="COLUMN"
        direction="horizontal"
        isCombineEnabled={props.isCombineEnabled}
        ignoreContainerClipping={props.ignoreContainerClipping}>
        {(provided: DroppableProvided) => (
          <Container ref={provided.innerRef} {...provided.droppableProps}>
            {ordered.map((key: ColumnDefinition, index: number) => (
              <Column
                title={key.name}
                issues={getIssuesByStatus(allIssues, key.status)}
                index={index}
                key={key.name}
                isScrollable={props.withScrollableColumns}
                isCombineEnabled={props.isCombineEnabled}
                useClone={props.useClone}
              />
            ))}
          </Container>
        )}
      </Droppable>
    </DragDropContext>
  );
}

Board.defaultProps = {
  isCombineEnabled: false,
};
