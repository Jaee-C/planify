import type { LexicalEditor, NodeKey } from "lexical";

import {
  $createCodeNode,
  $isCodeNode,
  CODE_LANGUAGE_FRIENDLY_NAME_MAP,
  CODE_LANGUAGE_MAP,
  getLanguageFriendlyName,
} from "@lexical/code";
import { $isLinkNode, TOGGLE_LINK_COMMAND } from "@lexical/link";
import {
  $isListNode,
  INSERT_CHECK_LIST_COMMAND,
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  ListNode,
  REMOVE_LIST_COMMAND,
} from "@lexical/list";
import { INSERT_EMBED_COMMAND } from "@lexical/react/LexicalAutoEmbedPlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $isDecoratorBlockNode } from "@lexical/react/LexicalDecoratorBlockNode";
import { INSERT_HORIZONTAL_RULE_COMMAND } from "@lexical/react/LexicalHorizontalRuleNode";
import {
  $createHeadingNode,
  $createQuoteNode,
  $isHeadingNode,
  $isQuoteNode,
  HeadingTagType,
} from "@lexical/rich-text";
import {
  $getSelectionStyleValueForProperty,
  $isParentElementRTL,
  $patchStyleText,
  $setBlocksType,
} from "@lexical/selection";
import { $isTableNode } from "@lexical/table";
import {
  $findMatchingParent,
  $getNearestBlockElementAncestorOrThrow,
  $getNearestNodeOfType,
  mergeRegister,
} from "@lexical/utils";
import {
  $createParagraphNode,
  $getNodeByKey,
  $getRoot,
  $getSelection,
  $isRangeSelection,
  $isRootOrShadowRoot,
  $isTextNode,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  COMMAND_PRIORITY_CRITICAL,
  COMMAND_PRIORITY_NORMAL,
  DEPRECATED_$isGridSelection,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  INDENT_CONTENT_COMMAND,
  KEY_MODIFIER_COMMAND,
  OUTDENT_CONTENT_COMMAND,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  UNDO_COMMAND,
} from "lexical";
import { useCallback, useEffect, useState } from "react";
import * as React from "react";
import { IS_APPLE } from "@/lib/shared/environment";

import styles from "./EditorToolbar.module.css";
import useModal from "hooks/useModal";
import DropDown, { DropDownItem } from "@/components/DropDown";
import { getSelectedNode } from "./utils/getSelectedNode";
import { sanitizeUrl } from "./utils/url";

import {
  BsArrowClockwise,
  BsArrowCounterclockwise,
  BsCheckSquare,
  BsCode,
  BsDashLg,
  BsLink,
  BsListOl,
  BsListUl,
  BsPlus,
  BsQuote,
  BsSubscript,
  BsSuperscript,
  BsTable,
  BsTextCenter,
  BsTextIndentLeft,
  BsTextIndentRight,
  BsTextLeft,
  BsTextParagraph,
  BsTextRight,
  BsTrash,
  BsType,
  BsTypeBold,
  BsTypeH1,
  BsTypeH2,
  BsTypeH3,
  BsTypeItalic,
  BsTypeStrikethrough,
  BsTypeUnderline,
} from "react-icons/bs";
import { IconContext } from "react-icons";
import ToolbarButton from "@/components/RichTextEditor/ToolbarButton";

const blockTypeToBlockName = {
  bullet: "Bulleted List",
  check: "Check List",
  code: "Code Block",
  h1: "Heading 1",
  h2: "Heading 2",
  h3: "Heading 3",
  h4: "Heading 4",
  h5: "Heading 5",
  h6: "Heading 6",
  number: "Numbered List",
  paragraph: "Normal",
  quote: "Quote",
};

const blockTypeToBlockIcon = {
  bullet: <BsListUl />,
  check: <BsCheckSquare />,
  code: <BsCode />,
  h1: <BsTypeH1 />,
  h2: <BsTypeH2 />,
  h3: <BsTypeH3 />,
  h4: null,
  h5: null,
  h6: null,
  number: <BsListOl />,
  paragraph: <BsTextParagraph />,
  quote: <BsQuote />,
};

const rootTypeToRootName = {
  root: "Root",
  table: "Table",
};

function getCodeLanguageOptions(): [string, string][] {
  const options: [string, string][] = [];

  for (const [lang, friendlyName] of Object.entries(
    CODE_LANGUAGE_FRIENDLY_NAME_MAP
  )) {
    options.push([lang, friendlyName]);
  }

  return options;
}

const CODE_LANGUAGE_OPTIONS = getCodeLanguageOptions();

const FONT_FAMILY_OPTIONS: [string, string][] = [
  ["Arial", "Arial"],
  ["Courier New", "Courier New"],
  ["Georgia", "Georgia"],
  ["Times New Roman", "Times New Roman"],
  ["Trebuchet MS", "Trebuchet MS"],
  ["Verdana", "Verdana"],
];

const FONT_SIZE_OPTIONS: [string, string][] = [
  ["10px", "10px"],
  ["11px", "11px"],
  ["12px", "12px"],
  ["13px", "13px"],
  ["14px", "14px"],
  ["15px", "15px"],
  ["16px", "16px"],
  ["17px", "17px"],
  ["18px", "18px"],
  ["19px", "19px"],
  ["20px", "20px"],
];

function dropDownActiveClass(active: boolean) {
  if (active) return "active dropdown-item-active";
  else return "";
}

function BlockFormatDropDown({
  editor,
  blockType,
  rootType,
  disabled = false,
}: {
  blockType: keyof typeof blockTypeToBlockName;
  rootType: keyof typeof rootTypeToRootName;
  editor: LexicalEditor;
  disabled?: boolean;
}): JSX.Element {
  const formatParagraph = () => {
    editor.update(() => {
      const selection = $getSelection();
      if (
        $isRangeSelection(selection) ||
        DEPRECATED_$isGridSelection(selection)
      ) {
        $setBlocksType(selection, () => $createParagraphNode());
      }
    });
  };

  const formatHeading = (headingSize: HeadingTagType) => {
    if (blockType !== headingSize) {
      editor.update(() => {
        const selection = $getSelection();
        if (
          $isRangeSelection(selection) ||
          DEPRECATED_$isGridSelection(selection)
        ) {
          $setBlocksType(selection, () => $createHeadingNode(headingSize));
        }
      });
    }
  };

  const formatBulletList = (): void => {
    console.log("Bullet");
    if (blockType !== "bullet") {
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    }
  };

  const formatCheckList = () => {
    if (blockType !== "check") {
      editor.dispatchCommand(INSERT_CHECK_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    }
  };

  const formatNumberedList = () => {
    if (blockType !== "number") {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    }
  };

  const formatQuote = () => {
    if (blockType !== "quote") {
      editor.update(() => {
        const selection = $getSelection();
        if (
          $isRangeSelection(selection) ||
          DEPRECATED_$isGridSelection(selection)
        ) {
          $setBlocksType(selection, () => $createQuoteNode());
        }
      });
    }
  };

  const formatCode = () => {
    if (blockType !== "code") {
      editor.update(() => {
        let selection = $getSelection();

        if (
          $isRangeSelection(selection) ||
          DEPRECATED_$isGridSelection(selection)
        ) {
          if (selection.isCollapsed()) {
            $setBlocksType(selection, () => $createCodeNode());
          } else {
            const textContent = selection.getTextContent();
            const codeNode = $createCodeNode();
            selection.insertNodes([codeNode]);
            selection = $getSelection();
            if ($isRangeSelection(selection))
              selection.insertRawText(textContent);
          }
        }
      });
    }
  };

  return (
    <DropDown
      disabled={disabled}
      buttonClassName="toolbar-item block-controls"
      buttonIcon={blockTypeToBlockIcon[blockType]}
      buttonLabel={blockTypeToBlockName[blockType]}
      buttonAriaLabel="Formatting options for text style">
      <DropDownItem icon={<BsTextParagraph />} onClick={formatParagraph}>
        <span className="text">Normal</span>
      </DropDownItem>
      <DropDownItem
        selected={blockType === "h1"}
        icon={blockTypeToBlockIcon["h1"]}
        onClick={() => formatHeading("h1")}>
        <span className="text">Heading 1</span>
      </DropDownItem>
      <DropDownItem
        selected={blockType === "h2"}
        icon={blockTypeToBlockIcon["h2"]}
        onClick={() => formatHeading("h2")}>
        <span className="text">Heading 2</span>
      </DropDownItem>
      <DropDownItem
        selected={blockType === "h3"}
        icon={blockTypeToBlockIcon["h3"]}
        onClick={() => formatHeading("h3")}>
        <span className="text">Heading 3</span>
      </DropDownItem>
      <DropDownItem
        selected={blockType === "bullet"}
        icon={blockTypeToBlockIcon["bullet"]}
        onClick={formatBulletList}>
        <span className="text">Bullet List</span>
      </DropDownItem>
      <DropDownItem
        selected={blockType === "number"}
        icon={blockTypeToBlockIcon["number"]}
        onClick={formatNumberedList}>
        <span className="text">Numbered List</span>
      </DropDownItem>
      <DropDownItem
        icon={blockTypeToBlockIcon["check"]}
        selected={blockType === "check"}
        onClick={formatCheckList}>
        <span className="text">Check List</span>
      </DropDownItem>
      <DropDownItem
        icon={blockTypeToBlockIcon["quote"]}
        selected={blockType === "quote"}
        onClick={formatQuote}>
        <span className="text">Quote</span>
      </DropDownItem>
      <DropDownItem
        icon={blockTypeToBlockIcon["code"]}
        selected={blockType === "code"}
        onClick={formatCode}>
        <span className="text">Code Block</span>
      </DropDownItem>
    </DropDown>
  );
}

function Divider(): JSX.Element {
  return <div className="divider" />;
}

export default function ToolbarPlugin(): JSX.Element | null {
  const [editor] = useLexicalComposerContext();
  const [activeEditor, setActiveEditor] = useState(editor);
  const [blockType, setBlockType] =
    useState<keyof typeof blockTypeToBlockName>("paragraph");
  const [rootType, setRootType] =
    useState<keyof typeof rootTypeToRootName>("root");
  const [selectedElementKey, setSelectedElementKey] = useState<NodeKey | null>(
    null
  );
  const [fontSize, setFontSize] = useState<string>("15px");
  const [fontColor, setFontColor] = useState<string>("#000");
  const [bgColor, setBgColor] = useState<string>("#fff");
  const [fontFamily, setFontFamily] = useState<string>("Arial");
  const [isLink, setIsLink] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [isSubscript, setIsSubscript] = useState(false);
  const [isSuperscript, setIsSuperscript] = useState(false);
  const [isCode, setIsCode] = useState(false);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [modal, showModal] = useModal();
  const [isRTL, setIsRTL] = useState(false);
  const [codeLanguage, setCodeLanguage] = useState<string>("");
  const [isEditable, setIsEditable] = useState(() => editor.isEditable());

  const $updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      const anchorNode = selection.anchor.getNode();
      let element =
        anchorNode.getKey() === "root"
          ? anchorNode
          : $findMatchingParent(anchorNode, e => {
              const parent = e.getParent();
              return parent !== null && $isRootOrShadowRoot(parent);
            });

      if (element === null) {
        element = anchorNode.getTopLevelElementOrThrow();
      }

      const elementKey = element.getKey();
      const elementDOM = activeEditor.getElementByKey(elementKey);

      // Update text format
      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
      setIsUnderline(selection.hasFormat("underline"));
      setIsStrikethrough(selection.hasFormat("strikethrough"));
      setIsSubscript(selection.hasFormat("subscript"));
      setIsSuperscript(selection.hasFormat("superscript"));
      setIsCode(selection.hasFormat("code"));
      setIsRTL($isParentElementRTL(selection));

      // Update links
      const node = getSelectedNode(selection);
      const parent = node.getParent();
      if ($isLinkNode(parent) || $isLinkNode(node)) {
        setIsLink(true);
      } else {
        setIsLink(false);
      }

      const tableNode = $findMatchingParent(node, $isTableNode);
      if ($isTableNode(tableNode)) {
        setRootType("table");
      } else {
        setRootType("root");
      }

      if (elementDOM !== null) {
        setSelectedElementKey(elementKey);
        if ($isListNode(element)) {
          const parentList = $getNearestNodeOfType<ListNode>(
            anchorNode,
            ListNode
          );
          const type = parentList
            ? parentList.getListType()
            : element.getListType();
          setBlockType(type);
        } else {
          const type = $isHeadingNode(element)
            ? element.getTag()
            : element.getType();
          if (type in blockTypeToBlockName) {
            setBlockType(type as keyof typeof blockTypeToBlockName);
          }
          if ($isCodeNode(element)) {
            const language =
              element.getLanguage() as keyof typeof CODE_LANGUAGE_MAP;
            setCodeLanguage(
              language ? CODE_LANGUAGE_MAP[language] || language : ""
            );
            return;
          }
        }
      }
      // Handle buttons
      setFontSize(
        $getSelectionStyleValueForProperty(selection, "font-size", "15px")
      );
      setFontColor(
        $getSelectionStyleValueForProperty(selection, "color", "#000")
      );
      setBgColor(
        $getSelectionStyleValueForProperty(
          selection,
          "background-color",
          "#fff"
        )
      );
      setFontFamily(
        $getSelectionStyleValueForProperty(selection, "font-family", "Arial")
      );
    }
  }, [activeEditor]);

  useEffect(() => {
    return editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      (_payload, newEditor) => {
        $updateToolbar();
        setActiveEditor(newEditor);
        return false;
      },
      COMMAND_PRIORITY_CRITICAL
    );
  }, [editor, $updateToolbar]);

  useEffect(() => {
    return mergeRegister(
      editor.registerEditableListener(editable => {
        setIsEditable(editable);
      }),
      activeEditor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          $updateToolbar();
        });
      }),
      activeEditor.registerCommand<boolean>(
        CAN_UNDO_COMMAND,
        payload => {
          setCanUndo(payload);
          return false;
        },
        COMMAND_PRIORITY_CRITICAL
      ),
      activeEditor.registerCommand<boolean>(
        CAN_REDO_COMMAND,
        payload => {
          setCanRedo(payload);
          return false;
        },
        COMMAND_PRIORITY_CRITICAL
      )
    );
  }, [$updateToolbar, activeEditor, editor]);

  useEffect(() => {
    return activeEditor.registerCommand(
      KEY_MODIFIER_COMMAND,
      payload => {
        const event: KeyboardEvent = payload;
        const { code, ctrlKey, metaKey } = event;

        if (code === "KeyK" && (ctrlKey || metaKey)) {
          event.preventDefault();
          return activeEditor.dispatchCommand(
            TOGGLE_LINK_COMMAND,
            sanitizeUrl("https://")
          );
        }
        return false;
      },
      COMMAND_PRIORITY_NORMAL
    );
  }, [activeEditor, isLink]);

  const applyStyleText = useCallback(
    (styles: Record<string, string>) => {
      activeEditor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          $patchStyleText(selection, styles);
        }
      });
    },
    [activeEditor]
  );

  const clearFormatting = useCallback(() => {
    activeEditor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        const anchor = selection.anchor;
        const focus = selection.focus;
        const nodes = selection.getNodes();

        if (anchor.key === focus.key && anchor.offset === focus.offset) {
          return;
        }

        nodes.forEach((node, idx) => {
          // We split the first and last node by the selection
          // So that we don't format unselected text inside those nodes
          if ($isTextNode(node)) {
            if (idx === 0 && anchor.offset !== 0) {
              node = node.splitText(anchor.offset)[1] || node;
            }
            if (idx === nodes.length - 1) {
              node = node.splitText(focus.offset)[0] || node;
            }

            if (node.__style !== "") {
              node.setStyle("");
            }
            if (node.__format !== 0) {
              node.setFormat(0);
              $getNearestBlockElementAncestorOrThrow(node).setFormat("");
            }
          } else if ($isHeadingNode(node) || $isQuoteNode(node)) {
            node.replace($createParagraphNode(), true);
          } else if ($isDecoratorBlockNode(node)) {
            node.setFormat("");
          }
        });
      }
    });
  }, [activeEditor]);

  const onFontColorSelect = useCallback(
    (value: string) => {
      applyStyleText({ color: value });
    },
    [applyStyleText]
  );

  const onBgColorSelect = useCallback(
    (value: string) => {
      applyStyleText({ "background-color": value });
    },
    [applyStyleText]
  );

  const insertLink = useCallback(() => {
    if (!isLink) {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, sanitizeUrl("https://"));
    } else {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
    }
  }, [editor, isLink]);

  const onCodeLanguageSelect = useCallback(
    (value: string) => {
      activeEditor.update(() => {
        if (selectedElementKey !== null) {
          const node = $getNodeByKey(selectedElementKey);
          if ($isCodeNode(node)) {
            node.setLanguage(value);
          }
        }
      });
    },
    [activeEditor, selectedElementKey]
  );

  if (!editor.isEditable()) {
    return null;
  }

  return (
    <IconContext.Provider value={{ style: { width: "20px", height: "20px" } }}>
      <div className={styles.toolbar}>
        <ToolbarButton
          disabled={!canUndo || !isEditable}
          onClick={(): void => {
            activeEditor.dispatchCommand(UNDO_COMMAND, undefined);
          }}
          title={IS_APPLE ? "Undo (⌘Z)" : "Undo (Ctrl+Z)"}
          type="button"
          className={`${styles.toolbarItem} ${styles.spaced}`}
          aria-label="Undo">
          <BsArrowCounterclockwise />
        </ToolbarButton>
        <ToolbarButton
          disabled={!canRedo || !isEditable}
          onClick={(): void => {
            activeEditor.dispatchCommand(REDO_COMMAND, undefined);
          }}
          title={IS_APPLE ? "Redo (⌘Y)" : "Redo (Ctrl+Y)"}
          type="button"
          className={styles.toolbarItem}
          aria-label="Redo">
          <BsArrowClockwise />
        </ToolbarButton>
        <Divider />
        {blockType in blockTypeToBlockName && activeEditor === editor && (
          <>
            <BlockFormatDropDown
              disabled={!isEditable}
              blockType={blockType}
              rootType={rootType}
              editor={editor}
            />
            <Divider />
          </>
        )}
        {blockType === "code" ? (
          <DropDown
            disabled={!isEditable}
            buttonClassName={`${styles.toolbarItem} ${styles.codeLanguage}`}
            buttonLabel={getLanguageFriendlyName(codeLanguage)}
            buttonAriaLabel="Select language">
            {CODE_LANGUAGE_OPTIONS.map(([value, name]) => {
              return (
                <DropDownItem
                  selected={codeLanguage === value}
                  onClick={(): void => onCodeLanguageSelect(value)}
                  key={value}>
                  <span className={styles.text}>{name}</span>
                </DropDownItem>
              );
            })}
          </DropDown>
        ) : (
          <>
            <Divider />
            <ToolbarButton
              disabled={!isEditable}
              onClick={() => {
                activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
              }}
              className={`${styles.toolbarItem} ${styles.spaced} ${
                isBold ? styles.active : ""
              }`}
              title={IS_APPLE ? "Bold (⌘B)" : "Bold (Ctrl+B)"}
              type="button"
              aria-label={`Format text as bold. Shortcut: ${
                IS_APPLE ? "⌘B" : "Ctrl+B"
              }`}>
              <BsTypeBold />
            </ToolbarButton>
            <ToolbarButton
              disabled={!isEditable}
              onClick={() => {
                activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
              }}
              className={`${styles.toolbarItem} ${styles.spaced} ${
                isItalic ? styles.active : ""
              }`}
              title={IS_APPLE ? "Italic (⌘I)" : "Italic (Ctrl+I)"}
              type="button"
              aria-label={`Format text as italics. Shortcut: ${
                IS_APPLE ? "⌘I" : "Ctrl+I"
              }`}>
              <BsTypeItalic />
            </ToolbarButton>
            <ToolbarButton
              disabled={!isEditable}
              onClick={() => {
                activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline");
              }}
              className={`${styles.toolbarItem} ${styles.spaced} ${
                isUnderline ? styles.active : ""
              }`}
              title={IS_APPLE ? "Underline (⌘U)" : "Underline (Ctrl+U)"}
              type="button"
              aria-label={`Format text to underlined. Shortcut: ${
                IS_APPLE ? "⌘U" : "Ctrl+U"
              }`}>
              <BsTypeUnderline />
            </ToolbarButton>
            <ToolbarButton
              disabled={!isEditable}
              onClick={() => {
                activeEditor.dispatchCommand(FORMAT_TEXT_COMMAND, "code");
              }}
              className={`${styles.toolbarItem} ${styles.spaced} ${
                isCode ? styles.active : ""
              }`}
              title="Insert code block"
              type="button"
              aria-label="Insert code block">
              <BsCode />
            </ToolbarButton>
            <ToolbarButton
              disabled={!isEditable}
              onClick={insertLink}
              className={`${styles.toolbarItem} ${styles.spaced} ${
                isLink ? styles.active : ""
              }`}
              aria-label="Insert link"
              title="Insert link"
              type="button">
              <BsLink />
            </ToolbarButton>
            <DropDown
              disabled={!isEditable}
              buttonClassName={`${styles.toolbarItem} ${styles.spaced}`}
              buttonLabel=""
              buttonAriaLabel="Formatting options for additional text styles"
              buttonIcon={<BsType />}>
              <DropDownItem
                onClick={() => {
                  activeEditor.dispatchCommand(
                    FORMAT_TEXT_COMMAND,
                    "strikethrough"
                  );
                }}
                icon={<BsTypeStrikethrough />}
                title="Strikethrough"
                aria-label="Format text with a strikethrough">
                <span className={styles.text}>Strikethrough</span>
              </DropDownItem>
              <DropDownItem
                onClick={() => {
                  activeEditor.dispatchCommand(
                    FORMAT_TEXT_COMMAND,
                    "subscript"
                  );
                }}
                icon={<BsSubscript />}
                title="Subscript"
                aria-label="Format text with a subscript">
                <span className="text">Subscript</span>
              </DropDownItem>
              <DropDownItem
                onClick={() => {
                  activeEditor.dispatchCommand(
                    FORMAT_TEXT_COMMAND,
                    "superscript"
                  );
                }}
                icon={<BsSuperscript />}
                title="Superscript"
                aria-label="Format text with a superscript">
                <span className="text">Superscript</span>
              </DropDownItem>
              <DropDownItem
                onClick={clearFormatting}
                icon={<BsTrash />}
                title="Clear text formatting"
                aria-label="Clear all text formatting">
                <span className="text">Clear Formatting</span>
              </DropDownItem>
            </DropDown>
            <Divider />
            {rootType === "table" && (
              <>
                <DropDown
                  disabled={!isEditable}
                  buttonClassName="toolbar-item spaced"
                  buttonLabel="Table"
                  buttonAriaLabel="Open table toolkit"
                  buttonIcon={<BsTable />}>
                  <DropDownItem
                    onClick={() => {
                      /**/
                    }}>
                    <span className="text">TODO</span>
                  </DropDownItem>
                </DropDown>
                <Divider />
              </>
            )}
            <DropDown
              disabled={!isEditable}
              buttonClassName="toolbar-item spaced"
              buttonLabel="Insert"
              buttonAriaLabel="Insert specialized editor node"
              buttonIcon={<BsPlus />}>
              <DropDownItem
                onClick={() => {
                  activeEditor.dispatchCommand(
                    INSERT_HORIZONTAL_RULE_COMMAND,
                    undefined
                  );
                }}
                icon={<BsDashLg />}>
                <span className="text">Horizontal Rule</span>
              </DropDownItem>
            </DropDown>
          </>
        )}
        <Divider />
        <DropDown
          disabled={!isEditable}
          buttonLabel="Align"
          buttonIcon={<BsTextLeft />}
          buttonClassName="toolbar-item spaced alignment"
          buttonAriaLabel="Formatting options for text alignment">
          <DropDownItem
            icon={<BsTextLeft />}
            onClick={() => {
              activeEditor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left");
            }}>
            <span className="text">Left Align</span>
          </DropDownItem>
          <DropDownItem
            icon={<BsTextCenter />}
            onClick={() => {
              activeEditor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center");
            }}>
            <span className="text">Center Align</span>
          </DropDownItem>
          <DropDownItem
            icon={<BsTextRight />}
            onClick={() => {
              activeEditor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right");
            }}>
            <span className="text">Right Align</span>
          </DropDownItem>
          <DropDownItem
            onClick={() => {
              activeEditor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "justify");
            }}>
            <i className="icon justify-align" />
            <span className="text">Justify Align</span>
          </DropDownItem>
          <Divider />
          <DropDownItem
            onClick={() => {
              activeEditor.dispatchCommand(OUTDENT_CONTENT_COMMAND, undefined);
            }}
            icon={<BsTextIndentRight />}>
            <span className="text">Outdent</span>
          </DropDownItem>
          <DropDownItem
            onClick={() => {
              activeEditor.dispatchCommand(INDENT_CONTENT_COMMAND, undefined);
            }}
            icon={<BsTextIndentLeft />}>
            <span className="text">Indent</span>
          </DropDownItem>
        </DropDown>

        {modal}
      </div>
    </IconContext.Provider>
  );
}
