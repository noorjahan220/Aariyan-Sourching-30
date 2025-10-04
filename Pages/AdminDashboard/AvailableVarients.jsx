import React from "react";
import useAllProducts from "../../Hooks/useAllProducts";

const AvailableVarients = ({ productId }) => {
  const [allProducts] = useAllProducts();
  const myProductData = allProducts?.find((data) => data._id === productId);
  const availabelVarients = myProductData?.availabelVarients || [];

  return (
    <div className="">
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 text-left ">Color</th>
              <th className="py-2 px-4 text-left ">Color Name</th>
              <th className="py-2 px-4 text-left ">Available Sizes</th>
            </tr>
          </thead>
          <tbody>
            {availabelVarients.map((variant, index) => (
              <tr key={index} className="hover:bg-gray-50 transition">
                {/* Color Circle */}
                <td className="py-2 px-4 border-b border-gray-100">
                  <div
                    className="w-6 h-6 rounded-md border border-gray-300"
                    style={{ backgroundColor: variant.colorCode }}
                  ></div>
                </td>

                {/* Color Name */}
                <td className="py-2 px-4 border-b border-gray-100">
                  {variant.colorName}
                </td>

                {/* Sizes */}
                <td className="py-2 px-4 border-b border-gray-100">
                  {/* পরিবর্তন এখানে: join করার আগে map দিয়ে value বের করা হয়েছে */}
                  {variant.availableSize?.map((size) => size.value).join(", ")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AvailableVarients;