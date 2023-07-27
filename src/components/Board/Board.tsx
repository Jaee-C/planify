import { useEffect, useState } from "react";
import {
  DragDropContext,
  Droppable,
  DroppableProvided,
  DropResult,
} from "@hello-pangea/dnd";
import { queryIssuesConverted, queryStatuses } from "@/lib/client-data/query";
import { verifyUrlParam } from "@/lib/utils";
import {
  ColumnDefinition,
  findIssueKeyById,
  getIssuesByStatus,
  clientUpdateIssueStatus,
  clientUpdateIssue,
  findStatusTypeByName,
  isNotMoved,
  handleSameStatus,
} from "@/components/Board/utils";
import { StatusType } from "@/lib/types";
import { Issue } from "@/lib/shared";
import Column from "@/components/Board/Column";
import { useRouter } from "next/router";
import { styled } from "@mui/material";
import { PartialAutoScrollerOptions } from "@hello-pangea/dnd/src/state/auto-scroller/fluid-scroller/auto-scroller-options-types";
import { useMutation } from "react-query";
import { editIssue } from "@/lib/client-data/issues";
import { convertDataToIssue } from "@/lib/shared/Issue";

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
    console.log(result);

    // did not move anywhere - can bail early
    if (isNotMoved(result.source, result.destination) || !statuses) {
      return;
    }

    const editedIssueKey: string = findIssueKeyById(
      allIssues,
      result.draggableId
    );

    if (!editedIssueKey) return;

    // Check if issue status is updated
    const destStatus: StatusType | undefined = findStatusTypeByName(
      statuses,
      result.destination!.droppableId
    );
    const srcStatus: StatusType | undefined = findStatusTypeByName(
      statuses,
      result.source.droppableId
    );
    if (!destStatus || !srcStatus) return;

    // Find issues before and after the moved issue, to determine the new order
    const issueDestIndex: number = result.destination!.index;
    const issueSrcIndex: number = result.source.index;
    let destIssues: Issue[] = getIssuesByStatus(allIssues, destStatus);
    if (srcStatus.id === destStatus.id) {
      destIssues = handleSameStatus(destIssues, destIssues[issueSrcIndex]);
    }

    let issueBefore: Issue | undefined;
    let issueAfter: Issue | undefined;
    if (issueDestIndex > 0) {
      issueBefore = destIssues[issueDestIndex - 1];
    }
    if (issueDestIndex < destIssues.length) {
      issueAfter = destIssues[issueDestIndex];
    }

    const [updated, order] = clientUpdateIssueStatus(
      result.draggableId,
      allIssues,
      destStatus,
      issueBefore,
      issueAfter
    );
    setAllIssues(updated);
    editIssueMutation.mutate([
      editedIssueKey,
      {
        status: destStatus.id,
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
