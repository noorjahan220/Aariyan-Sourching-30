import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import toast from "react-hot-toast";

const useProductSubmit = (reset) => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const handleProductSubmit = async (data) => {
    try {
      const formData = new FormData();

      // Text fields
      formData.append("title", data.title);
      formData.append("productCode", data.productCode);
      formData.append("GSM_Code", data.GSM_Code);
      formData.append("productCategory", data.productCategory);
      formData.append("productSubCategory", data.productSubCategory);
     formData.append("productSize", data.productSize); 
      formData.append("colors", JSON.stringify(data.colors));
      formData.append("fit", data.fit);
      formData.append("Sustainability", data.Sustainability);
      formData.append("brand", data.brand);
      formData.append("price", Number(data.price));
      formData.append(
        "disCountPrice",
        data.disCountPrice ? Number(data.disCountPrice) : ""
      );
      formData.append("email", user?.email || "");
      
      // NEW: Short Description
      formData.append("shortDescription", data.shortDescription);



        // NEW: Social Media URLs (নতুন যোগ করা হয়েছে)
      formData.append("facebookUrl", data.facebookUrl);
      formData.append("twitterUrl", data.twitterUrl);
      formData.append("instagramUrl", data.instagramUrl);
      formData.append("linkedInUrl", data.linkedInUrl);


      // NEW: Formatted Gender & Sizing Data
      const formattedGenderSizing = data.genderSizing.map(item => ({
        gender: item.gender.value,
        sizes: item.sizes.map(s => s.value)
      }));
      formData.append("genderSizing", JSON.stringify(formattedGenderSizing));

      // Formatted Variants data
      const formattedVariants = data.variants.map((v) => ({
        colorName: v.color.label,
        colorCode: v.color.colorCode,
        availableSize: v.sizes || [],
      }));
      formData.append("availabelVarients", JSON.stringify(formattedVariants));

      // Meta fields
      formData.append("metaTitle", data.metaTitle);
      formData.append("metaDescription", data.metaDescription);
      // NEW: Main Image Alt Tag
      formData.append("mainImageAltText", data.mainImageAltText);
          formData.append("metaKeywords", data.metaKeywords);


           // NEW: Additional SEO fields (নতুন যোগ করা হয়েছে)
      formData.append("metaRobots", data.metaRobots);
      formData.append("openGraphTitle", data.openGraphTitle);
      formData.append("openGraphDescription", data.openGraphDescription);
      formData.append("twitterTitle", data.twitterTitle);
      formData.append("twitterDescription", data.twitterDescription);

      // Media files
      if (data.mainImage?.[0]) {
        formData.append("mainImage", data.mainImage[0]);
      }

            if (data.metaImage?.[0]) {
        formData.append("metaImage", data.metaImage[0]);
      }


      if (data.sizeChartImage?.[0]) {
        formData.append("sizeChartImage", data.sizeChartImage[0]);
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
      if (data.mainPdf?.[0]) {
        formData.append("mainPdf", data.mainPdf[0]);
      }

      // JSON stringified fields
      if (data.richDescription) {
        formData.append("description", JSON.stringify(data.richDescription));
      }
      if (data.printingEmbroidery) {
        formData.append(
          "printingEmbroidery",
          JSON.stringify(data.printingEmbroidery)
        );
      }
      if (data.textileCare) {
        formData.append("textileCare", JSON.stringify(data.textileCare));
      }

      // Send data to API
      const res = await axiosSecure.post("/post-products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data?.success) {
        toast.success("Product added successfully!", { duration: 2000 });
        reset(); // Reset form on success
      } else {
        console.warn("Something went wrong:", res.data);
        toast.error("Something went wrong");
      }
    } catch (err) {
      console.error("Error while adding product:", err);
      toast.error("Something went wrong");
    }
  };

  return { handleProductSubmit };
};

export default useProductSubmit;