import { Issue } from "@/lib/shared";
import { styled } from "@mui/material";
import IssueList from "@/components/Board/IssueList";
import { useEffect, useState } from "react";
import { compareIssue } from "@/lib/shared/Issue";

// Column header
const Header = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderTopLeftRadius: "2px",
  borderTopRightRadius: "2px",
  transition: "backgroundColor 0.2s ease",
  height: "48px",

  "&:hover": {
    backgroundColor: "inherit",
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
  borderRadius: "6px",
  backgroundColor: "#EBECF0",
  // stop the list collapsing when empty
  minHeight: "150px",
  height: "fit-content",
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
  const [sortedIssues, setSortedIssues] = useState<Issue[]>([]);

  useEffect(() => {
    setSortedIssues(props.issues.sort(compareIssue));
  }, [props.issues]);
  return (
    <ColumnContainer>
      <Header>
        <Title aria-label={`${props.title} issues`}>{props.title}</Title>
      </Header>
      <IssueList
        listId={props.title}
        issues={sortedIssues}
        internalScroll={props.isScrollable}
        isCombineEnabled={Boolean(props.isCombineEnabled)}
        useClone={Boolean(props.useClone)}
      />
    </ColumnContainer>
  );
}
