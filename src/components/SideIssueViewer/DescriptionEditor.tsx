import { useState } from "react";
import { EditorState } from "lexical";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { ListNode, ListItemNode } from "@lexical/list";
import { AutoLinkNode, LinkNode } from "@lexical/link";

import styles from "./Editor.module.css";
import { styled } from "@mui/material";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { CheckListPlugin } from "@lexical/react/LexicalCheckListPlugin";
import SaveEditorPlugin from "../RichTextEditor/plugins/SaveEditorPlugin";
import EditorTheme from "@/components/RichTextEditor/themes/EditorTheme";

// No SSR for toolbar, since keyboard shortcut hints depends on client type
import dynamic from "next/dynamic";
import Placeholder from "@/components/RichTextEditor/Placeholder";
import { ClearEditorPlugin } from "@lexical/react/LexicalClearEditorPlugin";
const EditorToolbarPlugin = dynamic(
  () => import("../RichTextEditor/EditorToolbar"),
  {
    ssr: false,
  }
);

const EditorContainer = styled("div")(() => ({
  position: "relative",
}));

function MyContentEditable(props: any): JSX.Element {
  const [editor] = useLexicalComposerContext();
  const [expanded, setExpanded] = useState<boolean>(false);

  editor.registerEditableListener((editable: boolean) => {
    if (editable) {
      setExpanded(true);
    } else {
      setExpanded(false);
    }
  });
  return (
    <ContentEditable
      {...props}
      onClick={(): void => editor.setEditable(true)}
      onBlur={(): void => editor.setEditable(false)}
      className={`${styles.editorContainer} ${expanded ? styles.expanded : ""}`}
    />
  );
}

interface Props {
  placeholder?: string;
}

function onError(error: Error): void {
  console.error(error);
}

function onChange(editor: EditorState): void {}

export default function DescriptionEditor(props: Props): JSX.Element {
  const { placeholder = "Enter some text" } = props;
  const initialConfig = {
    editable: false,
    namespace: "MyEditor",
    theme: EditorTheme,
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
          contentEditable={<MyContentEditable />}
          placeholder={<Placeholder>{placeholder}</Placeholder>}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        <ListPlugin />
        <CheckListPlugin />
        <OnChangePlugin onChange={onChange} />
        <ClearEditorPlugin />
        <SaveEditorPlugin
          onSave={(data: string): void => {
            console.log(data);
          }}
        />
      </LexicalComposer>
    </EditorContainer>
  );
}
