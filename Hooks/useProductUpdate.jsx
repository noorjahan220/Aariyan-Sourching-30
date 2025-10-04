import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";
import toast from "react-hot-toast";

const useProductUpdate = ({ productId, onClose, onProductUpdated, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const handleProductUpdate = async (data) => {
    if (!productId) {
      toast.error("Product ID is missing. Cannot update.");
      return;
    }

    try {
      const formData = new FormData();

      // 1. Append simple key-value pairs
      const simpleKeys = [
        "title", "productCode", "GSM_Code", "productCategory", "productSubCategory",
        "productStatus", "productSize", "fit", "brand", "price", "disCountPrice",
        "Sustainability", "shortDescription", "metaTitle", "metaDescription", 
        "metaKeywords", "mainImageAltText", "metaRobots", "openGraphTitle",
        "openGraphDescription", "twitterTitle", "twitterDescription", "facebookUrl",
        "twitterUrl", "instagramUrl", "linkedInUrl"
      ];

      simpleKeys.forEach(key => {
        if (data[key] !== undefined && data[key] !== null) {
          formData.append(key, data[key]);
        }
      });
      
      // 2. Append arrays/objects that need to be stringified
      if (data.colors) {
        formData.append("colors", JSON.stringify(data.colors));
      }
      if (data.richDescription) {
        formData.append("richDescription", JSON.stringify(data.richDescription));
      }
      if (data.printingEmbroidery) {
        formData.append("printingEmbroidery", JSON.stringify(data.printingEmbroidery));
      }
      if (data.textileCare) {
        formData.append("textileCare", JSON.stringify(data.textileCare));
      }
      if (data.genderSizing) {
        const formattedGenderSizing = data.genderSizing.map(item => ({
            gender: item.gender?.value || "",
            sizes: item.sizes?.map(s => s.value) || []
        }));
        formData.append("genderSizing", JSON.stringify(formattedGenderSizing));
      }
      
      // **** FIX: Sending variants data with the key 'availabelVarients' ****
      if (data.variants) {
        const formattedVariants = data.variants
          .map((v) => ({
            colorName: v.color?.label,
            colorCode: v.color?.colorCode,
            availableSize: v.sizes?.map(s => s.value) || [],
          }))
          .filter((v) => v.colorName); 
        
        formData.append("availabelVarients", JSON.stringify(formattedVariants));
      }

      // 4. Append user email ONCE
      formData.append("email", user?.email || "");

      // 5. Handle File Uploads (This part remains the same)
      if (data.mainImage?.[0]) {
        formData.append("mainImage", data.mainImage[0]);
      }
      // ... other file uploads ...
      if (data.sizeChartImage?.[0]) {
        formData.append("sizeChartImage", data.sizeChartImage[0]);
      }
      if (data.metaImage?.[0]) {
        formData.append("metaImage", data.metaImage[0]);
      }
      if (data.mainPdf?.[0]) {
        formData.append("mainPdf", data.mainPdf[0]);
      }
      if (data.galleryImages?.length > 0) {
        Array.from(data.galleryImages).forEach((file) => {
          formData.append("galleryImages", file);
        });
      }
      if (data.brandLogo?.length > 0) {
        Array.from(data.brandLogo).forEach((file) => {
          formData.append("brandLogo", file);
        });
      }

      const res = await axiosSecure.patch(`/update-product/${productId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data?.success) {
        toast.success("Product updated successfully!");
        onProductUpdated?.();
        onClose();
        refetch();
      } else {
        toast.error(res.data?.message || "Update failed.");
      }
    } catch (err) {
      console.error("Error while updating product:", err);
      toast.error(err.response?.data?.message || "An error occurred during the update.");
    }
  };

  return { handleProductUpdate };
};

export default useProductUpdate;