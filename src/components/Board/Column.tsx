import { Issue } from "@/lib/types";
import { styled } from "@mui/material";
import IssueList from "@/components/Board/IssueList";

const Header = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderTopLeftRadius: "2px",
  borderTopRightRadius: "2px",
  transition: "backgroundColor 0.2s ease",
  height: "48px",

  "&:hover": {
    backgroundColor: "#E3FCEF",
  },
}));

const Title = styled("h4")(() => ({
  userSelect: "none",
  padding: "0 8px",
  position: "relative",
  flexGrow: 1,
  transition: "background-color ease 0.2s",
  textTransform: "uppercase",
  fontWeight: "500",
  fontSize: "12px",
  color: "#5E6C84",
  margin: "0 8px",
}));

const ColumnContainer = styled("div")(() => ({
  margin: "8px",
  display: "flex",
  flexDirection: "column",
  borderRadius: "6px",
  backgroundColor: "#EBECF0",
}));

interface ColumnProps {
  title: string;
  issues: Issue[];
  index: number;
  isScrollable?: boolean;
  isCombineEnabled?: boolean;
  useClone?: boolean;
}

export default function Column(props: ColumnProps): JSX.Element {
  return (
    <ColumnContainer>
      <Header>
        <Title aria-label={`${props.title} issues`}>{props.title}</Title>
      </Header>
      <IssueList
        listId={props.title}
        issues={props.issues}
        internalScroll={props.isScrollable}
        isCombineEnabled={Boolean(props.isCombineEnabled)}
        useClone={Boolean(props.useClone)}
      />
    </ColumnContainer>
  );
}
