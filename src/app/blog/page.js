import Blog from '../../../components/Blogs/Blog';

const api_url = process.env.NEXT_PUBLIC_API_BASE_URL;

// This is the Page component, which is a Server Component in Next.js 13+ App Router
const Page = async () => {
  let blogs = [];
  let commentCounts = {};

  try {
    // --- Fetch Blogs ---
    const blogsRes = await fetch(`${api_url}/blogs`, {
      next: { revalidate: 60 } // Optional: revalidate data every 60 seconds
    });

    // THE CRUCIAL CHECK: Ensure the blogs fetch was successful
    if (!blogsRes.ok) {
      // If the response is not OK (e.g., 404, 500), log the error and proceed with empty data.
      console.error(`Failed to fetch blogs. Status: ${blogsRes.status}`);
      // The function will continue and render the Blog component with empty arrays.
    } else {
      // Only parse JSON if the request was successful
      const blogsData = await blogsRes.json();
      // Ensure blogs is always an array
      blogs = Array.isArray(blogsData) ? blogsData : blogsData.blogs || [];
    }

    // --- Fetch Comments (only if blogs were found) ---
    if (blogs.length > 0) {
      const commentsRes = await fetch(`${api_url}/comments`, { cache: "no-store" });
      
      if (commentsRes.ok) {
        const allComments = await commentsRes.json();
        // Your existing logic for counting comments is great
        commentCounts = allComments.reduce((acc, comment) => {
          const blogId = comment.blogId;
          if (blogId) acc[blogId] = (acc[blogId] || 0) + 1;
          return acc;
        }, {});
      } else {
        console.error(`Failed to fetch comments. Status: ${commentsRes.status}`);
        // Proceed with empty comment counts if this fetch fails
      }
    }
  } catch (error) {
    // This will catch network errors (e.g., API server is down) or any other exceptions.
    console.error("An error occurred during data fetching for the blog page:", error);
    // Ensure we render the page with empty data instead of crashing.
    blogs = [];
    commentCounts = {};
  }

  // The component will now always receive valid props (even if they are empty)
  return (
    <div>
      <Blog blogs={blogs} commentCounts={commentCounts} />
    </div>
  );
};

export default Page;