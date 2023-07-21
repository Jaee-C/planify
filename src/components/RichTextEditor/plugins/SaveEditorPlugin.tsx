import React from "react";
import { CLEAR_EDITOR_COMMAND, EditorState } from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

import { Button } from "@mui/material";
import { LOAD_INITIAL_STATE_COMMAND } from "@/components/RichTextEditor/commands";

interface SaveEditorProps {
  onSave: (data: string) => void;
}

export default function SaveEditorPlugin(
  props: SaveEditorProps
): JSX.Element | null {
  const [editor] = useLexicalComposerContext();
  const { onSave } = props;
  const [display, setDisplay] = React.useState<string>("hidden");

  const save = React.useCallback(() => {
    const state: EditorState = editor.getEditorState();
    editor.setEditable(false);
    onSave(JSON.stringify(state));
  }, [onSave]);

  const cancel = () => {
    editor.dispatchCommand(LOAD_INITIAL_STATE_COMMAND, undefined);
    editor.setEditable(false);
  };

  editor.registerEditableListener((editable: boolean) => {
    if (editable) {
      setDisplay("flex");
    } else {
      setDisplay("hidden");
    }
  });

  return (
    <div className={display + " w-full justify-end"}>
      <Button onClick={cancel}>Cancel</Button>
      <Button onClick={save} variant="contained">
        Save
      </Button>
    </div>
  );
}
