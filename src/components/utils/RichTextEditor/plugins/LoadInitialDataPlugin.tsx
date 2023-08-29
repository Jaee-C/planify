import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect, useState } from "react";
import {
  CLEAR_EDITOR_COMMAND,
  COMMAND_PRIORITY_EDITOR,
  EditorState,
  LexicalEditor,
} from "lexical";
import { LOAD_INITIAL_STATE_COMMAND } from "@/components/utils/RichTextEditor/commands";

function restoreState(editor: LexicalEditor, props: Props): boolean {
  if (props.defaultValue) {
    const initialEditorState: EditorState = editor.parseEditorState(
      props.defaultValue
    );
    editor.setEditorState(initialEditorState);
  } else {
    editor.dispatchCommand(CLEAR_EDITOR_COMMAND, undefined);
  }
  return true;
}

interface Props {
  defaultValue?: string;
}

export default function LoadInitialDataPlugin(props: Props): null {
  const [editor] = useLexicalComposerContext();

  useEffect((): void => {
    restoreState(editor, props);
  }, [props.defaultValue]);

  editor.registerCommand(
    LOAD_INITIAL_STATE_COMMAND,
    () => restoreState(editor, props),
    COMMAND_PRIORITY_EDITOR
  );
  return null;
}
