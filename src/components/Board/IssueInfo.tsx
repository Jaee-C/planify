import { Issue } from "@/lib/shared";
import { CardActions, styled, Tooltip } from "@mui/material";
import Avatar from "@mui/material/Avatar";

const ActionsContainer = styled(CardActions)(() => ({
  display: "flex",
  justifyContent: "space-between",
  padding: 0,
  fontSize: "12px",
  fontWeight: 500,
  color: "#5E6C84",
}));

interface IssueActionsProps {
  issue: Issue;
}

export default function IssueInfo(props: IssueActionsProps): JSX.Element {
  return (
    <ActionsContainer>
      <div>{props.issue.issueKey}</div>
      <Tooltip title="Assignee: Guest">
        <Avatar
          sx={{ width: 22, height: 22, fontSize: "12px", fontWeight: 400 }}>
          G
        </Avatar>
      </Tooltip>
    </ActionsContainer>
  );
}
