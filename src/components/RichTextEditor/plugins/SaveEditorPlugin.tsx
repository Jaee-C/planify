import React from "react";
import { EditorState } from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { Button } from "@mui/material";

interface SaveEditorProps {
  onSave: (data: string) => void;
}

export default function SaveEditorPlugin(props: SaveEditorProps): JSX.Element {
  const [editor] = useLexicalComposerContext();
  const { onSave } = props;

  const save = React.useCallback(() => {
    const state: EditorState = editor.getEditorState();
    onSave(JSON.stringify(state));
  }, [onSave]);

  return <Button onClick={save}>Save</Button>;
}
