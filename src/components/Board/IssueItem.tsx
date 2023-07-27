import { Issue } from "@/lib/shared";
import { DraggableProvided } from "@hello-pangea/dnd";
import { Card, CardContent, styled } from "@mui/material";
import IssueInfo from "@/components/Board/IssueInfo";

const Container = styled(Card)(() => ({
  borderRadius: "3px",
  border: "2px solid transparent",
  backgroundColor: "#FFFFFF",
  boxShadow: "none",
  boxSizing: "border-box",
  padding: "8px",
  marginBottom: "8px",
  userSelect: "none",
  display: "flex",
  flexDirection: "column",
  transition: "background-color ease 0.2s",

  "&:hover, &:active": {
    color: "#091E42",
    backgroundColor: "#DFE1E6",
    transition: "background-color ease 0.2s",
    textDecoration: "none",
  },

  "&:focus": {
    outline: "none",
    boxShadow: "none",
  },
}));

const Content = styled(CardContent)(() => ({
  width: "100%",
  padding: 0,
  marginBottom: "8px",

  "&:last-child": {
    paddingBottom: 0,
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
      <Content>{props.issue.title}</Content>
      <IssueInfo issue={props.issue} />
    </Container>
  );
}
