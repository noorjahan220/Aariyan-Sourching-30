import Blog from '../../../components/Blogs/Blog';

const api_url = process.env.NEXT_PUBLIC_API_BASE_URL;

const Page = async () => {
  const blogsRes = await fetch(`${api_url}/blogs`);
  const blogsData = await blogsRes.json();
  const blogs = Array.isArray(blogsData) ? blogsData : blogsData.blogs || [];

  let commentCounts = {};
  if (blogs.length > 0) {
    const commentsRes = await fetch(`${api_url}/comments`, { cache: "no-store" });
    if (commentsRes.ok) {
      const allComments = await commentsRes.json();
      commentCounts = allComments.reduce((acc, comment) => {
        const blogId = comment.blogId;
        if (blogId) acc[blogId] = (acc[blogId] || 0) + 1;
        return acc;
      }, {});
    }
  }

  return (
    <div>
      <Blog blogs={blogs} commentCounts={commentCounts} />
    </div>
  );
};

export default Page;
