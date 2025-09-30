"use client";
import React, { useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import { FaSpinner } from "react-icons/fa";
import useProductAttributesData from "../../Hooks/useProductAttributesData";
import Select from "react-select";
import useProductSubmit from "../../Hooks/useProductSubmit";
import GenderSizingForm from "../../components/GenderSizingForm";
import PrintingEmbroidery from "../../components/PrintingEmbroidery";
import TextileCare from "../../components/TextileCare";
import ProductVariantsForm from "../../components/Blogs/ProductVariantsForm";
import ProductDetailsDescription from "../../components/ProductDetailsDescription";

const AddProductForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    watch,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: {
      colors: [],
      variants: [{ color: null, sizes: [] }],
      productSize: "",
      genderSizing: [{ gender: null, sizes: [] }],
      richDescription: null,
      printingEmbroidery: null,
      textileCare: null,
      shortDescription: "",
      mainImageAltText: "",
      metaKeywords: "",
    },
  });

  const { handleProductSubmit } = useProductSubmit(reset);

  const attribute = useProductAttributesData();

  // FIX: Provide default empty arrays to prevent .map() on undefined
  const {
    productCategory = [],
    productSubCategory = [],
    productSize = [],
    productColour = [],
    productFit = [],
    productBrand = [],
    productSustainability = [],
  } = attribute || {};

  // Optional but recommended: Add a loading state for better UX
  if (!attribute) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FaSpinner className="animate-spin h-10 w-10 text-yellow-500" />
      </div>
    );
  }

  const colorOptionsForVariant = productColour.map(({ value }) => ({
    label: value.colourName,
    value: value.colourName,
    colorCode: value.colourCode,
  }));

  const sizeOptionsForSelect = productSize.map(({ value }) => ({
    label: value,
    value: value,
  }));

  const colorOptions = useMemo(
    () =>
      productColour.map(({ id, value }) => ({
        key: id,
        value: { name: value.colourName, code: value.colourCode },
        label: value.colourName,
      })),
    [productColour]
  );

  const selectedColorValues = watch("colors") || [];
  const selectValue = colorOptions.filter((option) =>
    selectedColorValues.some((selected) => selected.code === option.value.code)
  );

  const inputStyle =
    "w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500";
  const labelStyle = "block text-sm font-medium text-gray-700 mb-2";
  const errorMsgClass = "text-red-500 text-xs mt-1";
  const sectionHeaderStyle = "text-lg font-semibold text-gray-800 mb-4";
  const sectionContainerStyle =
    "p-6 border border-gray-200 rounded-lg bg-gray-50";

  return (
    <div className="w-full my-7 flex">
      <div className="w-full">
        <h1 className="text-2xl font-bold text-gray-800 lg:mb-5">
          Add New Product
        </h1>

        <form
          onSubmit={handleSubmit(handleProductSubmit)}
          className="space-y-8 "
        >
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
                  {...register("title", {
                    required: "Product title is required",
                  })}
                  className={inputStyle}
                  placeholder="e.g. Premium Cotton T-Shirt"
                />
                {errors.title && (
                  <p className={errorMsgClass}>{errors.title.message}</p>
                )}
              </div>
              <div>
                <label htmlFor="productCode" className={labelStyle}>
                  Product Code
                </label>
                <input
                  id="productCode"
                  type="text"
                  {...register("productCode", {
                    required: "Product Code is required",
                  })}
                  className={inputStyle}
                  placeholder="e.g. 12345"
                />
                {errors.productCode && (
                  <p className={errorMsgClass}>{errors.productCode.message}</p>
                )}
              </div>
              <div>
                <label htmlFor="GSM_Code" className={labelStyle}>
                  GSM Code
                </label>
                <input
                  id="GSM_Code"
                  type="text"
                  {...register("GSM_Code", {
                    required: "GSM Code is required",
                  })}
                  className={inputStyle}
                  placeholder="e.g. 180"
                />
                {errors.GSM_Code && (
                  <p className={errorMsgClass}>{errors.GSM_Code.message}</p>
                )}
              </div>
              <div>
                <label htmlFor="productCategory" className={labelStyle}>
                  Category
                </label>
                <select
                  id="productCategory"
                  {...register("productCategory", {
                    required: "Please select a category",
                  })}
                  className={inputStyle}
                >
                  <option value="">Select category</option>
                  {productCategory.map(({ id, value }) => (
                    <option key={id} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
                {errors.productCategory && (
                  <p className={errorMsgClass}>
                    {errors.productCategory.message}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="productSubcategory" className={labelStyle}>
                  Sub Category
                </label>
                <select
                  id="productSubcategory"
                  {...register("productSubCategory", {
                    required: "Please select a subcategory",
                  })}
                  className={inputStyle}
                >
                  <option value="">Select Sub Category</option>
                  {productSubCategory.map(({ id, value }) => (
                    <option key={id} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
                {errors.productSubCategory && (
                  <p className={errorMsgClass}>
                    {errors.productSubCategory.message}
                  </p>
                )}
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
                  {...register("productSize", {
                    required: "Please select product size",
                  })}
                  className={inputStyle}
                >
                  <option value="">Select Size</option>
                  {productSize.map(({ id, value }) => (
                    <option key={id} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
                {errors.productSize && (
                  <p className={errorMsgClass}>{errors.productSize.message}</p>
                )}
              </div>

              <div>
                <label className={labelStyle}>Select Colors (multiple)</label>
                <Controller
                  name="colors"
                  control={control}
                  rules={{
                    validate: (value) =>
                      value.length > 0 || "Please select at least one color",
                  }}
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
                {errors.colors && (
                  <p className={errorMsgClass}>{errors.colors.message}</p>
                )}
              </div>
              <div>
                <label htmlFor="fit" className={labelStyle}>
                  Fit
                </label>
                <select
                  id="fit"
                  {...register("fit", { required: "Please select fit" })}
                  className={inputStyle}
                >
                  <option value="">Select Fit</option>
                  {productFit.map(({ id, value }) => (
                    <option key={id} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
                {errors.fit && (
                  <p className={errorMsgClass}>{errors.fit.message}</p>
                )}
              </div>
              <div>
                <label htmlFor="productSustainability" className={labelStyle}>
                  Sustainability
                </label>
                <select
                  id="Sustainability"
                  {...register("Sustainability", {
                    required: "Please select Sustainability",
                  })}
                  className={inputStyle}
                >
                  <option value="">Select Sustainability</option>
                  {productSustainability.map(({ id, value }) => (
                    <option key={id} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
                {errors.Sustainability && (
                  <p className={errorMsgClass}>
                    {errors.Sustainability.message}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="productBrand" className={labelStyle}>
                  Brand
                </label>
                <select
                  id="Brand"
                  {...register("brand", { required: "Please select Brand" })}
                  className={inputStyle}
                >
                  <option value="">Select Brand</option>
                  {productBrand.map(({ id, value }) => (
                    <option key={id} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
                {errors.brand && (
                  <p className={errorMsgClass}>{errors.brand.message}</p>
                )}
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
                  {...register("price", {
                    required: "Price is required",
                    min: { value: 0, message: "Price cannot be negative" },
                  })}
                  className={inputStyle}
                  placeholder="e.g. 350"
                />
                {errors.price && (
                  <p className={errorMsgClass}>{errors.price.message}</p>
                )}
              </div>
              <div>
                <label htmlFor="disCountPrice" className={labelStyle}>
                  Discount Price ($)
                </label>
                <input
                  id="disCountPrice"
                  type="number"
                  step="0.01"
                  {...register("disCountPrice", {
                    min: { value: 0, message: "Discount cannot be negative" },
                  })}
                  className={inputStyle}
                  placeholder="e.g. 300"
                />
                {errors.disCountPrice && (
                  <p className={errorMsgClass}>
                    {errors.disCountPrice.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className={sectionContainerStyle}>
            <h2 className={sectionHeaderStyle}>4. Media Uploads</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label htmlFor="mainImage" className={labelStyle}>
                  Main Image
                </label>
                <input
                  id="mainImage"
                  type="file"
                  accept="image/*"
                  {...register("mainImage", {
                    required: "Main image is required",
                  })}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:font-semibold file:bg-yellow-100 file:text-yellow-700 hover:file:bg-yellow-200"
                />
                {errors.mainImage && (
                  <p className={errorMsgClass}>{errors.mainImage.message}</p>
                )}
              </div>
              <div>
                <label htmlFor="galleryImages" className={labelStyle}>
                  Gallery Images (multiple)
                </label>
                <input
                  id="galleryImages"
                  type="file"
                  accept="image/*"
                  multiple
                  {...register("galleryImages", {
                    required: "Gallery images are required",
                  })}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
                />
                {errors.galleryImages && (
                  <p className={errorMsgClass}>
                    {errors.galleryImages.message}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="brandLogo" className={labelStyle}>
                  Brand Logo (multiple)
                </label>
                <input
                  id="brandLogo"
                  type="file"
                  accept="image/*"
                  multiple
                  {...register("brandLogo", {
                    required: "Brand logo is required",
                  })}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:font-semibold file:bg-green-100 file:text-green-700 hover:file:bg-green-200"
                />
                {errors.brandLogo && (
                  <p className={errorMsgClass}>{errors.brandLogo.message}</p>
                )}
              </div>
              <div>
                <label htmlFor="sizeChartImage" className={labelStyle}>
                  Size Chart Image (single)
                </label>
                <input
                  id="sizeChartImage"
                  type="file"
                  accept="image/*"
                  {...register("sizeChartImage", {
                    required: "Size chart image is required",
                  })}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:font-semibold file:bg-indigo-100 file:text-indigo-700 hover:file:bg-indigo-200"
                />
                {errors.sizeChartImage && (
                  <p className={errorMsgClass}>
                    {errors.sizeChartImage.message}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="mainPdf" className={labelStyle}>
                  Printing & Embroidery PDF (single)
                </label>
                <input
                  id="mainPdf"
                  type="file"
                  accept="application/pdf"
                  {...register("mainPdf", { required: "PDF is required" })}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:font-semibold file:bg-purple-100 file:text-purple-700 hover:file:bg-purple-200 cursor-pointer"
                />
                {errors.mainPdf && (
                  <p className={errorMsgClass}>{errors.mainPdf.message}</p>
                )}
              </div>
            </div>
          </div>

          <div className={sectionContainerStyle}>
            <h2 className={sectionHeaderStyle}>5. Gender Specific Sizing</h2>
            <GenderSizingForm
              control={control}
              errors={errors}
              sizeOptions={sizeOptionsForSelect}
            />
          </div>

          <div className={sectionContainerStyle}>
            <h2 className={sectionHeaderStyle}>6. Variants Section</h2>
            <ProductVariantsForm
              control={control}
              errors={errors}
              colorOptions={colorOptionsForVariant}
              sizeOptions={sizeOptionsForSelect}
            />
          </div>

          <div className={sectionContainerStyle}>
            <h2 className={sectionHeaderStyle}>7. Short Description</h2>
            <div>
              <label htmlFor="shortDescription" className={labelStyle}>
                Short Description (Max 200 characters)
              </label>
              <textarea
                id="shortDescription"
                rows="4"
                {...register("shortDescription", {
                  required: "Short description is required",
                  maxLength: {
                    value: 200,
                    message: "Description cannot exceed 200 characters",
                  },
                })}
                className={inputStyle}
                placeholder="Enter a brief summary of the product..."
              ></textarea>
              {errors.shortDescription && (
                <p className={errorMsgClass}>
                  {errors.shortDescription.message}
                </p>
              )}
            </div>
          </div>

          <div className={sectionContainerStyle}>
            <h2 className={sectionHeaderStyle}>8. Rich Product Description</h2>
            <ProductDetailsDescription
              name="richDescription"
              control={control}
            />
          </div>

          <div className={sectionContainerStyle}>
            <h2 className={sectionHeaderStyle}>9. Printing & Embroidery</h2>

            <div className="space-y-2">
              <PrintingEmbroidery name="printingEmbroidery" control={control} />
              {errors.printingEmbroidery && (
                <p className={errorMsgClass}>
                  {errors.printingEmbroidery.message}
                </p>
              )}
            </div>
          </div>

          <div className={sectionContainerStyle}>
            <h2 className={sectionHeaderStyle}>10.Textile Care</h2>

            <div className="space-y-2">
              <TextileCare name="textileCare" control={control} />
              {errors.textileCare && (
                <p className={errorMsgClass}>{errors.textileCare.message}</p>
              )}
            </div>
          </div>

          <div className={sectionContainerStyle}>
            <h2 className={sectionHeaderStyle}>10. SEO META DETAILS</h2>
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="metaTitle" className={labelStyle}>
                    Meta Title
                  </label>
                  <input
                    id="metaTitle"
                    type="text"
                    {...register("metaTitle", {
                      required: "Meta title is required",
                    })}
                    className={inputStyle}
                    placeholder="SEO meta title..."
                  />
                  {errors.metaTitle && (
                    <p className={errorMsgClass}>{errors.metaTitle.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="mainImageAltText" className={labelStyle}>
                    Main Image Alt Text
                  </label>
                  <input
                    id="mainImageAltText"
                    type="text"
                    {...register("mainImageAltText", {
                      required: "Image Alt Tag is required",
                    })}
                    className={inputStyle}
                    placeholder="e.g. White cotton t-shirt for men"
                  />
                  {errors.mainImageAltText && (
                    <p className={errorMsgClass}>
                      {errors.mainImageAltText.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="metaDescription" className={labelStyle}>
                  Meta Description
                </label>
                <textarea
                  id="metaDescription"
                  rows="3"
                  {...register("metaDescription", {
                    required: "Meta description is required",
                  })}
                  className={inputStyle}
                  placeholder="Enter SEO meta description..."
                ></textarea>
                {errors.metaDescription && (
                  <p className={errorMsgClass}>
                    {errors.metaDescription.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="metaKeywords" className={labelStyle}>
                  Meta Keywords (comma-separated)
                </label>
                <input
                  id="metaKeywords"
                  type="text"
                  {...register("metaKeywords", {
                    required: "Meta keywords are required",
                  })}
                  className={inputStyle}
                  placeholder="e.g. t-shirt, cotton, premium apparel"
                />
                {errors.metaKeywords && (
                  <p className={errorMsgClass}>
                    {errors.metaKeywords.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="metaRobots" className={labelStyle}>
                  Meta Robots
                </label>

                <div className="flex gap-6 mt-2">
                  {["index", "noindex", "follow", "nofollow"].map((option) => (
                    <label key={option} className="flex items-center gap-2">
                      <input
                        type="radio"
                        value={option}
                        {...register("metaRobots", {
                          required: "Please select a Meta Robots option",
                        })}
                      />
                      <span className="capitalize">{option}</span>
                    </label>
                  ))}
                </div>

                {errors.metaRobots && (
                  <p className={errorMsgClass}>{errors.metaRobots.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="metaImage" className={labelStyle}>
                  Meta Image
                </label>
                <input
                  id="metaImage"
                  type="file"
                  accept="image/*"
                  {...register("metaImage", {
                    required: "Meta image is required",
                  })}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:font-semibold file:bg-yellow-100 file:text-yellow-700 hover:file:bg-yellow-200"
                />
                {errors.metaImage && (
                  <p className={errorMsgClass}>{errors.metaImage.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="openGraphTitle" className={labelStyle}>
                  Open Graph Title
                </label>
                <input
                  id="openGraphTitle"
                  type="text"
                  {...register("openGraphTitle", {
                    required: "Open Graph title is required",
                  })}
                  className={inputStyle}
                  placeholder="SEO meta title..."
                />
                {errors.openGraphTitle && (
                  <p className={errorMsgClass}>
                    {errors.openGraphTitle.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="openGraphDescription" className={labelStyle}>
                  Open Graph Description
                </label>
                <textarea
                  id="openGraphDescription"
                  rows="3"
                  {...register("openGraphDescription", {
                    required: "Open Graph description is required",
                  })}
                  className={inputStyle}
                  placeholder="Enter Open Graph   description..."
                ></textarea>
                {errors.openGraphDescription && (
                  <p className={errorMsgClass}>
                    {errors.openGraphDescription.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="twitterTitle" className={labelStyle}>
                  Twitter Title
                </label>
                <input
                  id="twitterTitle"
                  type="text"
                  {...register("twitterTitle", {
                    required: "Open Graph title is required",
                  })}
                  className={inputStyle}
                  placeholder="SEO meta title..."
                />
                {errors.twitterTitle && (
                  <p className={errorMsgClass}>{errors.twitterTitle.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="twitterDescription" className={labelStyle}>
                  Twitter Description
                </label>
                <textarea
                  id="twitterDescription"
                  rows="3"
                  {...register("twitterDescription", {
                    required: "Open Graph description is required",
                  })}
                  className={inputStyle}
                  placeholder="Enter Open Graph   description..."
                ></textarea>
                {errors.twitterDescription && (
                  <p className={errorMsgClass}>
                    {errors.twitterDescription.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className={sectionContainerStyle}>
            <h2 className={sectionHeaderStyle}>11. Social Meadia URL</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2  gap-6">
              <div>
                <label htmlFor="facebookUrl" className={labelStyle}>
                  Facebook
                </label>
                <input
                  id="facebookUrl"
                  type="text"
                  {...register("facebookUrl", {
                    required: "Facebook url is required",
                  })}
                  className={inputStyle}
                  placeholder="Facebook url"
                />
                {errors.facebookUrl && (
                  <p className={errorMsgClass}>{errors.facebookUrl.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="twitterUrl" className={labelStyle}>
                  Twitter
                </label>
                <input
                  id="twitterUrl"
                  type="text"
                  {...register("twitterUrl", {
                    required: "Twitter url is required",
                  })}
                  className={inputStyle}
                  placeholder="Twitter url"
                />
                {errors.twitterUrl && (
                  <p className={errorMsgClass}>{errors.twitterUrl.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="instagramUrl" className={labelStyle}>
                  Instragram
                </label>
                <input
                  id="instagramUrl"
                  type="text"
                  {...register("instagramUrl", {
                    required: "Instagram url  is required",
                  })}
                  className={inputStyle}
                  placeholder="Instagram url"
                />
                {errors.instagramUrl && (
                  <p className={errorMsgClass}>{errors.instagramUrl.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="linkedInUrl" className={labelStyle}>
                  LinkedIn
                </label>
                <input
                  id="linkedInUrl"
                  type="text"
                  {...register("linkedInUrl", {
                    required: "linkedIn  url is required",
                  })}
                  className={inputStyle}
                  placeholder="linkedIn url "
                />
                {errors.linkedInUrl && (
                  <p className={errorMsgClass}>{errors.linkedInUrl.message}</p>
                )}
              </div>
            </div>
          </div>

          <div className="w-[180px] flex items-center gap-4 pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center px-6 py-2 bg-yellow-400 text-gray-800 font-semibold rounded-md hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-75 disabled:opacity-70"
            >
              {isSubmitting ? (
                <>
                  <FaSpinner className="animate-spin h-5 w-5 mr-2" />{" "}
                  Submitting...
                </>
              ) : (
                "Add Product"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductForm;