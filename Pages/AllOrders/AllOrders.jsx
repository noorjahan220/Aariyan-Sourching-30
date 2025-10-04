"use client";

import { useState, useEffect, useMemo } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { EyeIcon, TrashIcon } from "@heroicons/react/24/outline";
import LoadingSpinner from "../../components/LoadingSpinner";
import toast from "react-hot-toast";
import { FaExclamationTriangle } from "react-icons/fa";

const AllOrders = () => {
  const [backendOrders, setBackendOrders] = useState([]);
  const [styleNumberOptions, setStyleNumberOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewOrder, setViewOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("all");

  const API_BASE_URL = "http://localhost:5000";
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const params = {};
        if (searchTerm) {
          params.search = searchTerm;
        }

        const { data } = await axiosSecure.get("/orders", { params });
        setBackendOrders(Array.isArray(data) ? data : []);

        if (
          !searchTerm &&
          styleNumberOptions.length === 0 &&
          Array.isArray(data)
        ) {
          const uniqueStyles = [
            ...new Set(data.map((order) => order.styleNumber)),
          ];
          setStyleNumberOptions(uniqueStyles);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
        setBackendOrders([]);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(() => {
      fetchOrders();
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm, axiosSecure, styleNumberOptions.length]); 

  const handleDeleteOrder = async (orderId) => {
    try {
      const { data } = await axiosSecure.delete(`/orders/${orderId}`);
      if (data.success) {
        setBackendOrders((prevOrders) =>
          prevOrders.filter((order) => order._id !== orderId)
        );
        toast.success("Order deleted successfully!");
      } else {
        toast.error(`Failed to delete order: ${data.error}`);
      }
    } catch (error) {
      console.error("An error occurred while deleting the order:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  const showDeleteConfirmation = (orderId, styleNumber) => {
    toast((t) => (
      <div className="flex flex-col items-center gap-4 p-4 bg-white shadow-lg rounded-md">
        <div className="flex items-center gap-3">
          <FaExclamationTriangle className="text-yellow-500 h-8 w-8 flex-shrink-0" />
          <div className="text-left">
            <p className="font-semibold text-gray-800">
              Delete Order ({styleNumber})?
            </p>
            <p className="text-sm text-gray-600">
              This action cannot be undone.
            </p>
          </div>
        </div>
        <div className="w-full flex justify-end gap-3">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-4 py-1.5 text-sm font-semibold text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              toast.dismiss(t.id);
              handleDeleteOrder(orderId);
            }}
            className="px-4 py-1.5 text-sm font-semibold text-white bg-red-600 rounded-md hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    ));
  };

  const filteredOrders = useMemo(() => {
    if (selectedStyle === "all") {
      return backendOrders;
    }
    return backendOrders.filter((order) => order.styleNumber === selectedStyle);
  }, [backendOrders, selectedStyle]);

  const renderSizes = (sizes) => {
    if (!sizes) return "N/A";
    const sizeEntries = Object.entries(sizes)
      .filter(([, quantity]) => parseInt(quantity) > 0)
      .map(([size, quantity]) => `${size}: ${quantity}`);
    return sizeEntries.length > 0
      ? sizeEntries.join(", ")
      : "No sizes specified";
  };

  return (
    <div className="max-w-6xl my-7">
      <div>
    

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by name..."
            className="flex-grow p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={selectedStyle}
            onChange={(e) => setSelectedStyle(e.target.value)}
          >
            <option value="all">All Categories (Style No.)</option>

            {styleNumberOptions.map((style) => (
              <option key={style} value={style}>
                {style}
              </option>
            ))}
          </select>
        </div>

        {loading ? (
          <LoadingSpinner></LoadingSpinner>
        ) : (
          <div className="space-y-4">
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <div
                  key={order._id}
                  className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-lg shadow-sm"
                >
                  <div className="flex flex-1 flex-col sm:flex-row sm:items-center justify-between gap-4 min-w-0">
                    <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                      <img
                        src={order.primaryImage}
                        alt={order.styleNumber}
                        className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-md flex-shrink-0"
                      />
                      <div className="min-w-0">
                        <h3 className="font-semibold text-gray-800 truncate">
                          {order.name} ({order.styleNumber})
                        </h3>
                        <p className="text-sm text-gray-500 truncate">
                          {order.message}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-4 text-gray-500 flex-shrink-0 sm:ml-4 self-end sm:self-auto">
                      <button
                        onClick={() => setViewOrder(order)}
                        className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
                        aria-label="View Details"
                      >
                        <EyeIcon className="h-6 w-6" />
                      </button>
                    
                      <button
                        onClick={() =>
                          showDeleteConfirmation(order._id, order.styleNumber)
                        }
                        className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                        aria-label="Delete Order"
                      >
                        <TrashIcon className="h-6 w-6" />
                      </button>
                    
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-10 px-4 bg-white border border-gray-200 rounded-lg">
                <p className="text-gray-500">
                  No orders match your search criteria.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      
      {viewOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity duration-300 p-4">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl transform transition-all duration-300 overflow-y-auto h-[90vh] relative border border-gray-100">
            <button
              onClick={() => setViewOrder(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-gray-500 hover:text-red-500 hover:bg-red-50 transition-colors z-10"
              aria-label="Close"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="p-6 md:p-8 space-y-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 leading-snug">
                Order Details: {viewOrder.styleNumber}
              </h2>

              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="w-full h-64 rounded-lg overflow-hidden ring-1 ring-gray-200/50">
                  <img
                    src={viewOrder.primaryImage}
                    alt="Primary"
                    className="w-full h-full object-cover"
                  />
                </div>
                {viewOrder.secondaryImage && (
                  <div className="w-full h-64 rounded-lg overflow-hidden ring-1 ring-gray-200/50">
                    <img
                      src={viewOrder.secondaryImage}
                      alt="Secondary"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>

  
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-sm border-t border-gray-200 pt-6">
                <div>
                  <span className="text-xs font-medium text-gray-500">
                    Name
                  </span>
                  <p className="text-gray-800 mt-1 break-words">
                    {viewOrder.name}
                  </p>
                </div>
                <div>
                  <span className="text-xs font-medium text-gray-500">
                    Email
                  </span>
                  <p className="text-gray-800 mt-1 break-words">
                    {viewOrder.email}
                  </p>
                </div>
                <div>
                  <span className="text-xs font-medium text-gray-500">
                    Phone
                  </span>
                  <p className="text-gray-800 mt-1 break-words">
                    {viewOrder.phone}
                  </p>
                </div>
                <div>
                  <span className="text-xs font-medium text-gray-500">
                    Company
                  </span>
                  <p className="text-gray-800 mt-1 break-words">
                    {viewOrder.company}
                  </p>
                </div>
                <div className="sm:col-span-2">
                  <span className="text-xs font-medium text-gray-500">
                    Address
                  </span>
                  <p className="text-gray-800 mt-1 break-words">
                    {viewOrder.address}
                  </p>
                </div>
                <div className="sm:col-span-2">
                  <span className="text-xs font-medium text-gray-500">
                    Website
                  </span>
                  <p className="text-gray-800 mt-1 break-words">
                    {viewOrder.website}
                  </p>
                </div>
                <div>
                  <span className="text-xs font-medium text-gray-500">
                    Delivery Time
                  </span>
                  <p className="text-gray-800 mt-1">
                    {new Date(viewOrder.deliveryTime).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <span className="text-xs font-medium text-gray-500">
                    Payment Methods
                  </span>
                  <p className="text-gray-800 mt-1">
                    {viewOrder.paymentMethods.join(", ")}
                  </p>
                </div>
              </div>


              <div className="space-y-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                  Message
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {viewOrder.message}
                </p>
              </div>


              <div className="space-y-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                  Size Breakdown
                </h3>
                <div className="text-sm space-y-2">
                  <p>
                    <strong className="font-medium text-gray-600">
                      Adult Sizes:
                    </strong>{" "}
                    {renderSizes(viewOrder.adultSizes)}
                  </p>
                  <p>
                    <strong className="font-medium text-gray-600">
                      Youth Sizes:
                    </strong>{" "}
                    {renderSizes(viewOrder.youthSizes)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllOrders;