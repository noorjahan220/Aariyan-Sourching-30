"use client";

import React, { useCallback, useEffect, useState } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";

import { $getSelection, $isRangeSelection, FORMAT_TEXT_COMMAND, SELECTION_CHANGE_COMMAND, CAN_REDO_COMMAND, CAN_UNDO_COMMAND, REDO_COMMAND, UNDO_COMMAND, $isTextNode } from "lexical";
import { $isLinkNode, TOGGLE_LINK_COMMAND, LinkNode } from "@lexical/link";
import { $isListNode, ListNode, ListItemNode, INSERT_ORDERED_LIST_COMMAND, INSERT_UNORDERED_LIST_COMMAND, REMOVE_LIST_COMMAND } from "@lexical/list";
import { $getNearestNodeOfType, mergeRegister } from "@lexical/utils";

import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { Controller } from "react-hook-form";

import { FaBold, FaItalic, FaUnderline, FaLink, FaUndo, FaRedo, FaListUl, FaListOl, FaPlus, FaMinus } from "react-icons/fa";

const LowPriority = 1;
const DEFAULT_FONT_SIZE = 16; // বেস ফন্ট সাইজ


const ToolbarPlugin = () => {
  const [editor] = useLexicalComposerContext();
  const [isLink, setIsLink] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isBulletList, setIsBulletList] = useState(false);
  const [isNumberedList, setIsNumberedList] = useState(false);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  // ফন্ট সাইজের জন্য নতুন state
  const [fontSize, setFontSize] = useState(DEFAULT_FONT_SIZE);

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      // Inline text formats
      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
      setIsUnderline(selection.hasFormat("underline"));

      const anchorNode = selection.anchor.getNode();
      
      // Link status
      const node = anchorNode.getParent();
      setIsLink($isLinkNode(node) || $isLinkNode(anchorNode));

      // ফন্ট সাইজ ডিটেক্ট করা
      const element = editor.getElementByKey(anchorNode.getKey());
      if (element) {
        const computedStyle = window.getComputedStyle(element);
        const currentSize = parseInt(computedStyle.fontSize, 10) || DEFAULT_FONT_SIZE;
        setFontSize(currentSize);
      }

      // List status
      const elementForList = anchorNode.getKey() === "root" ? anchorNode : anchorNode.getTopLevelElementOrThrow();
      if ($isListNode(elementForList)) {
        const parentList = $getNearestNodeOfType(anchorNode, ListNode);
        const type = parentList ? parentList.getTag() : elementForList.getTag();
        setIsBulletList(type === "ul");
        setIsNumberedList(type === "ol");
      } else {
        setIsBulletList(false);
        setIsNumberedList(false);
      }
    }
  }, [editor]);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => updateToolbar());
      }),
      editor.registerCommand(SELECTION_CHANGE_COMMAND, () => { updateToolbar(); return false; }, LowPriority),
      editor.registerCommand(CAN_UNDO_COMMAND, (payload) => { setCanUndo(payload); return false; }, LowPriority),
      editor.registerCommand(CAN_REDO_COMMAND, (payload) => { setCanRedo(payload); return false; }, LowPriority)
    );
  }, [editor, updateToolbar]);
  
  // ফন্ট সাইজ পরিবর্তন করার ফাংশন
  const applyFontSize = useCallback((newSize) => {
    const newSizePx = `${newSize}px`;
    editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
            const nodes = selection.getNodes();
            nodes.forEach((node) => {
                // স্টাইল প্রয়োগ করার জন্য টেক্সট নোড প্রয়োজন
                let targetNode = $isTextNode(node) ? node : node.getWritable();
                if($isTextNode(targetNode)){
                    targetNode.setStyle(`font-size: ${newSizePx};`);
                }
            });
        }
    });
    setFontSize(newSize);
  }, [editor]);

  const insertLink = useCallback(() => {
    if (!isLink) {
      const url = prompt("Enter URL:");
      if (url) editor.dispatchCommand(TOGGLE_LINK_COMMAND, url);
    } else {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
    }
  }, [editor, isLink]);

  const formatBulletList = () => {
    if (!isBulletList) editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
    else editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
  };

  const formatNumberedList = () => {
    if (!isNumberedList) editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
    else editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
  };
  
  return (
    <div className="p-2 border-b border-gray-300 bg-gray-50 rounded-t-lg flex flex-wrap items-center gap-2">
      <button type="button" disabled={!canUndo} onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)} className="p-2 rounded hover:bg-gray-200 disabled:opacity-50"><FaUndo /></button>
      <button type="button" disabled={!canRedo} onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)} className="p-2 rounded hover:bg-gray-200 disabled:opacity-50"><FaRedo /></button>
      <div className="w-[1px] h-6 bg-gray-300 mx-2"></div>
      
      {/* ফন্ট সাইজ কন্ট্রোল */}
      <div className="flex items-center gap-1 border border-gray-300 rounded bg-white px-1">
          <button type="button" onClick={() => applyFontSize(Math.max(8, fontSize - 2))} className="p-1 rounded hover:bg-gray-200 disabled:opacity-50" disabled={fontSize <= 8}>
              <FaMinus size={14}/>
          </button>
          <span className="text-sm font-semibold w-8 text-center">{fontSize}px</span>
          <button type="button" onClick={() => applyFontSize(Math.min(72, fontSize + 2))} className="p-1 rounded hover:bg-gray-200 disabled:opacity-50" disabled={fontSize >= 72}>
              <FaPlus size={14} />
          </button>
      </div>

      <div className="w-[1px] h-6 bg-gray-300 mx-2"></div>

      <button type="button" onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")} className={`p-2 rounded ${isBold ? "bg-gray-300" : "hover:bg-gray-200"}`}><FaBold /></button>
      <button type="button" onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")} className={`p-2 rounded ${isItalic ? "bg-gray-300" : "hover:bg-gray-200"}`}><FaItalic /></button>
      <button type="button" onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")} className={`p-2 rounded ${isUnderline ? "bg-gray-300" : "hover:bg-gray-200"}`}><FaUnderline /></button>
      <button type="button" onClick={insertLink} className={`p-2 rounded ${isLink ? "bg-gray-300" : "hover:bg-gray-200"}`}><FaLink /></button>
      <div className="w-[1px] h-6 bg-gray-300 mx-2"></div>
      
      <button type="button" onClick={formatBulletList} className={`p-2 rounded ${isBulletList ? "bg-gray-300" : "hover:bg-gray-200"}`}><FaListUl /></button>
      <button type="button" onClick={formatNumberedList} className={`p-2 rounded ${isNumberedList ? "bg-gray-300" : "hover:bg-gray-200"}`}><FaListOl /></button>
    </div>
  );
};


