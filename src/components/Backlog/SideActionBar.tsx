import {
  AppBar,
  Breadcrumbs,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { MdClose } from "react-icons/md";

interface SideActionBarProps {
  issueKey?: string;
  closeAction: () => void;
}

export default function SideActionBar(props: SideActionBarProps): JSX.Element {
  return (
    <AppBar position="sticky" color="inherit" elevation={0}>
      <Toolbar>
        <Breadcrumbs aria-label="breadcrumb" sx={{ flexGrow: 1 }}>
          <Typography color="inherit">Issue</Typography>
          <Typography color="text.primary" component="div">
            {props.issueKey ? props.issueKey : ""}
          </Typography>
        </Breadcrumbs>
        <IconButton
          size="small"
          aria-label="close issue"
          onClick={props.closeAction}>
          <MdClose />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
