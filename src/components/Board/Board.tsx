import { useEffect, useState } from "react";
import { Droppable, DroppableProvided } from "@hello-pangea/dnd";
import { queryIssues, queryStatuses } from "@/lib/data/query";
import { verifyUrlParam } from "@/lib/utils";
import {
  ColumnDefinition,
  issueResponseToIssue,
} from "@/components/Board/utils";
import { StatusType } from "@/lib/types";
import Column from "@/components/Board/Column";
import { useRouter } from "next/router";
import { styled } from "@mui/material";

const Container = styled("div")(() => ({
  display: "inline-flex",
  minWidth: "100vw",
}));

interface BoardProps {
  isCombineEnabled?: boolean;
  ignoreContainerClipping: boolean;
  withScrollableColumns?: boolean;
  useClone?: boolean;
}

export default function Board(props: BoardProps): JSX.Element {
  const [ordered, setOrdered] = useState<ColumnDefinition[]>([]);

  const router = useRouter();
  const { pKey } = router.query;
  const projectKey: string = verifyUrlParam(pKey);
  const { data: issues, isLoading: issueLoading } = queryIssues(projectKey);
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
        })
      )
    );
  }, [statuses]);

  if (issueLoading || statusLoading) {
    return <div>Loading...</div>;
  }
  return (
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
              issues={issueResponseToIssue(issues)}
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
  );
}

Board.defaultProps = {
  isCombineEnabled: false,
};
