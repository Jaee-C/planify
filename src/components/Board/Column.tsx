import { Issue } from "@/lib/types";
import { styled } from "@mui/material";
import IssueList from "@/components/Board/IssueList";

const Title = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderTopLeftRadius: "2px",
  borderTopRightRadius: "2px",
  backgroundColor: "#EBECF0",
  transition: "backgroundColor 0.2s ease",

  "&:hover": {
    backgroundColor: "#E3FCEF",
  },
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
    <>
      {/* Column header */}
      <Title aria-label={`${props.title} issue list`}>{props.title}</Title>
      <IssueList
        listId={props.title}
        issues={props.issues}
        internalScroll={props.isScrollable}
        isCombineEnabled={Boolean(props.isCombineEnabled)}
        useClone={Boolean(props.useClone)}
      />
    </>
  );
}
