"use client";
import React, { useState } from "react";
import { FaExclamationTriangle, FaSpinner, FaTrash } from "react-icons/fa";
import { SketchPicker } from "react-color";
import namer from "color-namer";

import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import Select from "react-select";
import useProductAttributesData from "../../Hooks/useProductAttributesData";
import {
  addCategoryServer,
  deleteColourServer,
} from "../../lib/categoryActions";

// 150+ common colors
const colourOptions = [
  { label: "AliceBlue", value: "#F0F8FF" },
  { label: "AntiqueWhite", value: "#FAEBD7" },
  { label: "Aqua", value: "#00FFFF" },
  { label: "Black", value: "#000000" },
  { label: "Blue", value: "#0000FF" },
  { label: "Brown", value: "#A52A2A" },
  { label: "Coral", value: "#FF7F50" },
  { label: "Crimson", value: "#DC143C" },
  { label: "Cyan", value: "#00FFFF" },
  { label: "Gold", value: "#FFD700" },
  { label: "Gray", value: "#808080" },
  { label: "Green", value: "#008000" },
  { label: "HotPink", value: "#FF69B4" },
  { label: "Indigo", value: "#4B0082" },
  { label: "Lime", value: "#00FF00" },
  { label: "Magenta", value: "#FF00FF" },
  { label: "Orange", value: "#FFA500" },
  { label: "Purple", value: "#800080" },
  { label: "Red", value: "#FF0000" },
  { label: "Yellow", value: "#FFFF00" },
];

const AddProductColour = () => {
  const [colourCode, setColourCode] = useState("#000000");
  const [colourName, setColourName] = useState("Black");
  const { productColour } = useProductAttributesData();

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  // const onSubmit = async () => {
  //   try {
  //     const formData = {
  //       key: "ProductColour",
  //       value: { colourName, colourCode },
  //     };

  //     const res = await axiosSecure.post("/post-productAttribute", formData);
  //     const result = res.data;

  //     if (result.acknowledged && result.modifiedCount > 0) {
  //       toast.success("New colour created successfully.", { duration: 2000 });
  //       router.refresh();
  //     } else {
  //       toast.error("Something went wrong!");
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     toast.error(
  //       error?.response?.data?.error || error.message || "Failed to add colour"
  //     );
  //   } finally {
  //     setTimeout(() => {
  //       setColourCode("#000000");
  //       setColourName("Black");
  //     }, 1500);
  //   }
  // };

  const onSubmit = async () => {
    const key = "ProductColour";
    const value = { colourName, colourCode };
    try {
      const result = await addCategoryServer(key, value);

      if (result.modifiedCount > 0) {
        toast.success("New category created successfully.", { duration: 2000 });
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to add category");
    } finally {
      reset();
    }
  };

  const handleDelete = (col) => {
    toast((t) => (
      <div className="flex flex-col items-center gap-4 p-4 bg-white shadow-lg rounded-md">
        <div className="flex items-center gap-3">
          <FaExclamationTriangle className="text-yellow-500 h-8 w-8 flex-shrink-0" />
          <div className="text-left">
            <p className="font-semibold text-gray-800">Delete </p>
            <p className="text-sm text-gray-600">
              This action cannot be undone.
            </p>
          </div>
        </div>
        <div className="w-full flex justify-end gap-3">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-4 py-1.5 text-sm font-semibold text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={async () => {
              try {
                await deleteColourServer(col.id);
                toast.success("Category deleted successfully.", {
                  duration: 2000,
                });
              } catch (error) {
                console.error(error);
                toast.error(error.message || "Delete failed");
              } finally {
                toast.dismiss(t.id);
              }
            }}
            className="px-4 py-1.5 text-sm font-semibold text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    ));
  };

  // Handle colour change
  const handleColorChange = (color) => {
    setColourCode(color.hex);
    const names = namer(color.hex);
    if (names?.ntc?.length > 0) {
      setColourName(names.ntc[0].name);
    }
  };

  // Handle dropdown select
  const handleColorSelect = (selected) => {
    if (selected) {
      setColourName(selected.label);
      setColourCode(selected.value);
    }
  };

  return (
    <main className="max-w-6xl my-7">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 p-6 border border-gray-200 rounded-lg"
      >
        {/* Searchable Dropdown */}
        <div className="mb-4">
          <Select
            options={colourOptions}
            onChange={handleColorSelect}
            placeholder="Search color by name..."
            isClearable
          />
        </div>

        {/* Picker + Preview */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-start gap-6">
          <SketchPicker
            color={colourCode}
            onChangeComplete={handleColorChange}
          />

          <div className="flex flex-col items-center gap-2">
            <div
              className=" w-[200px] h-[100px] lg:w-[250px] lg:h-[170px] bordern border-gray-100 rounded-md shadow-inner "
              style={{ backgroundColor: colourCode }}
            ></div>
            <span className="text-gray-600 text-sm">
              {colourName} ({colourCode})
            </span>
          </div>
        </div>

        {/* Submit Button */}
        <div className="w-[180px] flex items-center gap-4 pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center px-6 py-2 bg-yellow-400 text-gray-800 font-semibold rounded-md hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-75 disabled:opacity-70"
          >
            {isSubmitting ? (
              <>
                <FaSpinner className="animate-spin h-5 w-5 mr-2" />
                Submitting...
              </>
            ) : (
              "Add Colour"
            )}
          </button>
        </div>
      </form>

      {/* Display all colours */}
      <section className="mt-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          All Colours ({productColour?.length})
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {productColour.map((col, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-white shadow-md border border-gray-100 rounded-lg px-4 py-3 hover:shadow-lg transition"
            >
              <div className="flex items-center gap-2">
                <span
                  className="w-5 h-5 rounded-full "
                  style={{ backgroundColor: col.value.colourCode }}
                ></span>
                <span className="text-gray-800 font-semibold uppercase text-sm">
                  {col.value.colourName}
                </span>
              </div>
              <button
                onClick={() => handleDelete(col)}
                className="p-2 text-gray-500 rounded-full hover:bg-red-100 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition-colors duration-200"
              >
                <FaTrash className="" />
              </button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default AddProductColour;