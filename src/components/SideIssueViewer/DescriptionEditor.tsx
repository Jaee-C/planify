import { useState } from "react";
import { EditorState } from "lexical";
import {
  InitialConfigType,
  LexicalComposer,
} from "@lexical/react/LexicalComposer";
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
import { useMutation } from "react-query";
import { editIssue } from "@/lib/client-data/issues";
import { NextRouter, useRouter } from "next/router";
import { verifyUrlParam } from "@/lib/utils";
import LoadInitialDataPlugin from "@/components/RichTextEditor/plugins/LoadInitialDataPlugin";
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
      className={`${styles.editorContainer} ${expanded ? styles.expanded : ""}`}
    />
  );
}

interface Props {
  placeholder?: string;
  defaultValue?: string;
  issueKey: string;
}

function onError(error: Error): void {
  console.error(error);
}

function onChange(editor: EditorState): void {}

export default function DescriptionEditor(props: Props): JSX.Element {
  const router: NextRouter = useRouter();
  const projectKey: string = verifyUrlParam(router.query.pKey);
  const editMutation = useMutation(async (data: any) => {
    await editIssue(projectKey, props.issueKey, { description: data });
  });
  const { placeholder = "Enter some text" } = props;
  const initialConfig: InitialConfigType = {
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
        <LoadInitialDataPlugin defaultValue={props.defaultValue} />
        <HistoryPlugin />
        <ListPlugin />
        <CheckListPlugin />
        <OnChangePlugin onChange={onChange} />
        <ClearEditorPlugin />
        <SaveEditorPlugin onSave={data => editMutation.mutate(data)} />
      </LexicalComposer>
    </EditorContainer>
  );
}
