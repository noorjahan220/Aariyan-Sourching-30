"use client";
import { useFieldArray, Controller } from "react-hook-form";
import Select from "react-select";
import { FaPlus, FaTrash } from "react-icons/fa";

const ProductVariantsForm = ({
  control,
  errors,
  colorOptions,
  sizeOptions,
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "variants",
  });

  const labelStyle = "block text-sm font-medium text-gray-700 mb-2";
  const errorMsgClass = "text-red-500 text-xs mt-1";

  return (
    <div className="pt-6 mt-3">
      <h2 className="block text-lg font-medium text-black mb-2">
        Product Variants
      </h2>
      {fields.map((field, index) => (
        <div
          key={field.id}
          className="mb-6 p-4 border border-gray-300 rounded-lg space-y-4 relative"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelStyle}>Variant {index + 1}: Color</label>
              <Controller
                name={`variants.${index}.color`}
                control={control}
                rules={{ required: "Color is required for a variant." }} // Added validation
                render={({ field }) => (
                  <Select
                    {...field}
                    options={colorOptions}
                    placeholder="Select Color"
                    className="basic-single"
                    classNamePrefix="select"
                  />
                )}
              />
              {errors.variants?.[index]?.color && (
                <p className={errorMsgClass}>
                  {errors.variants[index].color.message}
                </p>
              )}
            </div>

            <div>
              <label className={labelStyle}>Available Sizes</label>
              <Controller
                name={`variants.${index}.sizes`}
                control={control}
                rules={{ required: "At least one size is required." }} // Added validation
                render={({ field }) => (
                  <Select
                    {...field}
                    isMulti
                    options={sizeOptions}
                    placeholder="Select Sizes"
                    className="basic-multi-select"
                    classNamePrefix="select"
                    // field.value এখন একটি অ্যারে, তাই react-select-এর জন্য value ফরম্যাট ঠিক করতে হবে
                    value={sizeOptions.filter((option) =>
                      (field.value || []).includes(option.value)
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
              {errors.variants?.[index]?.sizes && (
                <p className={errorMsgClass}>
                  {errors.variants[index].sizes.message}
                </p>
              )}
            </div>
          </div>

          {/* --- মূল পরিবর্তন এখানেই --- */}
          {/* শুধুমাত্র প্রথম আইটেমের পর থেকে ডিলিট বাটন দেখা যাবে */}
          {index > 0 && (
            <button
              type="button"
              onClick={() => remove(index)}
              className="absolute top-2 right-2 p-2 text-red-600 hover:text-red-800 transition-colors"
              aria-label={`Remove Variant ${index + 1}`} // Accessibility improvement
            >
              <FaTrash />
            </button>
          )}
        </div>
      ))}

      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => append({ color: null, sizes: [] })}
          className=" flex items-center gap-2 px-4 py-2 bg-[#ffbb42] text-white font-semibold rounded-md  focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-75 cursor-pointer hover:bg-amber-500 transition-colors"
        >
          <FaPlus size={14} />
          Add
        </button>
      </div>
    </div>
  );
};

export default ProductVariantsForm;