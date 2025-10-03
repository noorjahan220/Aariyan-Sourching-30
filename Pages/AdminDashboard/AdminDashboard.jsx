"use client";

import React, { useState, useEffect, useCallback } from "react";
import useAuth from "../../Hooks/useAuth";
import useSingleUser from "../../Hooks/useSingleUser";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Link from "next/link";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

// --- Component Imports ---
import Staff from "../Staff/Staff";
import AddStaff from "../AddStaff/AddStaff";
import Users from "../Users/Users";
import LoadingSpinner from "../../components/LoadingSpinner";
import Analytics from "./Analytics";
import AllProducts from "../../components/AllProducts";
import AddProductForm from "./AddProductForm";
import AllOrders from "./../AllOrders/AllOrders";
import Transaction from "../Transactions/Transactions";
import PaymentGateway from "../PaymentGateway/PaymentGateway";
import Messages from "../Messages/Messages";
import AccountDetailsForm from "./AccountDetailsForm";
import AddCategory from "./AddCategory";
import AddSubCategory from "./AddSubCategory";
import AddProductColour from "./AddProductColour";
import AddProductFit from "./AddProductFit";
import AddSize from "./AddSize";
import AddProductReviews from "./AddProductReviews";
import HomePageManager from "./HomePageManager";
import SizeGuideManager from "./SizeGuideManager";
import AllBlogs from "./AllBlog/AllBlogs";
import BlogForm from "./BlogForm";
import BlogCategory from "./BlogCategory";
import AddBrand from "./AddBrand";
import Image from "next/image";

const logo = "/logo.png";
const sidebarLogo = "/logo1.png";

// --- Icon Components ---
const ChevronDownIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 20 20" fill="currentColor">
    <path
      fillRule="evenodd"
      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
      clipRule="evenodd"
    />
  </svg>
);
const DashboardIcon = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <rect x="3" y="3" width="7" height="7"></rect>
    <rect x="14" y="3" width="7" height="7"></rect>
    <rect x="14" y="14" width="7" height="7"></rect>
    <rect x="3" y="14" width="7" height="7"></rect>
  </svg>
);
const ProductsIcon = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <path d="M16 10a4 4 0 0 1-8 0"></path>
  </svg>
);
const ProductManagementIcon = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <path d="M12 20V10"></path>
    <path d="M18 20V4"></path>
    <path d="M6 20V16"></path>
  </svg>
);
const OrderIcon = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
  </svg>
);
const StaffUsersIcon = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
);
const BlogsIcon = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2h-1"></path>
    <path d="M16 2v20"></path>
    <path d="M11 7h-2.5a1.5 1.5 0 0 1 0-3h1a1.5 1.5 0 0 1 0 3Z"></path>
  </svg>
);
const CommunicationIcon = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
  </svg>
);
const TransactionsIcon = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <line x1="12" y1="1" x2="12" y2="23"></line>
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
  </svg>
);
const AccountSettingsIcon = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);
const AnalyticsIcon = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path>
    <line x1="12" y1="2" x2="12" y2="12"></line>
  </svg>
);
const HamburgerIcon = ({ className }) => (
  <svg
    className={className}
    stroke="currentColor"
    fill="none"
    strokeWidth="2"
    viewBox="0 0 24 24"
    strokeLinecap="round"
    strokeLinejoin="round"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
);
const CloseIcon = ({ className }) => (
  <svg
    className={className}
    stroke="currentColor"
    fill="none"
    strokeWidth="2"
    viewBox="0 0 24 24"
    strokeLinecap="round"
    strokeLinejoin="round"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);
const PageIcon = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
  </svg>
);
const ChevronLeftIcon = ({ className }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={3}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 19l-7-7 7-7"
    />
  </svg>
);
const ChevronRightIcon = ({ className }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={3}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);
const BellIcon = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
  </svg>
);
const UserIcon = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);
const SidebarLayoutIcon = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="9" y1="3" x2="9" y2="21"></line>
  </svg>
);

