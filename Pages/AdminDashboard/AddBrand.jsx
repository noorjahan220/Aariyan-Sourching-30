"use client";
import { useForm } from "react-hook-form";
import { FaExclamationTriangle, FaSpinner, FaTrash } from "react-icons/fa";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";
import useProductAttributesData from "../../Hooks/useProductAttributesData";
import { useRouter } from "next/navigation";

const AddBrand = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm();

  const axiosSecure = useAxiosSecure();
  const { productBrand } =
    useProductAttributesData();

      const router = useRouter()

  // Add Sub Category
  const onSubmit = async (data) => {
    try {
      const formData = {
        key: "brand",
        value: data.brand,
      };

      const res = await axiosSecure.post("/post-productAttribute", formData);
      const result = res.data;

      if (result.acknowledged == true && result.modifiedCount > 0) {
        toast.success("New sub category created successfully.", {
          duration: 2000,
        });
        router.refresh()
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error?.response?.data?.error || error.message || "Failed to add sub category"
      );
    } finally {
      reset();
    }
  };

const handleDelete = (brand) => {
  toast((t) => (
    // Using the enhanced UI design
    <div className="flex flex-col items-center gap-4 p-4 bg-white shadow-lg rounded-md">
      <div className="flex items-center gap-3">
        <FaExclamationTriangle className="text-yellow-500 h-8 w-8 flex-shrink-0" />
        <div className="text-left">
          <p className="font-semibold text-gray-800">Delete "{brand.value}"?</p>
          <p className="text-sm text-gray-600">This action cannot be undone.</p>
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
          // Using the async logic for sub-category deletion
          onClick={async () => {
            try {
              const res = await axiosSecure.delete(
                `/delete-productAttribute/brand/${brand.id}`
              );

              if (res.data.modifiedCount > 0) {
                toast.success("brand deleted successfully.", {
                  duration: 2000,
                });
               
              } else {
                toast.error("Failed to delete brand!");
              }
            } catch (error) {
              console.error(error);
              toast.error(
                error?.response?.data?.error ||
                  error.message ||
                  "Delete failed"
              );
            } finally {
              // Ensure the confirmation toast is always dismissed
              toast.dismiss(t.id);
            }
          }}
          className="px-4 py-1.5 text-sm font-semibold text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  ), {
    // The toast will disappear after 6 seconds if not acted upon
    duration: 6000,
  });
};
  const inputStyle =
    "w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500";
  const labelStyle = "block text-sm font-medium text-gray-700 mb-1";

  return (
    <main className="max-w-6xl ">
      <h1 className="text-2xl font-bold text-gray-800 lg:mb-5">
        Add Brand
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 p-6 border border-gray-200 rounded-lg"
      >
        {/* Input Field */}
        <div>
          <input
            id="brand"
            type="text"
            {...register("brand", {
              required: "Brand is required",
            })}
            className={inputStyle}
            placeholder="e.g. PVH,ZARA,TESCO"
          />
          {errors.brand && (
            <p className="text-red-500 text-xs mt-1">
              {errors.brand.message}
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="w-[200px] flex items-center gap-4 pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-[200px] flex items-center justify-center px-6 py-2 bg-yellow-400 text-gray-800 font-semibold rounded-md hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-75 disabled:opacity-70"
          >
            {isSubmitting ? (
              <>
                <FaSpinner className="animate-spin h-5 w-5 mr-2" />
                Submitting...
              </>
            ) : (
              "Add"
            )}
          </button>
        </div>
      </form>

      {/* Display all Sub Categories */}
      <section className="mt-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          All Brands ({productBrand?.length})
        </h2>

                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {productBrand.map((brand, index) => (
              <div
                key={index}
                className="flex flex-wrap justify-between items-center bg-white shadow-md border border-gray-100 rounded-lg px-4 py-3 hover:shadow-lg transition"
              >
                <span className="text-gray-800 font-semibold uppercase text-sm">
                  {brand.value}
                </span>
                <button
                  onClick={() => handleDelete(brand)}
                  className="p-2 text-gray-500 rounded-full hover:bg-red-100 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition-colors duration-200"
                >
                  <FaTrash className="text-lg" /> 
                </button>
              </div>
            ))}
          </div>
      </section>
    </main>
  );
};

export default AddBrand;