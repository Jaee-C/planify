import { EditorThemeClasses } from "lexical";

import styles from "./EditorThemes.module.css";

const EditorTheme: EditorThemeClasses = {
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

export default EditorTheme;
