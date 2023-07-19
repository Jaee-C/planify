import { EditorState } from "lexical";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { HeadingNode } from "@lexical/rich-text";

import styles from "./Editor.module.css";
import { styled } from "@mui/material";
import colors from "tailwindcss/colors";
import EditorToolbarPlugin from "./EditorToolbar";

const EditorContainer = styled("div")(() => ({
  position: "relative",
}));

const Placeholder = styled("div")(() => ({
  position: "absolute",
  top: "48px",
  left: "16px",
  color: colors.gray[400],
}));

interface Props {
  placeholder?: string;
}

const theme = {
  heading: {
    h1: styles.editorH1,
  },
  text: {
    bold: styles.editorBold,
    italic: styles.editorItalic,
  },
};

function onError(error: Error): void {
  console.error(error);
}

function onChange(editor: EditorState): void {}

export default function Editor(props: Props): JSX.Element {
  const { placeholder = "Enter some text" } = props;
  const initialConfig = {
    namespace: "MyEditor",
    theme,
    onError,
    nodes: [HeadingNode],
  };

  return (
    <EditorContainer>
      <LexicalComposer initialConfig={initialConfig}>
        <EditorToolbarPlugin />
        <RichTextPlugin
          contentEditable={
            <ContentEditable className="w-full h-80 px-3 py-2" />
          }
          placeholder={<Placeholder>{placeholder}</Placeholder>}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        <OnChangePlugin onChange={onChange} />
      </LexicalComposer>
    </EditorContainer>
  );
}
