"use server";
import { revalidatePath } from "next/cache";

export async function addCategoryServer(key, value) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL_ALL}post-productAttribute`,
    {
      method: "POST",
      body: JSON.stringify({ key: key, value: value }),
      headers: { "Content-Type": "application/json" },
    }
  );

  if (!res.ok) throw new Error("Failed to add value");

  const data = await res.json();

  if (data.acknowledged) {
    revalidatePath("/admindashboard");
  }

  return data;
}

export async function deleteCategoryServer(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL_ALL}delete-productAttribute/category/${id}`,
    {
      method: "DELETE",
    }
  );

  if (!res.ok) throw new Error("Failed to delete category");

  const data = await res.json();

  if (data.modifiedCount > 0) {
    revalidatePath("/admindashboard");
  }

  return data;
}

export async function deleteSubCategoryServer(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL_ALL}delete-productAttribute/subCategory/${id}`,
    {
      method: "DELETE",
    }
  );

  if (!res.ok) throw new Error("Failed to delete category");

  const data = await res.json();

  if (data.modifiedCount > 0) {
    revalidatePath("/admindashboard");
  }

  return data;
}

export async function deleteColourServer(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL_ALL}delete-productAttribute/ProductColour/${id}`,
    {
      method: "DELETE",
    }
  );

  if (!res.ok) throw new Error("Failed to delete category");

  const data = await res.json();

  if (data.modifiedCount > 0) {
    revalidatePath("/admindashboard");
  }

  return data;
}

export async function deleteProductFitServer(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL_ALL}delete-productAttribute/productFit/${id}`,
    {
      method: "DELETE",
    }
  );

  if (!res.ok) throw new Error("Failed to delete category");

  const data = await res.json();

  if (data.modifiedCount > 0) {
    revalidatePath("/admindashboard");
  }

  return data;
}

export async function deleteSizeServer(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL_ALL}delete-productAttribute/productSize/${id}`,
    {
      method: "DELETE",
    }
  );

  if (!res.ok) throw new Error("Failed to delete category");

  const data = await res.json();

  if (data.modifiedCount > 0) {
    revalidatePath("/admindashboard");
  }

  return data;
}

export async function deleteSustainabilityServer(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL_ALL}delete-productAttribute/sustainability/${id}`,
    {
      method: "DELETE",
    }
  );

  if (!res.ok) throw new Error("Failed to delete category");

  const data = await res.json();

  if (data.modifiedCount > 0) {
    revalidatePath("/admindashboard");
  }

  return data;
}

export async function deleteBrandServer(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL_ALL}delete-productAttribute/brand/${id}`,
    {
      method: "DELETE",
    }
  );

  if (!res.ok) throw new Error("Failed to delete category");

  const data = await res.json();

  if (data.modifiedCount > 0) {
    revalidatePath("/admindashboard");
  }

  return data;
}