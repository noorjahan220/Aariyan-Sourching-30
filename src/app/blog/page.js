import Blog from "../../../components/Blogs/Blog";

const api_url = process.env.NEXT_PUBLIC_API_BASE_URL;

const Page = async () => {
  let blogs = [];
  let commentCounts = {};

  try {
    const blogsRes = await fetch(`${api_url}/blogs`, {
      next: { revalidate: 60 },
    });

    if (!blogsRes.ok) {
      console.error(`Failed to fetch blogs. Status: ${blogsRes.status}`);
    } else {
      const blogsData = await blogsRes.json();

      blogs = Array.isArray(blogsData) ? blogsData : blogsData.blogs || [];
    }

    if (blogs.length > 0) {
      const commentsRes = await fetch(`${api_url}/comments`, {
        cache: "no-store",
      });

      if (commentsRes.ok) {
        const allComments = await commentsRes.json();

        commentCounts = allComments.reduce((acc, comment) => {
          const blogId = comment.blogId;
          if (blogId) acc[blogId] = (acc[blogId] || 0) + 1;
          return acc;
        }, {});
      } else {
        console.error(
          `Failed to fetch comments. Status: ${commentsRes.status}`
        );
      }
    }
  } catch (error) {
    console.error(
      "An error occurred during data fetching for the blog page:",
      error
    );

    blogs = [];
    commentCounts = {};
  }

  return (
    <div>
      <Blog blogs={blogs} commentCounts={commentCounts} />
    </div>
  );
};

export default Page;
