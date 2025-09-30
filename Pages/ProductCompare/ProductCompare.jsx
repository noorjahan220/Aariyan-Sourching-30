'use client'
import React from 'react';
import { FaHome, FaTrash } from 'react-icons/fa';
import CommonBanner from '../../components/CommonBanner';


const ProductCompare = () => {
  const Products = [
    {
      id: 1,
      image: "https://i.ibb.co/ccxBNWnG/images-26.jpg",
      title: "Women floral dress",
      description: "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.",
      price: "$235.00",
      rating: 4.5,
      reviews: 212,
      size: "M",
      stock: "In Stock",
      colors: ["#4CAF50", "#E91E63"],
    },
    {
      id: 2,
      image: "https://i.ibb.co/Ndv7Y9k5/images-25.jpg",
      title: "Women denim jacket",
      description: "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.",
      price: "$249.00",
      rating: 4.0,
      reviews: 4,
      size: "XL",
      stock: "In Stock",
      colors: ["#607D8B", "#B0BEC5", "#90A4AE"],
    },
    {
      id: 3,
      image: "https://i.ibb.co/cXKVvKmw/images-24.jpg",
      title: "Women floral dress",
      description: "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.",
      price: "$299.00",
      rating: 4.5,
      reviews: 25,
      size: "L",
      stock: "Out of Stock",
      colors: ["#607D8B", "#B0BEC5", "#90A4AE"],
    },
  ];

  const features = ['Product', 'Description', 'Price', 'Size', 'Stock', 'Add to cart', 'Remove'];

  return (
    <div className='compare_section bg-white'>
       <CommonBanner title={'compare'} breadcrumb={'compare'}></CommonBanner>

      <div className="product_compared_list container mx-auto p-4 sm:p-8">
        {/* START: Responsive table wrapper */}
        <div className="overflow-x-auto max-w-6xl mx-auto">
          <table className="w-full border-collapse min-w-[800px]"> {/* Set a minimum width for the table */}
            <tbody>
              {features.map((feature, index) => (
                <tr key={index} className="border-b border-gray-300 ">
                  {/* First column: Feature name */}
                  <td className="border border-gray-300 p-4 w-48 font-semibold text-gray-700"> {/* Fixed width for the first column */}
                    {feature}
                  </td>

                  {/* Remaining columns: Product data */}
                  {Products.map((product) => (
                    <td key={product.id} className="border border-gray-300 p-4 text-center min-w-[220px]"> {/* Minimum width for each column */}
                      {(() => {
                        switch (feature) {
                          case 'Product':
                            return (
                              <div className="">
                                <img src={product.image} alt={product.title} className="w-full h-[300px] object-cover mb-4" />
                                <h3 className="font-semibold text-[#ffbb42] text-start">{product.title}</h3>
                              </div>
                            );
                          case 'Description':
                            return <p className="text-sm text-gray-600">{product.description}</p>;
                          case 'Price':
                            return <span className="font-medium text-lg">{product.price}</span>;
                          case 'Size':
                            return <span>{product.size}</span>;
                          case 'Stock':
                            return (
                              <span className={product.stock === "In Stock" ? "text-green-600" : "text-red-600"}>
                                {product.stock}
                              </span>
                            );
                          case 'Add to cart':
                            return (
                              <button className="bg-black text-white px-6 py-2  hover:bg-gray-800 transition-colors">
                                Add To Cart
                              </button>
                            );
                          case 'Remove':
                            return (
                              <button className="text-gray-500 hover:text-red-600">
                                <FaTrash size={20} />
                              </button>
                            );
                          default:
                            return null;
                        }
                      })()}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* END: Responsive table wrapper */}
      </div>
    </div>
  );
};

export default ProductCompare;