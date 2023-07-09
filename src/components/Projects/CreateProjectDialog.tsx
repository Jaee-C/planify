import React, { useContext, useEffect, useState } from "react";
import { CreateProjectContext } from "@/components/Projects";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import { MdClose } from "react-icons/md";
import CreateProjectForm from "@/components/Projects/CreateProjectForm";

export default function CreateProjectDialog(): JSX.Element {
  const createProjectContext = useContext(CreateProjectContext);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    setOpen(createProjectContext.value);
    console.log(createProjectContext.value);
  }, [createProjectContext]);

  return (
    <Dialog
      open={open}
      scroll="body"
      fullWidth
      onClose={createProjectContext.action}>
      <DialogTitle className="flex items-center justify-between m-0 p-4">
        <Typography>Create Project</Typography>
        <IconButton
          onClick={createProjectContext.action}
          className="text-gray-500 absolute right-2 top-2">
          <MdClose size="24px" />
        </IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <CreateProjectForm />
      </DialogContent>
    </Dialog>
  );
}
