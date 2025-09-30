"use client";

import React, { useEffect, useState } from "react";
import { $generateHtmlFromNodes } from "@lexical/html";
import { createEditor, DecoratorNode } from "lexical"; 

// আপনার এডিটরের সব নোড এখানে ইম্পোর্ট করুন
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ListNode, ListItemNode } from "@lexical/list";
import { LinkNode } from "@lexical/link";
import { CodeNode, CodeHighlightNode } from "@lexical/code";

// --- TextileCare এডিটর থেকে ImageNode এর কোড এখানে যুক্ত করুন ---
class ImageNode extends DecoratorNode {
  __src;
  __alt;

  static getType() {
    return 'image';
  }

  static clone(node) {
    return new ImageNode(node.__src, node.__alt, node.__key);
  }

  static importJSON(serializedNode) {
    return $createImageNode(serializedNode.src, serializedNode.altText);
  }

  exportJSON() {
    return {
      type: 'image',
      src: this.getSrc(),
      altText: this.getAltText(),
      version: 1,
    };
  }
  
  getSrc() {
    return this.__src;
  }

  getAltText() {
    return this.__alt;
  }
  
  constructor(src, altText, key) {
    super(key);
    this.__src = src;
    this.__alt = altText;
  }

  createDOM(config) {
    const span = document.createElement('span');
    const theme = config.theme;
    if (theme.image !== undefined) {
      span.className = theme.image;
    }
    return span;
  }

  updateDOM() {
    return false;
  }
  
  decorate(editor, config) {
    const img = document.createElement('img');
    img.src = this.__src;
    img.alt = this.__alt;
    img.style.maxWidth = '100%';
    img.style.height = 'auto';
    img.style.display = 'block'; 
    return img;
  }
}

function $createImageNode(src, altText) {
  return new ImageNode(src, altText);
}
// ------------------------------------------------------------------


const editorNodes = [
  HeadingNode,
  QuoteNode,
  ListNode,
  ListItemNode,
  LinkNode,
  CodeNode,
  CodeHighlightNode,
  ImageNode, // <-- ImageNode এখানে যুক্ত আছে
];

const RichTextRenderer = ({ content }) => {
  const [htmlContent, setHtmlContent] = useState("");

  useEffect(() => {
    if (!content) {
      setHtmlContent("");
      return;
    }

    let editorStateObject;
    try {
      editorStateObject = typeof content === "string" ? JSON.parse(content) : content;
    } catch (e) {
      console.error("Failed to parse content", e);
      setHtmlContent("<p>Error rendering content.</p>");
      return;
    }

    const editor = createEditor({
      nodes: editorNodes,
      onError: (error) => console.error("Lexical Editor Error:", error),
    });

    try {
      // JSON অবজেক্ট থেকে EditorState তৈরি করা
      const editorState = editor.parseEditorState(editorStateObject);
      editor.setEditorState(editorState);

      editor.update(() => {
        const html = $generateHtmlFromNodes(editor, null);
        setHtmlContent(html);
      });
    } catch (error) {
       console.error("Failed to generate HTML", error);
       setHtmlContent("<p>Error rendering content.</p>");
    }
  }, [content]);

  if (!htmlContent) return null;

  return (
    <div
      className="rich-text-content prose max-w-none"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
};

export default RichTextRenderer;