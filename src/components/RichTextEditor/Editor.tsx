import { EditorState } from "lexical";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";

import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { ListNode, ListItemNode } from "@lexical/list";
import { AutoLinkNode, LinkNode } from "@lexical/link";

import styles from "./Editor.module.css";
import { styled } from "@mui/material";
import colors from "tailwindcss/colors";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { CheckListPlugin } from "@lexical/react/LexicalCheckListPlugin";

// No SSR for toolbar, since keyboard shortcut hints depends on client type
import dynamic from "next/dynamic";
const EditorToolbarPlugin = dynamic(() => import("./EditorToolbar"), {
  ssr: false,
});

const EditorContainer = styled("div")(() => ({
  position: "relative",
}));

const Placeholder = styled("div")(() => ({
  position: "absolute",
  top: "46px",
  left: "16px",
  color: colors.gray[400],
}));

interface Props {
  placeholder?: string;
}

const theme = {
  heading: {
    h1: styles.editorH1,
    h2: styles.editorH2,
    h3: styles.editorH3,
  },
  paragraph: styles.editorParagraph,
  quote: styles.editorQuote,
  text: {
    bold: styles.editorBold,
    italic: styles.editorItalic,
    underline: styles.editorUnderline,
    code: styles.editorTextCode,
    subscript: styles.editorSubscript,
    superscript: styles.editorSuperscript,
    underlineStrikethrough: styles.editorUnderlineStrikethrough,
  },
  list: {
    listitem: styles.editorListItem,
    listitemChecked: styles.editorListItemChecked,
    listitemUnchecked: styles.editorListItemUnchecked,
    nested: {
      listitem: styles.editorNestedListItem,
    },
    olDepth: [
      styles.editorOl1,
      styles.editorOl2,
      styles.editorOl3,
      styles.editorOl4,
      styles.editorOl5,
    ],
    ul: styles.editorUl,
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
    nodes: [
      HeadingNode,
      CodeNode,
      QuoteNode,
      CodeHighlightNode,
      ListNode,
      ListItemNode,
      AutoLinkNode,
      LinkNode,
    ],
  };

  return (
    <EditorContainer>
      <LexicalComposer initialConfig={initialConfig}>
        <EditorToolbarPlugin />
        <RichTextPlugin
          contentEditable={
            <ContentEditable className={styles.editorContainer} />
          }
          placeholder={<Placeholder>{placeholder}</Placeholder>}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        <ListPlugin />
        <CheckListPlugin />
        <OnChangePlugin onChange={onChange} />
      </LexicalComposer>
    </EditorContainer>
  );
}
