'use client';

import Image from 'next/image';
import Link from 'next/link';
import TiptapRenderer from '../TiptapRenderer'; // Adjust path if necessary

// A helper function to safely parse JSON content.
const safelyParseJSON = (jsonString) => {
  if (!jsonString) return null;
  // If it's already an object, return it directly.
  if (typeof jsonString === 'object') return jsonString;

  try {
    return JSON.parse(jsonString);
  } catch (error) {
    console.error("Failed to parse blog content JSON:", error);
    return null; // Return null if parsing fails
  }
};

const BlogPostCard = ({ blog }) => {
  // Ensure the blog object exists before trying to access its properties
  if (!blog) {
    return null;
  }

  // Safely parse the short description from the blog prop.
  const shortDescriptionJson = safelyParseJSON(blog.shortDescription);
  const img_api = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.aaryansourcing.com';

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden transition-shadow duration-300 hover:shadow-xl flex flex-col">
      <Link href={`/blog/${blog._id}`} className="block relative h-48 w-full group">
        <Image
          src={`${img_api}${blog.image}`}
          alt={blog.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: 'cover' }}
          className="transition-transform duration-300 group-hover:scale-105"
        />
      </Link>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="mb-2">
          <span className="text-sm font-semibold text-yellow-500 uppercase">{blog.category}</span>
        </div>
        
        <Link href={`/blog/${blog._id}`} className="hover:text-yellow-600">
          <h3 className="text-xl font-bold tracking-tight text-gray-900 line-clamp-2">
            {blog.title}
          </h3>
        </Link>
        
        <div className="mt-3 text-gray-600 line-clamp-3 flex-grow">
          <TiptapRenderer jsonContent={shortDescriptionJson} />
        </div>
        
        <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
          <span>{new Date(blog.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          
          <Link href={`/blog/${blog._id}`} className="font-semibold text-yellow-500 hover:text-yellow-700">
            Read More &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogPostCard;