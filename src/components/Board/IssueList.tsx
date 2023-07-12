import React from "react";
import { Issue } from "@/lib/types";
import {
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
  Droppable,
  DroppableProvided,
} from "@hello-pangea/dnd";
import { styled } from "@mui/material";
import IssueItem from "@/components/Board/IssueItem";

const Wrapper = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  opacity: "inherit",
  padding: "8px",
  border: "8px",
  paddingBottom: 0,
  transition: "background-color 0.2s ease",
  userSelect: "none",
  width: "250px",
  margin: 0,
}));

const Title = styled("h4")(() => ({
  padding: "8px",
  transition: "background-color 0.2s ease",
  userSelect: "none",
  flexGrow: 1,
  position: "relative",
  width: "250px",
}));

const scrollContainerHeight = 250;

const Dropzone = styled("div")(() => ({
  // stop the list collapsing when empty
  minHeight: `${scrollContainerHeight}px`,

  /*
    not relying on the items for a margin-bottom
    as it will collapse when the list is empty
  */
  paddingBottom: "8px",
}));

const ScrollContainer = styled("div")(() => ({
  overflowY: "auto",
  overflowX: "hidden",
  maxHeight: `${scrollContainerHeight}px`,
}));

interface IssueListProps {
  issues: Issue[];
}

function InnerIssueList(props: IssueListProps): JSX.Element {
  return (
    <>
      {props.issues.map((issue: Issue, index: number) => (
        <Draggable draggableId={String(issue.id)} index={index} key={issue.id}>
          {(
            dragProvided: DraggableProvided,
            dragSnapshot: DraggableStateSnapshot
          ) => (
            <IssueItem
              key={issue.id}
              issue={issue}
              isDragging={dragSnapshot.isDragging}
              isGroupedOver={Boolean(dragSnapshot.combineTargetFor)}
              provided={dragProvided}
            />
          )}
        </Draggable>
      ))}
    </>
  );
}

const InnerIssueListMemo = React.memo<IssueListProps>(InnerIssueList);

interface InnerListProps {
  dropProvided: DroppableProvided;
  issues: Issue[];
  title: string | undefined | null;
}

function InnerList(props: InnerListProps): JSX.Element {
  return (
    <>
      {props.title ? <Title>{props.title}</Title> : null}
      <Dropzone ref={props.dropProvided.innerRef}>
        <InnerIssueListMemo issues={props.issues} />
        {props.dropProvided.placeholder}
      </Dropzone>
    </>
  );
}

interface IssueListProps {
  listId?: string;
  listType?: string;
  issues: Issue[];
  title?: string;
  internalScroll?: boolean;
  isDropDisabled?: boolean;
  isCombineEnabled?: boolean;
  useClone?: boolean;
}

export default function IssueList({
  internalScroll,
  isDropDisabled,
  isCombineEnabled,
  listId = "LIST",
  listType,
  title,
  useClone,
  issues,
}: IssueListProps): JSX.Element {
  return (
    <Droppable
      droppableId={listId}
      type={listType}
      isDropDisabled={isDropDisabled}
      isCombineEnabled={isCombineEnabled}
      renderClone={
        useClone
          ? (provided, snapshot, descriptor) => (
              <IssueItem
                provided={provided}
                issue={issues[descriptor.source.index]}
                isDragging={snapshot.isDragging}
                isClone
              />
            )
          : undefined
      }>
      {(droppableProvided: DroppableProvided) => (
        <Wrapper {...droppableProvided.droppableProps}>
          {internalScroll ? (
            <ScrollContainer>
              <InnerList
                dropProvided={droppableProvided}
                issues={issues}
                title={title}
              />
            </ScrollContainer>
          ) : (
            <InnerList
              dropProvided={droppableProvided}
              issues={issues}
              title={title}
            />
          )}
        </Wrapper>
      )}
    </Droppable>
  );
}
