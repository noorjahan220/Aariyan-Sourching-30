"use client";
import React from "react";
import { useFieldArray, Controller, useWatch } from "react-hook-form";
import Select from "react-select";
import { FaPlus, FaTrash } from "react-icons/fa";

const genderOptions = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
  { value: "Unisex", label: "Unisex" },
];

const GenderSizingForm = ({
  control,
  errors,
  sizeOptions,
  isEditMode = false, // CHANGE: Accept isEditMode prop
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "genderSizing",
  });

  const genderSizingValues = useWatch({
    control,
    name: "genderSizing",
  }) || []; // Fallback to empty array is good practice

  const selectedGenders = genderSizingValues.map(
    (item) => item.gender?.value
  );

  return (
    <div className="space-y-4">
      {fields.map((item, index) => {
        const availableGenderOptions = genderOptions.filter(
          (option) =>
            !selectedGenders.includes(option.value) ||
            option.value === genderSizingValues[index]?.gender?.value
        );

        return (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 border border-gray-300 rounded-md"
          >
            {/* Gender Selection */}
            <div className="w-full sm:w-1/3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gender
              </label>
              <Controller
                name={`genderSizing.${index}.gender`}
                control={control}
                // CHANGE: Conditional validation
                rules={{ required: !isEditMode && "Gender is required" }}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={availableGenderOptions}
                    placeholder="Select Gender"
                    isClearable
                  />
                )}
              />
              {errors.genderSizing?.[index]?.gender && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.genderSizing[index].gender.message}
                </p>
              )}
            </div>

            {/* Size Selection */}
            <div className="w-full sm:w-2/3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Available Sizes
              </label>
              <Controller
                name={`genderSizing.${index}.sizes`}
                control={control}
                // CHANGE: Conditional validation
                rules={{
                  required: !isEditMode && "At least one size is required",
                }}
                render={({ field }) => (
                  <Select
                    {...field}
                    isMulti
                    options={sizeOptions}
                    placeholder="Select sizes..."
                  />
                )}
              />
              {errors.genderSizing?.[index]?.sizes && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.genderSizing[index].sizes.message}
                </p>
              )}
            </div>

            {/* Delete Button */}
            <div className="mt-auto self-center sm:self-end pt-5 sm:pt-0">
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="p-2 text-red-600 hover:text-red-800 transition-colors"
                  aria-label="Remove gender sizing"
                >
                  <FaTrash />
                </button>
              )}
            </div>
          </div>
        );
      })}

      {/* Add New Row Button */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => append({ gender: null, sizes: [] })}
          disabled={fields.length >= genderOptions.length}
          className="flex items-center gap-2 px-4 py-2 text-sm text-white bg-[#ffbb42] font-semibold rounded-md shadow-sm hover:bg-amber-500 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          <FaPlus /> Add
        </button>
      </div>
    </div>
  );
};

export default GenderSizingForm;