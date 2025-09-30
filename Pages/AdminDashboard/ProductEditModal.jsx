"use client";
import React, { useEffect, useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import { FaSpinner } from "react-icons/fa";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";
import useProductAttributesData from "../../Hooks/useProductAttributesData";
import Select from "react-select";
import ProductDetailsDescription from "../../components/ProductDetailsDescription";
import PrintingEmbroidery from "../../components/PrintingEmbroidery";
import TextileCare from "../../components/TextileCare";
import ProductVariantsForm from "../../components/Blogs/ProductVariantsForm";

const ProductEditModal = ({
  isOpen,
  onClose,
  product,
  onProductUpdated,
  refetch,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { isSubmitting, errors },
  } = useForm();

  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const attribute = useProductAttributesData();

  const {
    productCategory = [],
    productSubCategory = [],
    productSize = [],
    productColour = [],
    productFit = [],
  } = attribute || {};

  useEffect(() => {
   
    if (product) {
      const parseJson = (jsonString) => {
        try {
          return JSON.parse(jsonString);
        } catch (e) {
          return null; 
        }
      };

      const transformedData = {
        ...product,
        colors: product.colors || [],
         variants: product.availabelVarients?.map((variant) => ({
          color: {
            label: variant.colorName,
            value: variant.colorName,
            colorCode: variant.colorCode,
          },
          sizes: variant.availableSize || [],
        })) || [{ color: null, sizes: [] }],
        richDescription: parseJson(product.description),
        printingEmbroidery: parseJson(product.printingEmbroidery),
        textileCare: parseJson(product.textileCare),
      };

      reset(transformedData);
    }
  }, [product, reset]); // <-- dependency array থেকে attribute পুরোপুরি বাদ দেওয়া হয়েছে

  const colorOptions = useMemo(
    () =>
      productColour.map(({ value }) => ({
        value: { name: value.colourName, code: value.colourCode },
        label: value.colourName,
      })),
    [productColour]
  );

  const colorOptionsForVariant = useMemo(
    () =>
      productColour.map(({ value }) => ({
        label: value.colourName,
        value: value.colourName,
        colorCode: value.colourCode,
      })),
    [productColour]
  );

  const sizeOptionsForSelect = useMemo(
    () =>
      productSize.map(({ value }) => ({
        label: value,
        value: value,
      })),
    [productSize]
  );

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      Object.keys(data).forEach((key) => {
        const value = data[key];
        if (value === null || value === undefined) return;

        if (
          ["mainImage", "galleryImages", "brandLogo", "mainPdfs"].includes(key)
        ) {
          return;
        }

        if (typeof value === "object" && !Array.isArray(value)) {
          formData.append(key, JSON.stringify(value));
        } else if (key === "colors") {
          formData.append(key, JSON.stringify(value));
        } else if (key === "variants") {
          const formattedVariants = value
            .map((v) => ({
              colorName: v.color?.label,
              colorCode: v.color?.colorCode,
              availableSize: v.sizes || [],
            }))
            .filter((v) => v.colorName);

          // বানানটি এখানে ঠিক করুন
          formData.append(
            "availableVariants",
            JSON.stringify(formattedVariants)
          );
        } else {
          formData.append(key, value);
        }
      });

      formData.append("email", user?.email || "");

      if (data.mainImage?.[0]) formData.append("mainImage", data.mainImage[0]);
      if (data.galleryImages?.length > 0)
        Array.from(data.galleryImages).forEach((file) =>
          formData.append("galleryImages", file)
        );
      if (data.brandLogo?.length > 0)
        Array.from(data.brandLogo).forEach((file) =>
          formData.append("brandLogo", file)
        );
      if (data.mainPdfs?.length > 0)
        Array.from(data.mainPdfs).forEach((file) =>
          formData.append("mainPdfs", file)
        );

      const res = await axiosSecure.patch(
        `/update-product/${product._id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

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
      toast.error("An error occurred during the update.");
    }
  };

  const inputStyle =
    "w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500";
  const labelStyle = "block text-sm font-medium text-gray-700 mb-2";
  const sectionHeaderStyle = "text-lg font-semibold text-gray-800 mb-4";
  const sectionContainerStyle = "p-6 border border-gray-200 rounded-lg";

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-start z-50 p-4 animate-fadeIn">
      <div className="bg-white w-full max-w-6xl rounded-lg shadow-xl p-6 transition-all duration-300 ease-out max-h-[95vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4 pb-3 border-b">
          <h2 className="text-2xl font-bold text-gray-800">Edit Product</h2>
          <button
            onClick={onClose}
            className="text-3xl leading-none text-gray-500 hover:text-gray-800"
          >
            &times;
          </button>
        </div>

        {!attribute ? (
          <div className="flex justify-center items-center py-20">
            <FaSpinner className="animate-spin h-8 w-8 text-yellow-500" />
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className={sectionContainerStyle}>
              <h2 className={sectionHeaderStyle}>1. Product Basic Info</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                <div>
                  <label htmlFor="title" className={labelStyle}>
                    Product Title
                  </label>
                  <input
                    id="title"
                    type="text"
                    {...register("title")}
                    className={inputStyle}
                  />
                </div>
                <div>
                  <label htmlFor="productCode" className={labelStyle}>
                    Product Code
                  </label>
                  <input
                    id="productCode"
                    type="text"
                    {...register("productCode")}
                    className={inputStyle}
                  />
                </div>
                <div>
                  <label htmlFor="GSM_Code" className={labelStyle}>
                    GSM Code
                  </label>
                  <input
                    id="GSM_Code"
                    type="text"
                    {...register("GSM_Code")}
                    className={inputStyle}
                  />
                </div>
                <div>
                  <label htmlFor="productCategory" className={labelStyle}>
                    Category
                  </label>
                  <select
                    id="productCategory"
                    {...register("productCategory")}
                    className={inputStyle}
                  >
                    <option value="">Select category</option>
                    {productCategory.map(({ id, value }) => (
                      <option key={id} value={value}>
                        {value}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="productSubcategory" className={labelStyle}>
                    Sub Category
                  </label>
                  <select
                    id="productSubcategory"
                    {...register("productSubCategory")}
                    className={inputStyle}
                  >
                    <option value="">Select Sub Category</option>
                    {productSubCategory.map(({ id, value }) => (
                      <option key={id} value={value}>
                        {value}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className={sectionContainerStyle}>
              <h2 className={sectionHeaderStyle}>2. Product Attributes</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                <div>
                  <label htmlFor="productSize" className={labelStyle}>
                    Size
                  </label>
                  <select
                    id="productSize"
                    {...register("productSize")}
                    className={inputStyle}
                  >
                    <option value="">Select Size</option>
                    {productSize.map(({ id, value }) => (
                      <option key={id} value={value}>
                        {value}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelStyle}>Select Colors (multiple)</label>
                  <Controller
                    name="colors"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        isMulti
                        options={colorOptions}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        value={colorOptions.filter((option) =>
                          field.value?.some(
                            (val) => val.code === option.value.code
                          )
                        )}
                        onChange={(selectedOptions) =>
                          field.onChange(
                            selectedOptions
                              ? selectedOptions.map((option) => option.value)
                              : []
                          )
                        }
                      />
                    )}
                  />
                </div>
                <div>
                  <label htmlFor="fit" className={labelStyle}>
                    Fit
                  </label>
                  <select id="fit" {...register("fit")} className={inputStyle}>
                    <option value="">Select Fit</option>
                    {productFit.map(({ id, value }) => (
                      <option key={id} value={value}>
                        {value}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="Gender" className={labelStyle}>
                    Gender
                  </label>
                  <select
                    id="Gender"
                    {...register("Gender")}
                    className={inputStyle}
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="unisex">Unisex</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="Sustainability" className={labelStyle}>
                    Sustainability
                  </label>
                  <select
                    id="Sustainability"
                    {...register("Sustainability")}
                    className={inputStyle}
                  >
                    <option value="">Select Sustainability</option>
                    <option value="eco-friendly">Eco-Friendly</option>
                    <option value="recycled">Recycled Materials</option>
                    <option value="standard">Standard</option>
                  </select>
                </div>
              </div>
            </div>

            <div className={sectionContainerStyle}>
              <h2 className={sectionHeaderStyle}>3. Pricing Info</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="price" className={labelStyle}>
                    Price ($)
                  </label>
                  <input
                    id="price"
                    type="number"
                    step="0.01"
                    {...register("price")}
                    className={inputStyle}
                  />
                </div>
                <div>
                  <label htmlFor="disCountPrice" className={labelStyle}>
                    Discount Price ($)
                  </label>
                  <input
                    id="disCountPrice"
                    type="number"
                    step="0.01"
                    {...register("disCountPrice")}
                    className={inputStyle}
                  />
                </div>
              </div>
            </div>

            <div className={sectionContainerStyle}>
              <h2 className={sectionHeaderStyle}>4. Media Uploads</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <label htmlFor="mainImage" className={labelStyle}>
                    New Main Image
                  </label>
                  <input
                    id="mainImage"
                    type="file"
                    accept="image/*"
                    {...register("mainImage")}
                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:font-semibold file:bg-yellow-100 file:text-yellow-700 hover:file:bg-yellow-200"
                  />
                </div>
                <div>
                  <label htmlFor="galleryImages" className={labelStyle}>
                    New Gallery Images
                  </label>
                  <input
                    id="galleryImages"
                    type="file"
                    accept="image/*"
                    multiple
                    {...register("galleryImages")}
                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
                  />
                </div>
                <div>
                  <label htmlFor="brandLogo" className={labelStyle}>
                    New Brand Logo
                  </label>
                  <input
                    id="brandLogo"
                    type="file"
                    accept="image/*"
                    multiple
                    {...register("brandLogo")}
                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:font-semibold file:bg-green-100 file:text-green-700 hover:file:bg-green-200"
                  />
                </div>
                <div>
                  <label htmlFor="mainPdfs" className={labelStyle}>
                    New Printing PDF
                  </label>
                  <input
                    id="mainPdfs"
                    type="file"
                    accept="application/pdf"
                    {...register("mainPdfs")}
                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:font-semibold file:bg-purple-100 file:text-purple-700 hover:file:bg-purple-200 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            <div className={sectionContainerStyle}>
              <h2 className={sectionHeaderStyle}>5. Variants Section</h2>
              <ProductVariantsForm
                control={control}
                errors={errors}
                colorOptions={colorOptionsForVariant}
                sizeOptions={sizeOptionsForSelect}
              />
            </div>

            <div className={sectionContainerStyle}>
              <h2 className={sectionHeaderStyle}>6. SEO Meta</h2>
              <div className="space-y-6">
                <div>
                  <label htmlFor="metaTitle" className={labelStyle}>
                    Meta Title
                  </label>
                  <input
                    id="metaTitle"
                    type="text"
                    {...register("metaTitle")}
                    className={inputStyle}
                  />
                </div>
                <div>
                  <label htmlFor="metaDescription" className={labelStyle}>
                    Meta Description
                  </label>
                  <textarea
                    id="metaDescription"
                    rows="3"
                    {...register("metaDescription")}
                    className={inputStyle}
                  ></textarea>
                </div>
              </div>
            </div>

            <div className={sectionContainerStyle}>
              <h2 className={sectionHeaderStyle}>
                7. Rich Product Description
              </h2>
              <ProductDetailsDescription
                name="richDescription"
                control={control}
              />
            </div>

            <div className={sectionContainerStyle}>
              <h2 className={sectionHeaderStyle}>8. Printing & Textile Care</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className={labelStyle}>Printing & Embroidery</label>
                  <PrintingEmbroidery
                    name="printingEmbroidery"
                    control={control}
                  />
                </div>
                <div className="space-y-2">
                  <label className={labelStyle}>Textile Care</label>
                  <TextileCare name="textileCare" control={control} />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300 font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-[180px] flex items-center justify-center px-6 py-2 bg-yellow-400 text-gray-800 font-semibold rounded-md hover:bg-yellow-500 disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <FaSpinner className="animate-spin h-5 w-5 mr-2" />{" "}
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ProductEditModal;
