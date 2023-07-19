import React from "react";
import { EditorState } from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

import { Button } from "@mui/material";

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

  editor.registerEditableListener((editable: boolean) => {
    if (editable) {
      setDisplay("flex");
    } else {
      setDisplay("hidden");
    }
  });

  return (
    <div className={display + " w-full justify-end"}>
      <Button onClick={(): void => editor.setEditable(false)}>Cancel</Button>
      <Button onClick={save}>Save</Button>
    </div>
  );
}
