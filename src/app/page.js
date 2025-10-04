import React from 'react'
import Home from '../../Pages/Home/Home'
import featuredData from '../../lib/featured';
import newarrivalData from '../../lib/newarrival';
import trendingData from '../../lib/trending';

export default async function page() {

   let slides = [];
  let allProducts = [];
  let blogs = [];
  let commentCounts = {};

  const featured = await featuredData();
  const newarrival = await newarrivalData();
  const trending = await trendingData();


  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/banners`,  { next: { revalidate: 10 } });
    if (res.ok) {
      const data = await res.json();
      slides = Array.isArray(data) ? data : [];
    }
  } catch (error) {
    console.error("Error fetching banners:", error);
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL_ALL}find-products`,
       { next: { revalidate: 10 } }
    );
    if (res.ok) {
      const data = await res.json();
      allProducts = Array.isArray(data) ? data : [];
    }
  } catch (error) {
    console.error("Error fetching products:", error);
  }
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/blogs?limit=4`,  { next: { revalidate: 10 } }
    );
    if (res.ok) {
      const data = await res.json();
      blogs = data.blogs || [];
      if (blogs.length > 0) {
        const commentsRes = await fetch(
         `${process.env.NEXT_PUBLIC_API_BASE_URL}/comments`,
            { next: { revalidate: 10 } }
        );
        if (commentsRes.ok) {
          const allComments = await commentsRes.json();
          commentCounts = allComments.reduce((acc, comment) => {
            const blogId = comment.blogId;
            if (blogId) acc[blogId] = (acc[blogId] || 0) + 1;
            return acc;
          }, {});
        }
      }
    }
  } catch (error) {
    console.error("Error fetching latest news:", error);
  }

  return (
    <>
    <Home slides={slides}  allProducts={allProducts} blogs={blogs} commentCounts={commentCounts} featuredData={featured} newarrivalData={newarrival} trendingData={trending}/>
    </>
  )
}