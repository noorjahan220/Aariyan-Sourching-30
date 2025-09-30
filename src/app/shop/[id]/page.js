import ProductDetails from "../../../../Pages/Shop/ProductDetails";
export default async function page({ params }) {
  const { id } = await params;
  let allProduct = {};
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL_ALL}find-single-products/${id}`,
      { cache: "no-store" }
    );
    if (res.ok) {
      const data = await res.json();
      allProduct = data;
    }
  } catch (error) {
    console.error("Error fetching products:", error);
  }
  return (
    <>
      <ProductDetails myProductData={allProduct} id={id} />
    </>
  );
}
