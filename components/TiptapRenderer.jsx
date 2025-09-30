'use client';

import { useMemo } from 'react';
import { generateHTML } from '@tiptap/html';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';

const TiptapRenderer = ({ jsonContent }) => {
  const outputHtml = useMemo(() => {
    // Guard clause: If content is missing or not a valid Tiptap doc, return an empty string.
    if (!jsonContent || typeof jsonContent !== 'object' || !jsonContent.type || jsonContent.type !== 'doc') {
      return '';
    }

    // Attempt to generate HTML, with error handling
    try {
      return generateHTML(jsonContent, [
        StarterKit,
        Image,
        Link,
      ]);
    } catch (error) {
      console.error("TiptapRenderer: Failed to generate HTML from JSON content", error);
      // Return a fallback message or an empty string on error
      return '<p style="color: red;">Error rendering content.</p>';
    }
  }, [jsonContent]);

  // If there's no output, don't render an empty div
  if (!outputHtml) {
    return null;
  }

  // Use prose styles for consistent typography with the editor
  return (
    <div 
      className="prose prose-sm max-w-none" 
      dangerouslySetInnerHTML={{ __html: outputHtml }} 
    />
  );
};

export default TiptapRenderer;