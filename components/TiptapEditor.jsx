'use client';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import { Controller } from 'react-hook-form';
import { useCallback, useRef } from 'react';
import toast from 'react-hot-toast';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { FaBold, FaItalic, FaStrikethrough, FaLink, FaListUl, FaListOl, FaQuoteLeft, FaImage, FaUndo, FaRedo } from 'react-icons/fa';

const Toolbar = ({ editor }) => {
  // --- HOOKS MUST BE CALLED UNCONDITIONALLY AT THE TOP ---
  const axiosSecure = useAxiosSecure();
  const fileInputRef = useRef(null);

  const setLink = useCallback(() => {
    if (!editor) return;
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);
    if (url === null) return;
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);

  // --- REGULAR FUNCTIONS ---
  const handleFileChange = async (event) => {
    if (!editor) return;
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);
    
    const toastId = toast.loading('Uploading image...');

    try {
      const { data } = await axiosSecure.post('/blogs/upload-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (data.success && data.imageUrl) {
        const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}${data.imageUrl}`;
        editor.chain().focus().setImage({ src: url }).run();
        toast.success('Image uploaded!', { id: toastId });
      } else {
        throw new Error('Image URL not returned from server.');
      }
    } catch (error) {
      console.error('Image upload failed:', error);
      toast.error('Image upload failed.', { id: toastId });
    } finally {
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const triggerImageUpload = () => {
    fileInputRef.current?.click();
  };

  // --- EARLY RETURN (AFTER HOOKS) ---
  if (!editor) {
    return null;
  }
  
  // --- JSX RETURN ---
  return (
    <div className="p-2 border border-gray-300 bg-gray-50 rounded-t-lg flex flex-wrap items-center gap-2">
      <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
      <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={`p-2 rounded ${editor.isActive('bold') ? 'bg-gray-300' : 'hover:bg-gray-200'}`}><FaBold /></button>
      <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={`p-2 rounded ${editor.isActive('italic') ? 'bg-gray-300' : 'hover:bg-gray-200'}`}><FaItalic /></button>
      <button type="button" onClick={() => editor.chain().focus().toggleStrike().run()} className={`p-2 rounded ${editor.isActive('strike') ? 'bg-gray-300' : 'hover:bg-gray-200'}`}><FaStrikethrough /></button>
      <button type="button" onClick={setLink} className={`p-2 rounded ${editor.isActive('link') ? 'bg-gray-300' : 'hover:bg-gray-200'}`}><FaLink /></button>
      <div className="w-[1px] h-6 bg-gray-300 mx-2"></div>
      <button type="button" onClick={triggerImageUpload} className="p-2 rounded hover:bg-gray-200"><FaImage /></button>
      <div className="w-[1px] h-6 bg-gray-300 mx-2"></div>
      <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={`p-2 rounded ${editor.isActive('bulletList') ? 'bg-gray-300' : 'hover:bg-gray-200'}`}><FaListUl /></button>
      <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={`p-2 rounded ${editor.isActive('orderedList') ? 'bg-gray-300' : 'hover:bg-gray-200'}`}><FaListOl /></button>
      <button type="button" onClick={() => editor.chain().focus().toggleBlockquote().run()} className={`p-2 rounded ${editor.isActive('blockquote') ? 'bg-gray-300' : 'hover:bg-gray-200'}`}><FaQuoteLeft /></button>
      <div className="w-[1px] h-6 bg-gray-300 mx-2"></div>
      <button type="button" onClick={() => editor.chain().focus().undo().run()} className="p-2 rounded hover:bg-gray-200"><FaUndo /></button>
      <button type="button" onClick={() => editor.chain().focus().redo().run()} className="p-2 rounded hover:bg-gray-200"><FaRedo /></button>
    </div>
  );
};

const TiptapEditor = ({ name, control, defaultValue = null }) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field, fieldState: { error } }) => {
        const editor = useEditor({
          extensions: [StarterKit, Image, Link.configure({ openOnClick: false })],
          content: field.value,
          onUpdate: ({ editor }) => {
            field.onChange(!editor.isEmpty ? editor.getJSON() : null);
          },
          editorProps: {
            attributes: {
              class: 'prose prose-sm sm:prose-base max-w-none focus:outline-none p-4 min-h-[250px]',
            },
          },
          immediatelyRender: false,
        });

        return (
          <div>
            <div className="border border-gray-300 rounded-lg">
              <Toolbar editor={editor} />
              <EditorContent editor={editor} className="bg-white rounded-b-lg" />
            </div>
            {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
          </div>
        );
      }}
    />
  );
};

export default TiptapEditor;