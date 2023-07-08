import {
  AppBar,
  Breadcrumbs,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { MdClose } from "react-icons/md";

interface SideActionBarProps {
  /** key of the issue to display */
  issueKey?: string;
  /** action to close the side issue viewer */
  closeAction: () => void;
}

/**
 * Top action bar for the side issue viewer
 * @param {SideActionBarProps} props
 * @constructor
 */
export default function SideActionBar(props: SideActionBarProps): JSX.Element {
  return (
    <AppBar position="sticky" color="inherit" elevation={0}>
      <Toolbar className="px-0">
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
