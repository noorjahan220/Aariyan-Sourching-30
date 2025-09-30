import BlogDetails from "../../../../components/BlogDetails";

export default async function page({ params }) {
  const { id } = await params;
  
  return <BlogDetails id={id} />;
}
