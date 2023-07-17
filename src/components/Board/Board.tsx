import { useEffect, useState } from "react";
import {
  DragDropContext,
  Droppable,
  DroppableProvided,
  DropResult,
} from "@hello-pangea/dnd";
import { queryIssuesConverted, queryStatuses } from "@/lib/client-fetch/query";
import { verifyUrlParam } from "@/lib/utils";
import {
  ColumnDefinition,
  findIssueKeyById,
  getIssuesByStatus,
  clientUpdateIssueStatus,
  clientUpdateIssue,
} from "@/components/Board/utils";
import { Issue, StatusType } from "@/lib/types";
import Column from "@/components/Board/Column";
import { useRouter } from "next/router";
import { styled } from "@mui/material";
import { PartialAutoScrollerOptions } from "@hello-pangea/dnd/src/state/auto-scroller/fluid-scroller/auto-scroller-options-types";
import { useMutation } from "react-query";
import { editIssue } from "@/lib/client-fetch/issues";
import { convertDataToIssue } from "@/lib/types/Issue";

const Container = styled("div")(() => ({
  display: "inline-flex",
  minWidth: "100vw",
  padding: "0 32px",
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
  const editIssueMutation = useMutation(
    async ([issueKey, data]: any) =>
      await editIssue(projectKey, issueKey, data),
    {
      onSuccess: (updated: Issue) => {
        const newIssues = clientUpdateIssue(allIssues, updated);
        setAllIssues(newIssues);
      },
    }
  );

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
    setAllIssues(issues.map(entry => convertDataToIssue(entry)));
  }, [issues, statuses]);

  const onDragEnd = (result: DropResult): void => {
    // Dropped nowhere
    if (!result.destination || !statuses) return;

    // did not move anywhere - can bail early
    if (
      result.source.droppableId === result.destination.droppableId &&
      result.source.index === result.destination.index
    ) {
      return;
    }

    const editedIssueKey: string = findIssueKeyById(
      allIssues,
      result.draggableId
    );

    if (!editedIssueKey) return;

    // Check if issue status is updated
    const destStatus: string = result.destination.droppableId;
    const newStatus = statuses.find(
      status => String(status.name) === destStatus
    );
    if (!newStatus) return;

    // Find issues before and after the moved issue, to determine the new order
    const issueDestIndex: number = result.destination.index;
    const destIssues: Issue[] = getIssuesByStatus(allIssues, newStatus);

    let issueBefore: Issue | undefined;
    let issueAfter: Issue | undefined;
    if (issueDestIndex > 0) {
      issueBefore = destIssues[issueDestIndex - 1];
    }
    if (issueDestIndex < destIssues.length - 1) {
      issueAfter = destIssues[issueDestIndex + 1];
    }

    const [updated, order] = clientUpdateIssueStatus(
      result.draggableId,
      allIssues,
      newStatus,
      issueBefore,
      issueAfter
    );
    setAllIssues(updated);
    editIssueMutation.mutate([
      editedIssueKey,
      {
        status: newStatus.id,
        order: order,
      },
    ]);
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
