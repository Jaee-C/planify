import { Issue } from "@/lib/types";
import { DraggableProvided } from "@hello-pangea/dnd";
import { styled } from "@mui/material";

const Container = styled("a")(() => ({
  borderRadius: "2px",
  border: "2px solid transparent",
  backgroundColor: "#FFFFFF",
  boxShadow: "none",
  boxSizing: "border-box",
  padding: "8px",
  marginBottom: "8px",
  userSelect: "none",
  display: "flex",

  "&:hover, &:active": {
    color: "#091E42",
    textDecoration: "none",
  },

  "&:focus": {
    outline: "none",
    boxShadow: "none",
  },
}));

interface IssueItemProps {
  issue: Issue;
  isDragging: boolean;
  provided: DraggableProvided;
  isClone?: boolean;
  isGroupedOver?: boolean;
  index?: number;
}

export default function IssueItem(props: IssueItemProps): JSX.Element {
  return (
    <Container
      ref={props.provided.innerRef}
      {...props.provided.draggableProps}
      {...props.provided.dragHandleProps}
      data-is-dragging={props.isDragging}
      data-testid={props.issue.id}
      data-index={props.index}>
      {props.issue.title}
    </Container>
  );
}
