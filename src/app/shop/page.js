import Shop from "../../../Pages/Shop/Shop";

async function getProducts(searchParams) {
  const query = new URLSearchParams(Object.entries(searchParams)).toString();
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/find-filterd-products?${query}`,
    {
      revalidate: 10,
    }
  );

  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export default async function page({ searchParams }) {
  const products = await getProducts(searchParams);

  return <Shop products={products} />;
}
