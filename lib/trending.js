export default async function trendingData() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL_ALL}trending`,
      { next: { revalidate: 0} }
    );
    if (!res.ok) {
      throw new Error(`Failed to fetch filter attributes: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    return [];
  }
}