// --- Nav Items ---
const sidebarNavItems = [
  { name: "Dashboard", icon: DashboardIcon },
  {
    name: "Pages",
    icon: PageIcon,
    children: [{ name: "Home" }, { name: "Size Guide" }],
  },
  {
    name: "Products",
    icon: ProductsIcon,
    children: [{ name: "All Products" }, { name: "Add Product" }],
  },
  {
    name: "Product Management",
    icon: ProductManagementIcon,
    children: [
      { name: "Product Category" },
      { name: "Product Sub Category" },
      { name: "Product Color" },
      { name: "Product Fit" },
      { name: "Product Size " },
      { name: "Product Brand" },
      { name: "Product Reviews" },
    ],
  },
  { name: "Orders", icon: OrderIcon, children: [{ name: "All Orders" }] },
  {
    name: "Staff & Users",
    icon: StaffUsersIcon,
    children: [{ name: "Staff" }, { name: "Add Staff" }, { name: "Users" }],
  },
  {
    name: "Blogs",
    icon: BlogsIcon,
    children: [
      { name: "All Blogs" },
      { name: "Add Blogs" },
      { name: "Blog Category" },
    ],
  },
  {
    name: "Communication",
    icon: CommunicationIcon,
    children: [{ name: "Messages" }],
  },
  {
    name: "Payments",
    icon: TransactionsIcon,
    children: [{ name: "Transactions" }, { name: "Payment Gateway" }],
  },
  {
    name: "Analytics",
    icon: AnalyticsIcon,
    children: [{ name: "Google Analytics" }],
  },
  {
    name: "Account & Settings",
    icon: AccountSettingsIcon,
    children: [{ name: "My Account" }],
  },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [openDropdowns, setOpenDropdowns] = useState({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLgSidebarExpanded, setIsLgSidebarExpanded] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const [staffList, setStaffList] = useState([]);
  const [isStaffLoading, setIsStaffLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const [isBlogsLoading, setIsBlogsLoading] = useState(true);
  const [blogToEdit, setBlogToEdit] = useState(null);
  const [categories, setCategories] = useState([]);

  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { user, loading: authLoading } = useAuth();
  const { singleUser } = useSingleUser();

  const fetchBlogsAndCategories = useCallback(async () => {
    setIsBlogsLoading(true);
    try {
      const [blogsRes, categoriesRes] = await Promise.all([
        axiosSecure.get("/blogs"),
        axiosSecure.get("/categories"),
      ]);
      setBlogs(Array.isArray(blogsRes.data.blogs) ? blogsRes.data.blogs : []);
      setCategories(categoriesRes.data.map((cat) => cat.value || cat));
    } catch (error) {
      toast.error("Could not load blog data.");
      setBlogs([]);
    } finally {
      setIsBlogsLoading(false);
    }
  }, [axiosSecure]);

  const fetchStaff = useCallback(async () => {
    setIsStaffLoading(true);
    try {
      const response = await axiosSecure.get("/api/staff");
      setStaffList(response.data);
    } catch (error) {
      console.error("Error fetching staff:", error);
      toast.error("Could not load staff data.");
    } finally {
      setIsStaffLoading(false);
    }
  }, [axiosSecure]);

  useEffect(() => {
    fetchStaff();
    fetchBlogsAndCategories();
  }, [fetchStaff, fetchBlogsAndCategories]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.notification-dropdown') && !event.target.closest('.notification-button')) {
        setShowNotifications(false);
      }
      if (!event.target.closest('.profile-dropdown') && !event.target.closest('.profile-button')) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAddStaff = async (newStaffData) => {
    try {
      await axiosSecure.patch(`/api/users/${newStaffData.userId}/role`, {
        role: "staff",
        permissions: newStaffData.permissions,
      });
      fetchStaff();
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["promotableUsers"] });
      setActiveTab("Staff");
    } catch (error) {
      console.error("Promotion failed:", error);
      throw error;
    }
  };

  const handleDeleteStaff = (staffId, staffName) => {
    const demotePromise = axiosSecure.patch(`/api/users/${staffId}/role`, {
      role: "user",
      permissions: [],
    });

    toast.promise(demotePromise, {
      loading: `Demoting ${staffName}...`,
      success: () => {
        fetchStaff();
        queryClient.invalidateQueries({ queryKey: ["users"] });
        queryClient.invalidateQueries({ queryKey: ["promotableUsers"] });
        return `${staffName} demoted successfully.`;
      },
      error: "Failed to demote staff.",
    });
  };

  const handleFormSubmit = (submittedBlog, blogId) => {
    if (blogId) {
      setBlogs((prevBlogs) =>
        prevBlogs.map((b) => (b._id === blogId ? submittedBlog : b))
      );
    } else {
      setBlogs((prevBlogs) => [submittedBlog, ...prevBlogs]);
    }
    setActiveTab("All Blogs");
  };

  const handleEditBlog = (blog) => {
    setBlogToEdit(blog);
    setActiveTab("Add Blogs");
  };

  const handleCancelForm = () => {
    setBlogToEdit(null);
    setActiveTab("All Blogs");
  };

  const handleTabClick = (tabName) => {
    if (tabName === "Add Blogs") {
      setBlogToEdit(null);
    }
    setActiveTab(tabName);
    setIsSidebarOpen(false);
    setShowNotifications(false);
    setShowProfileMenu(false);
  };

  const handleMainMenuClick = (item) => {
    if (!isLgSidebarExpanded) {
      setIsLgSidebarExpanded(true);
    }

    if (item.children) {
      setOpenDropdowns((prev) => ({ ...prev, [item.name]: !prev[item.name] }));
    } else {
      handleTabClick(item.name);
    }
  };

  if (authLoading) return <LoadingSpinner />;
  const isSuperAdmin = singleUser && singleUser.role === "admin";
  if (!singleUser || (singleUser.role !== "staff" && !isSuperAdmin))
    return <LoadingSpinner />;
  const visibleNavItems = isSuperAdmin
    ? sidebarNavItems
    : sidebarNavItems.filter((item) =>
        singleUser.permissions.includes(item.name)
      );

  const renderContent = () => {
    if (
      isStaffLoading &&
      (activeTab === "Staff" || activeTab === "Add Staff")
    ) {
      return <LoadingSpinner />;
    }

    switch (activeTab) {
      case "Staff":
        return <Staff staff={staffList} onDeleteStaff={handleDeleteStaff} />;
      case "Users":
        return <Users />;
      case "Add Staff":
        return <AddStaff onAddStaff={handleAddStaff} />;
      case "Dashboard":
        return <Analytics />;
      case "Home":
        return <HomePageManager />;
      case "Size Guide":
        return <SizeGuideManager />;
      case "All Orders":
        return <AllOrders />;
      case "Transactions":
        return <Transaction />;
      case "Payment Gateway":
        return <PaymentGateway />;
      case "Messages":
        return <Messages />;
      case "All Blogs":
        return (
          <AllBlogs
            blogs={blogs}
            setBlogs={setBlogs}
            categories={categories}
            onEdit={handleEditBlog}
          />
        );
      case "Add Blogs":
        return (
          <BlogForm
            categories={categories}
            blogToEdit={blogToEdit}
            onFormSubmit={handleFormSubmit}
            onCancel={handleCancelForm}
          />
        );
      case "Blog Category":
        return (
          <BlogCategory categories={categories} setCategories={setCategories} />
        );
      case "All Products":
        return <AllProducts />;
      case "Add Product":
        return <AddProductForm />;
      case "Google Analytics":
        return <Analytics />;
      case "Product Category":
        return <AddCategory />;
      case "Product Sub Category":
        return <AddSubCategory />;
      case "Product Color":
        return <AddProductColour />;
      case "Product Fit":
        return <AddProductFit />;
      case "Product Size ":
        return <AddSize />;
      case "Product Brand":
        return <AddBrand />;
      case "Product Reviews":
        return <AddProductReviews />;
      case "My Account":
        return <AccountDetailsForm />;
      default:
        return <Analytics />;
    }
  };

  return (
    <div className="bg-white">
      <div className="mx-auto">
        <div className="relative flex flex-col lg:flex-row h-screen overflow-hidden">
          {isSidebarOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
              onClick={() => setIsSidebarOpen(false)}
            ></div>
          )}

          <aside
            className={`
              fixed inset-y-0 left-0 z-50 flex-shrink-0 pt-4 overflow-y-auto no-scrollbar
              bg-white border-r border-gray-200 
              transform transition-all duration-300 ease-in-out
              w-72 lg:w-20
              ${isLgSidebarExpanded && "lg:w-72"}
              ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
              lg:static lg:translate-x-0
            `}
          >
            {/* This button shows ONLY when sidebar is COLLAPSED on desktop */}
            {!isLgSidebarExpanded && (
              <div className="hidden lg:flex items-center justify-center h-[65px] border-b border-gray-200">
                <button
                  onClick={() => setIsLgSidebarExpanded(true)}
                  className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                >
                  <SidebarLayoutIcon className="w-6 h-6" />
                </button>
              </div>
            )}
  
            {/* This header shows ONLY when sidebar is EXPANDED on desktop, or on mobile */}
            {(isLgSidebarExpanded || isSidebarOpen) && (
              <div
                className={`
                  flex items-center justify-between border-b border-gray-200 h-[65px] transition-all duration-300 px-4
                `}
              >
                <div className="flex items-center gap-4">
                  <Link href="/">
                    <Image src={logo} alt="Ayria Logo" width={150} height={50} />
                  </Link>
                </div>
  
                {/* Mobile close button */}
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="lg:hidden p-1 text-gray-600 hover:text-gray-900"
                >
                  <CloseIcon className="w-6 h-6" />
                </button>

                {/* Desktop collapse button */}
                <button
                  onClick={() => setIsLgSidebarExpanded(false)}
                  className="hidden lg:block p-1 text-gray-600 hover:text-gray-900"
                >
                  <ChevronLeftIcon className="w-6 h-6" />
                </button>
              </div>
            )}
            
            <nav className="py-4">
              <ul>
                {/* Mobile-only: Profile Section */}
                <li className="lg:hidden px-4 mb-4">
                  {/* Profile Button */}
                  <button
                    onClick={() => setOpenDropdowns((prev) => ({ ...prev, 'Profile': !prev['Profile'] }))}
                    className={`w-full text-left rounded-lg p-3 my-1 flex items-center justify-between gap-4 transition-colors ${
                      openDropdowns['Profile'] ? "bg-gray-100" : "hover:bg-gray-100"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                        <UserIcon className="w-3 h-3 text-gray-600" />
                      </div>
                      <span className="text-gray-800 whitespace-nowrap">
                        {singleUser?.name || "Admin"}
                      </span>
                    </div>
                    <ChevronDownIcon
                      className={`w-5 h-5 text-gray-500 transition-all duration-300 ${
                        openDropdowns['Profile'] ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Profile Dropdown Content */}
                  {openDropdowns['Profile'] && (
                    <div className="pl-8 mt-2 space-y-1">
                      {/* User Info */}
                      <div className="px-3 py-2 bg-gray-50 rounded-md">
                        <p className="text-xs text-gray-500">{singleUser?.email || "admin@ayria.com"}</p>
                        <p className="text-xs text-gray-500 mt-1">Role: {singleUser?.role || "Admin"}</p>
                      </div>

                      {/* My Account */}
                      <button
                        onClick={() => handleTabClick("My Account")}
                        className={`w-full text-left py-2 px-3 rounded-md text-sm transition-colors ${
                          activeTab === "My Account"
                            ? "bg-gray-200 font-semibold text-gray-900"
                            : "text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        My Account
                      </button>

                      {/* Visit Store */}
                      <Link
                        href="/"
                        className="block w-full text-left py-2 px-3 rounded-md text-sm text-gray-700 hover:bg-gray-200 transition-colors"
                      >
                        Visit Store
                      </Link>

                      {/* Logout */}
                      <button className="w-full text-left py-2 px-3 rounded-md text-sm text-red-600 hover:bg-red-50 transition-colors">
                        Logout
                      </button>
                    </div>
                  )}
                </li>

                {visibleNavItems.map((item) => (
                  <li key={item.name} className="px-4">
                    <button
                      onClick={() => handleMainMenuClick(item)}
                      className={`w-full text-left rounded-lg p-3 my-1 flex items-center justify-between gap-4 transition-colors ${
                        activeTab === item.name && !item.children
                          ? "bg-gray-200 font-semibold"
                          : "hover:bg-gray-100"
                      } ${openDropdowns[item.name] ? "bg-gray-100" : ""}`}
                    >
                      <div className="flex items-center gap-4">
                        <item.icon className="w-5 h-5 text-gray-600 flex-shrink-0" />
                        <span
                          className={`text-gray-800 transition-opacity duration-200 whitespace-nowrap ${
                            !isLgSidebarExpanded &&
                            !isSidebarOpen &&
                            "lg:opacity-0 lg:hidden"
                          }`}
                        >
                          {item.name}
                        </span>
                      </div>
                      {item.children && (
                        <ChevronDownIcon
                          className={`w-5 h-5 text-gray-500 transition-all duration-300 ${
                            openDropdowns[item.name] ? "rotate-180" : ""
                          } ${
                            !isLgSidebarExpanded &&
                            !isSidebarOpen &&
                            "lg:opacity-0 lg:hidden"
                          }`}
                        />
                      )}
                    </button>
                    {item.children && openDropdowns[item.name] && (
                      <ul
                        className={`pl-8 transition-all duration-300 ease-in-out ${
                          !isLgSidebarExpanded && !isSidebarOpen && "lg:hidden"
                        }`}
                      >
                        {item.children.map((child) => (
                          <li key={child.name}>
                            <button
                              onClick={() => handleTabClick(child.name)}
                              className={`w-full text-left py-2 px-3 my-1 rounded-md text-sm flex items-center gap-4 transition-colors ${
                                activeTab === child.name
                                  ? "bg-gray-200 font-semibold text-gray-900"
                                  : "text-gray-700 hover:bg-gray-200"
                              }`}
                            >
                              {child.name}
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          <div
            className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ease-in-out 
              ${isLgSidebarExpanded ? "lg:ml-4" : "lg:ml-4"}
            `}
          >
            {/* Desktop Topbar */}
            <header className=" max-w-7xl hidden lg:flex items-center justify-between py-4 bg-white border-b border-gray-200">
              <div className="flex items-center gap-4">
                <h1 className="text-2xl font-bold text-gray-800">{activeTab}</h1>
              </div>
              
              <div className="flex items-center gap-4">
                {/* Notification Icon */}
                <div className="relative notification-dropdown">
                  <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="notification-button relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <BellIcon className="w-6 h-6" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
                  </button>
                  
                  {/* Notifications Dropdown */}
                  {showNotifications && (
                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                      <div className="p-4 border-b border-gray-200">
                        <h3 className="font-semibold text-gray-800">Notifications</h3>
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        <div className="p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100">
                          <p className="text-sm text-gray-800 font-medium">New order received</p>
                          <p className="text-xs text-gray-500 mt-1">5 minutes ago</p>
                        </div>
                        <div className="p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100">
                          <p className="text-sm text-gray-800 font-medium">Product stock low</p>
                          <p className="text-xs text-gray-500 mt-1">1 hour ago</p>
                        </div>
                        <div className="p-4 hover:bg-gray-50 cursor-pointer">
                          <p className="text-sm text-gray-800 font-medium">New user registered</p>
                          <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                        </div>
                      </div>
                      <div className="p-3 border-t border-gray-200 text-center">
                        <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                          View all notifications
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Profile Icon */}
                <div className="relative profile-dropdown">
                  <button
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="profile-button flex items-center gap-2 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                      <UserIcon className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-medium text-gray-800 hidden xl:block">
                      {singleUser?.name || "Admin"}
                    </span>
                  </button>

                  {/* Profile Dropdown */}
                  {showProfileMenu && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                      <div className="p-4 border-b border-gray-200">
                        <p className="text-sm font-semibold text-gray-800">{singleUser?.name || "Admin"}</p>
                        <p className="text-xs text-gray-500">{singleUser?.email || "admin@ayria.com"}</p>
                      </div>
                      <div className="py-2">
                        <button
                          onClick={() => handleTabClick("My Account")}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          My Account
                        </button>
                       
                      </div>
                      <div className="border-t border-gray-200 py-2">
                        <Link
                          href="/"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Visit Store
                        </Link>
                        
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </header>

            {/* Mobile Header */}
            <header className="flex lg:hidden items-center justify-between px-4 py-4 bg-white border-b border-gray-200">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 text-gray-600 hover:text-gray-900"
              >
                <HamburgerIcon className="w-6 h-6" />
              </button>
              <h1 className="text-xl font-bold text-gray-800">{activeTab}</h1>
              <div className="w-10"></div>
            </header>
            
            <main className="flex-1 px-4 overflow-y-auto no-scrollbar">
              {renderContent()}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}