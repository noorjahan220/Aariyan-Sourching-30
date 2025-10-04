"use client";
import React, { useEffect, useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import { FaSpinner } from "react-icons/fa";
import useProductAttributesData from "../../Hooks/useProductAttributesData";
import Select from "react-select";
import ProductDetailsDescription from "../../components/ProductDetailsDescription";
import PrintingEmbroidery from "../../components/PrintingEmbroidery";
import TextileCare from "../../components/TextileCare";
import ProductVariantsForm from "../../components/Blogs/ProductVariantsForm";
import GenderSizingForm from "../../components/GenderSizingForm";
import useProductUpdate from "../../Hooks/useProductUpdate";

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

  const attribute = useProductAttributesData();

  const { handleProductUpdate } = useProductUpdate({
    productId: product?._id,
    onClose,
    onProductUpdated,
    refetch,
  });

  const {
    productCategory = [],
    productSubCategory = [],
    productSize = [],
    productColour = [],
    productFit = [],
    productBrand = [],
    productSustainability = [],
  } = attribute || {};

  useEffect(() => {
    if (product) {
      // --- Transformation logic for complex fields ---

      // 1. Variants (from availabelVarients)
      const variantsData = product.availabelVarients || [];
      const transformedVariants =
        variantsData.length > 0
          ? variantsData.map((variant) => ({
              color: {
                label: variant.colorName,
                value: variant.colorName,
                colorCode: variant.colorCode,
              },
              // FIX: Filter out null/undefined sizes before mapping
              sizes:
                variant.availableSize
                  ?.filter((size) => size != null)
                  .map((size) => ({
                    label: size,
                    value: size,
                  })) || [],
            }))
          : [{ color: null, sizes: [] }]; // Ensure at least one empty row if no variants exist

      // 2. Gender Sizing
      const genderSizingData = product.genderSizing || [];
      const transformedGenderSizing =
        genderSizingData.length > 0
          ? genderSizingData.map((item) => ({
              gender: item.gender
                ? { value: item.gender, label: item.gender }
                : null,
              sizes: item.sizes
                ? item.sizes.map((size) => ({ value: size, label: size }))
                : [],
            }))
          : [{ gender: null, sizes: [] }]; // Ensure at least one empty row

      // --- Create the final data object for the form ---
      const transformedData = {
        // Spread all product fields first
        ...product,

        // Override with transformed or correctly named fields
        variants: transformedVariants,
        genderSizing: transformedGenderSizing,
        
        // Convert colors to the format expected by react-select
        colors: product.colors?.map(c => ({ name: c.name, code: c.code })) || [],

        // Handle Rich Text fields (map database name to form name)
 richDescription: product.description ? JSON.stringify(product.description) : "",
        printingEmbroidery: product.printingEmbroidery ? JSON.stringify(product.printingEmbroidery) : "",
        textileCare: product.textileCare ? JSON.stringify(product.textileCare) : "",

        // Handle name mismatches (e.g., 'Sustainability' in DB vs 'productSustainability' in form)
        productSustainability: product.Sustainability,
        
        // Handle nested name mismatches
        productSubcategory: product.productSubCategory,

        // Flatten nested social media object
        facebookUrl: product.socialMedia?.facebook || "",
        twitterUrl: product.socialMedia?.twitter || "",
        instagramUrl: product.socialMedia?.instagram || "",
        linkedInUrl: product.socialMedia?.linkedIn || "",
      };

      reset(transformedData);
    }
  }, [product, reset]);

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

  const inputStyle =
    "w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500";
  const labelStyle = "block text-sm font-medium text-gray-700 mb-2";
  const sectionHeaderStyle = "text-lg font-semibold text-gray-800 mb-4";
  const sectionContainerStyle =
    "p-6 border border-gray-200 rounded-lg bg-gray-50";

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-start z-50 p-4 animate-fadeIn">
      <div className="bg-white w-full max-w-6xl rounded-lg shadow-xl p-6 transition-all duration-300 ease-out max-h-[95vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4 pb-3 ">
          <h2 className="text-2xl font-bold text-gray-800">Edit Product</h2>
          <button
            onClick={onClose}
            className="text-3xl leading-none text-gray-500 hover:text-gray-800"
          >
            ×
          </button>
        </div>

        {!attribute ? (
          <div className="flex justify-center items-center py-20">
            <FaSpinner className="animate-spin h-8 w-8 text-yellow-500" />
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(handleProductUpdate)}
            className="space-y-8"
          >
            {/* Section 1: Basic Info */}
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
                    {...register("productSubcategory")}
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
                <div>
                  <label htmlFor="productStatus" className={labelStyle}>
                    Product Status
                  </label>
                  <select
                    id="productStatus"
                    {...register("productStatus")}
                    className={inputStyle}
                  >
                    <option value="">Select Product Status</option>
                    <option value="new_arrivals">New Arrivals</option>
                    <option value="featured">Featured</option>
                    <option value="trending">Trending</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Section 2: Attributes */}
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
                  <label className={labelStyle}>Select Colors</label>
                  <Controller
                    name="colors"
                    control={control}
                    render={({ field }) => (
                      <Select
                        isMulti
                        options={colorOptions}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        value={colorOptions.filter((option) =>
                          field.value?.some(
                            (val) => val.code === option.value.code
                          )
                        )}
                        onChange={(selected) =>
                          field.onChange(
                            selected ? selected.map((opt) => opt.value) : []
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
                  <label
                    htmlFor="productSustainability"
                    className={labelStyle}
                  >
                    Sustainability
                  </label>
                  <select
                    id="productSustainability"
                    {...register("productSustainability")}
                    className={inputStyle}
                  >
                    <option value="">Select Sustainability</option>
                    {productSustainability.map(({ id, value }) => (
                      <option key={id} value={value}>
                        {value}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="brand" className={labelStyle}>
                    Brand
                  </label>
                  <select
                    id="brand"
                    {...register("brand")}
                    className={inputStyle}
                  >
                    <option value="">Select Brand</option>
                    {productBrand.map(({ id, value }) => (
                      <option key={id} value={value}>
                        {value}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Section 3: Pricing */}
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

            {/* Section 4: Media Uploads */}
            <div className={sectionContainerStyle}>
              <h2 className={sectionHeaderStyle}>
                4. Media Uploads (replace existing)
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  <label htmlFor="sizeChartImage" className={labelStyle}>
                    New Size Chart
                  </label>
                  <input
                    id="sizeChartImage"
                    type="file"
                    accept="image/*"
                    {...register("sizeChartImage")}
                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:font-semibold file:bg-indigo-100 file:text-indigo-700 hover:file:bg-indigo-200"
                  />
                </div>
                <div>
                  <label htmlFor="mainPdf" className={labelStyle}>
                    New Printing PDF
                  </label>
                  <input
                    id="mainPdf"
                    type="file"
                    accept="application/pdf"
                    {...register("mainPdf")}
                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:font-semibold file:bg-purple-100 file:text-purple-700 hover:file:bg-purple-200"
                  />
                </div>
              </div>
            </div>

            {/* Section 5: Gender Sizing */}
            <div className={sectionContainerStyle}>
              <h2 className={sectionHeaderStyle}>5. Gender Specific Sizing</h2>
              <GenderSizingForm
                control={control}
                errors={errors}
                sizeOptions={sizeOptionsForSelect}
                isEditMode={true} // CHANGE: Pass prop to disable validation
              />
            </div>

            {/* Section 6: Variants */}
            <div className={sectionContainerStyle}>
              <h2 className={sectionHeaderStyle}>6. Variants Section</h2>
              <ProductVariantsForm
                control={control}
                errors={errors}
                colorOptions={colorOptionsForVariant}
                sizeOptions={sizeOptionsForSelect}
                isEditMode={true} // CHANGE: Pass prop to disable validation
              />
            </div>

            {/* Section 7: Short Description */}
            <div className={sectionContainerStyle}>
              <h2 className={sectionHeaderStyle}>7. Short Description</h2>
              <textarea
                id="shortDescription"
                rows="4"
                {...register("shortDescription")}
                className={inputStyle}
              ></textarea>
            </div>

            {/* Rich Text Editors */}
            <div className={sectionContainerStyle}>
              <h2 className={sectionHeaderStyle}>
                8. Rich Product Description
              </h2>
              <ProductDetailsDescription
                name="richDescription"
                control={control}
              />
            </div>
            <div className={sectionContainerStyle}>
              <h2 className={sectionHeaderStyle}>9. Printing & Embroidery</h2>
              <PrintingEmbroidery name="printingEmbroidery" control={control} />
            </div>
            <div className={sectionContainerStyle}>
              <h2 className={sectionHeaderStyle}>10. Textile Care</h2>
              <TextileCare name="textileCare" control={control} />
            </div>

            {/* Section 11: SEO */}
            <div className={sectionContainerStyle}>
              <h2 className={sectionHeaderStyle}>11. SEO META DETAILS</h2>
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
                    <label htmlFor="mainImageAltText" className={labelStyle}>
                      Main Image Alt Text
                    </label>
                    <input
                      id="mainImageAltText"
                      type="text"
                      {...register("mainImageAltText")}
                      className={inputStyle}
                    />
                  </div>
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
                <div>
                  <label htmlFor="metaKeywords" className={labelStyle}>
                    Meta Keywords
                  </label>
                  <input
                    id="metaKeywords"
                    type="text"
                    {...register("metaKeywords")}
                    className={inputStyle}
                  />
                </div>
                <div>
                  <label htmlFor="metaRobots" className={labelStyle}>
                    Meta Robots
                  </label>
                  <div className="flex gap-6 mt-2">
                    {["index", "noindex", "follow", "nofollow"].map(
                      (option) => (
                        <label key={option} className="flex items-center gap-2">
                          <input
                            type="radio"
                            value={option}
                            {...register("metaRobots")}
                          />
                          <span className="capitalize">{option}</span>
                        </label>
                      )
                    )}
                  </div>
                </div>
                <div>
                  <label htmlFor="metaImage" className={labelStyle}>
                    Meta Image
                  </label>
                  <input
                    id="metaImage"
                    type="file"
                    accept="image/*"
                    {...register("metaImage")}
                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:font-semibold file:bg-yellow-100 file:text-yellow-700 hover:file:bg-yellow-200"
                  />
                </div>
                <div>
                  <label htmlFor="openGraphTitle" className={labelStyle}>
                    Open Graph Title
                  </label>
                  <input
                    id="openGraphTitle"
                    type="text"
                    {...register("openGraphTitle")}
                    className={inputStyle}
                  />
                </div>
                <div>
                  <label
                    htmlFor="openGraphDescription"
                    className={labelStyle}
                  >
                    Open Graph Description
                  </label>
                  <textarea
                    id="openGraphDescription"
                    rows="3"
                    {...register("openGraphDescription")}
                    className={inputStyle}
                  ></textarea>
                </div>
                <div>
                  <label htmlFor="twitterTitle" className={labelStyle}>
                    Twitter Title
                  </label>
                  <input
                    id="twitterTitle"
                    type="text"
                    {...register("twitterTitle")}
                    className={inputStyle}
                  />
                </div>
                <div>
                  <label htmlFor="twitterDescription" className={labelStyle}>
                    Twitter Description
                  </label>
                  <textarea
                    id="twitterDescription"
                    rows="3"
                    {...register("twitterDescription")}
                    className={inputStyle}
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Section 12: Social Media */}
            <div className={sectionContainerStyle}>
              <h2 className={sectionHeaderStyle}>12. Social Media URL</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="facebookUrl" className={labelStyle}>
                    Facebook
                  </label>
                  <input
                    id="facebookUrl"
                    type="text"
                    {...register("facebookUrl")}
                    className={inputStyle}
                  />
                </div>
                <div>
                  <label htmlFor="twitterUrl" className={labelStyle}>
                    Twitter
                  </label>
                  <input
                    id="twitterUrl"
                    type="text"
                    {...register("twitterUrl")}
                    className={inputStyle}
                  />
                </div>
                <div>
                  <label htmlFor="instagramUrl" className={labelStyle}>
                    Instagram
                  </label>
                  <input
                    id="instagramUrl"
                    type="text"
                    {...register("instagramUrl")}
                    className={inputStyle}
                  />
                </div>
                <div>
                  <label htmlFor="linkedInUrl" className={labelStyle}>
                    LinkedIn
                  </label>
                  <input
                    id="linkedInUrl"
                    type="text"
                    {...register("linkedInUrl")}
                    className={inputStyle}
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
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
                    <FaSpinner className="animate-spin h-5 w-5 mr-2" /> Saving...
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