// Main LexicalEditor component (অপরিবর্তিত)
const ProductDetailsDescription = ({ name, control, defaultValue = "" }) => {
  const editorTheme = {
      // ডিফল্ট প্যারাগ্রাফ স্টাইল এখান থেকে সরানো হয়েছে কারণ এটি ইনলাইন স্টাইলকে ওভাররাইড করতে পারে
      // paragraph: "text-base", // You can keep it if you want
      list: {
        nested: { listitem: "ml-8" },
        ol: "list-decimal list-inside my-2",
        ul: "list-disc list-inside my-2",
      },
      link: "text-blue-600 hover:underline cursor-pointer",
      text: { bold: "font-bold", italic: "italic", underline: "underline" },
      // হেডিং/কোট এর স্টাইলগুলো রাখা হলো, যদি কন্টেন্ট পেস্ট করা হয়
      h1: "text-3xl font-bold my-4",
      h2: "text-2xl font-bold my-3",
      h3: "text-xl font-bold my-2",
      quote: "pl-4 border-l-4 border-gray-300 italic text-gray-600 my-2",
  };

  const initialConfig = {
    namespace: "MyRichTextEditor",
    theme: editorTheme,
    editorState: defaultValue ? JSON.stringify(defaultValue) : null,
    onError: (error) => console.error(error),
    // নোডের লিস্টে HeadingNode, QuoteNode রাখতে হবে
    nodes: [HeadingNode, ListNode, ListItemNode, QuoteNode, CodeNode, CodeHighlightNode, LinkNode],
  };

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field, fieldState: { error } }) => (
        <>
          <LexicalComposer initialConfig={initialConfig}>
            <div className="border border-gray-300 rounded-lg">
              <ToolbarPlugin />
              <div className="relative">
                <RichTextPlugin
                  contentEditable={<ContentEditable className="outline-none p-4 bg-white rounded-b-lg editor-content" />}
                  placeholder={<div className="text-gray-400 absolute top-4 left-4 pointer-events-none">Enter Product description...</div>}
                />
                <OnChangePlugin
                  onChange={(editorState) => {
                    const editorStateJSON = editorState.toJSON();
                    if (JSON.stringify(editorStateJSON.root.children) !== '[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}]') {
                        field.onChange(editorStateJSON);
                    }
                  }}
                />
                <HistoryPlugin />
                <ListPlugin />
                <LinkPlugin />
              </div>
            </div>
          </LexicalComposer>
          {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
        </>
      )}
    />
  );
};


export default ProductDetailsDescription;