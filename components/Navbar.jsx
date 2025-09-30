// components/Navbar.js

"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Topbar from "./Topbar";

import useAuth from "../Hooks/useAuth";
import toast from "react-hot-toast";
import { useRouter, usePathname } from "next/navigation";
import LanguageSwitcher from "./LanguageSwitcher";
import useSingleUser from "../Hooks/useSingleUser";
import { FiLogOut } from "react-icons/fi";
import { MdDashboard } from "react-icons/md";
import useProductAttributesData from "../Hooks/useProductAttributesData";
import { useFilter } from "../Context/FilterContext";
import useAllProducts from "../Hooks/useAllProducts";
import LoadingSpinner from "./LoadingSpinner";

import menImg from "/public/collectoinMen.jpg";
import womenImg from "/public/collectionWomen.jpg";
import kidsImg from "/public/collectionKids.jpg";
import fullCollection from "/public/FullCollection.jpg";
import useWishList from "../Hooks/useWishList";
import MegaMenu from "./MegaMenu";
import Image from "next/image";
import navbarLogo from "../public/logo.png"
/* ---------- SVG ICONS ---------- */
const ChevronDownIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4 ml-1"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 9l-7 7-7-7"
    />
  </svg>
);
const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 text-gray-700"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);
const UserIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 text-gray-700"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
);
const HeartIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 text-gray-700"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z"
    />
  </svg>
);
const HamburgerIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 text-gray-700"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 6h16M4 12h16M4 18h16"
    />
  </svg>
);
const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6" // text color will be inherited
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
);

/* ---------- MEGA-MENU COMPONENT ---------- */


/* ---------- NAVBAR COMPONENT ---------- */
const Navbar = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(null);
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { user, logOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [wishlists] = useWishList();

  const { singleUser } = useSingleUser();
  const { productCategory, productSubCategory } = useProductAttributesData();
  const { setSelectedCategory, setSelectedSubCategory } = useFilter();
  const [allProducts, refetch, isLoading] = useAllProducts();
  const mywishlist = wishlists?.filter((w) => w.email === user?.email);

  /* ---------- BUILD NAVIGATION DATA ---------- */
  const navigationData = [
    { label: "HOME", href: "/" },
    {
      label: "COLLECTIONS",
      href: "/shop",
      megaMenuContent: {
        collectionLinks: {
          title: "Collection",
          links:
            productSubCategory?.slice(0, 10).map((sub) => ({
              label: sub?.value?.toUpperCase() || "",
              href: `/shop?subCategory=${encodeURIComponent(sub?.value)}`,
            })) || [],
        },
        productLineLinks: {
          title: "Product Line",
          links:
            productCategory?.slice(0, 10).map((cat) => ({
              label: cat?.value?.toUpperCase() || "",
              href: `/shop?category=${encodeURIComponent(cat?.value)}`,
            })) || [],
        },
        imageLinks: [
          {
            label: "Men",
            src: menImg,
            alt: "Model wearing men's collection",
            href: "/shop",
          },
          {
            label: "Children's",
            src: kidsImg,
            alt: "Model wearing children's collection",
            href: "/shop",
          },
          {
            label: "Women",
            src: womenImg,
            alt: "Model wearing women's collection",
            href: "/shop",
          },
          {
            label: "Unisex",
            src: fullCollection,
            alt: "Model wearing unisex collection",
            href: "/shop",
          },
        ],
      },
    },
    { label: "RESOURCES", href: "/resource" },
    { label: "COLORS", href: "/colors" },
  ];

  /* ---------- EFFECTS ---------- */
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) setIsSticky(true);
      else setIsSticky(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen || isSearchOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [isMenuOpen, isSearchOpen]);

  /* ---------- HANDLERS ---------- */
  const handleMobileDropdownToggle = (label) => {
    setMobileDropdownOpen(mobileDropdownOpen === label ? null : label);
  };

  const handleOpenSearch = () => {
    setIsMenuOpen(false);
    setIsSearchOpen(true);
  };

  const handleCloseSearch = () => {
    setIsSearchOpen(false);
    setSearchQuery(""); // Reset search query on close
  };

  const handleLogout = () => {
    toast(
      (t) => (
        <div className="flex flex-col space-y-2">
          <p>Are you sure you want to logout?</p>
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
            >
              No
            </button>
            <button
              onClick={() => {
                logOut();
                toast.dismiss(t.id);
                toast.success("You are logged out");
                router.push("/");
              }}
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Yes
            </button>
          </div>
        </div>
      ),
      { duration: Infinity }
    );
  };

  // Filter products based on search query
  const filteredProducts =
    searchQuery.length > 0
      ? (allProducts || []).filter((product) =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : []; // Show empty array initially to avoid showing all products

  /* ---------- RENDER ---------- */
  return (
    <>
      <Topbar />
      {isSticky && <div className="h-[84px]" />}

      <nav
        className={`w-full bg-white ${
          isSticky
            ? "fixed top-0 left-0 right-0 z-40 shadow-lg animate-slideDown"
            : "relative border-b border-gray-200"
        }`}
      >
        <div className="max-w-6xl md:px-2 px-4 mx-auto h-[84px] flex justify-between items-center">
          {/* Logo */}
          <div>
            <Link href="/">
            <Image alt="logo" src={navbarLogo} width={150} height={50} />
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
            {navigationData.map((item) => {
              const isActive =
                (item.href === "/" && pathname === "/") ||
                (item.href !== "/" && pathname.startsWith(item.href));

              return (
                <div key={item.label} className="group relative">
                  <Link
                    href={item.href}
                    className={`flex items-center transition-colors hover:text-yellow-600 ${
                      isActive
                        ? "text-yellow-600 font-semibold"
                        : "text-gray-700"
                    }`}
                  >
                    {item.label}
                    {(item.children || item.megaMenuContent) && (
                      <ChevronDownIcon />
                    )}
                  </Link>

                  {item.children && !item.megaMenuContent && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-white rounded-md shadow-lg p-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transform translate-y-4 transition-all duration-300 ease-in-out">
                      <div className="flex flex-col space-y-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            onClick={() => {
                              setIsMenuOpen(false);
                              child.onClick?.();
                            }}
                            className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-yellow-600 rounded-md"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {item.megaMenuContent && (
                    <MegaMenu content={item.megaMenuContent} />
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-5">
            <button
              onClick={handleOpenSearch}
              className="hidden md:block cursor-pointer"
              aria-label="Open search"
            >
              <SearchIcon />
            </button>

            {/* User Auth */}
            {user ? (
              <div className="relative inline-block z-30">
                <div
                  className="w-8 h-8 rounded-full overflow-hidden border border-gray-400 cursor-pointer"
                  onClick={() => setOpen(!open)}
                >
                  <img
                    src={
                      "https://i.ibb.co.com/Pz1C9TpN/Whats-App-Image-2025-09-19-at-16-11-33-cd52c182.jpg"
                    }
                    alt="User Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>

                {open && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-100 origin-top-right">
                    <ul className="py-2 text-sm text-gray-700">
                      {singleUser?.role === "admin" ||
                      singleUser?.role === "staff" ? (
                        <li>
                          <Link
                            href="/admindashboard"
                            className="flex items-center text-sm gap-3 px-4 py-2 hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-150"
                          >
                            <MdDashboard />
                            <span className="font-normal uppercase">
                              Admin Profile
                            </span>
                          </Link>
                        </li>
                      ) : (
                        <li>
                          <Link
                            href="/myaccount"
                            className="flex items-center text-sm gap-3 px-4 py-2 hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-150"
                          >
                            <MdDashboard />
                            <span className="font-normal uppercase">
                              My Profile
                            </span>
                          </Link>
                        </li>
                      )}

                      <div className="my-1 border-t border-gray-100"></div>

                      <li
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 cursor-pointer transition-colors duration-150"
                      >
                        <FiLogOut />
                        <span className="font-normal uppercase">Logout</span>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/login" className="hidden md:block">
                <UserIcon />
              </Link>
            )}

            <Link href="/wishList" className="relative hidden md:block">
              <HeartIcon />
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-yellow-500 text-white text-xs rounded-full flex items-center justify-center">
                {mywishlist?.length || 0}
              </span>
            </Link>

            <LanguageSwitcher />

            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(true)}
              aria-label="Open menu"
            >
              <HamburgerIcon />
            </button>
          </div>
        </div>
      </nav>

      {/* ---------- MOBILE MENU ---------- */}

      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 ease-in-out ${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMenuOpen(false)}
        aria-hidden={!isMenuOpen}
      >
        <div
          className={`fixed top-0 left-0 h-full w-4/5 max-w-sm bg-white shadow-xl transform transition-transform duration-300 ease-in-out flex flex-col ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-5 flex justify-between items-center flex-shrink-0 border-b border-gray-200">
            <div className="text-3xl font-bold text-gray-800">
              <Link href="/" onClick={() => setIsMenuOpen(false)}>
                Ayira
              </Link>
            </div>
            <button
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close menu"
            >
              <CloseIcon />
            </button>
          </div>

          {/* Nav */}
          <nav className="flex-1 overflow-y-auto p-5">
            <div className="flex flex-col space-y-4 text-lg font-medium text-gray-700">
              {navigationData.map((item) => (
                <div key={item.label}>
                  {item.children || item.megaMenuContent ? (
                    <div className="flex justify-between items-center w-full">
                      <Link
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="hover:text-yellow-600 transition-colors"
                      >
                        {item.label}
                      </Link>
                      <button
                        onClick={() => handleMobileDropdownToggle(item.label)}
                        className="p-2 -mr-2"
                        aria-label={`Toggle ${item.label} submenu`}
                      >
                        <span
                          className={`transform transition-transform duration-200 ${
                            mobileDropdownOpen === item.label
                              ? "rotate-180"
                              : ""
                          }`}
                        >
                          <ChevronDownIcon />
                        </span>
                      </button>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="hover:text-yellow-600 transition-colors"
                    >
                      {item.label}
                    </Link>
                  )}

                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      mobileDropdownOpen === item.label
                        ? "max-h-screen"
                        : "max-h-0"
                    }`}
                  >
                    <div className="pt-3 pl-4 flex flex-col space-y-3 border-l-2 border-gray-200">
                      {(
                        item.children ||
                        item.megaMenuContent?.collectionLinks.links
                      )?.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          onClick={() => setIsMenuOpen(false)}
                          className="text-base text-gray-600 hover:text-yellow-600"
                        >
                          {child.label}
                        </Link>
                      ))}
                      {item.megaMenuContent?.productLineLinks.links.map(
                        (child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            onClick={() => setIsMenuOpen(false)}
                            className="text-base text-gray-600 hover:text-yellow-600"
                          >
                            {child.label}
                          </Link>
                        )
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </nav>

          {/* Footer */}
          <div className="p-5 flex-shrink-0 border-t border-gray-200">
            <div className="flex flex-col space-y-5 text-gray-700">
              <button
                onClick={handleOpenSearch}
                className="flex items-center space-x-3 text-lg w-full text-left"
              >
                <SearchIcon />
                <span>Search</span>
              </button>
              <Link
                href="/login"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center space-x-3 text-lg"
              >
                <UserIcon />
                <span>Account</span>
              </Link>
              <Link
                href="/wishList"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center space-x-3 text-lg relative"
              >
                <HeartIcon />
                <span>Wishlist</span>
                <span className="ml-auto w-6 h-6 bg-yellow-500 text-white text-xs rounded-full flex items-center justify-center">
                  {mywishlist?.length || 0}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ---------- SEARCH OVERLAY (NEW DESIGN) ---------- */}
      <div
        className={`fixed inset-0 bg-black/80 z-[100] transform transition-transform duration-500 ease-in-out ${
          isSearchOpen ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={handleCloseSearch}
        aria-hidden={!isSearchOpen}
      >
        <button
          onClick={handleCloseSearch}
          className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors"
          aria-label="Close search"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
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

        <div
          className="h-full w-full flex flex-col items-center justify-center p-4"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="w-full max-w-2xl">
            {/* Search Input Form */}
            <form
              className="relative group mb-6"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="text"
                placeholder="Search Here..."
                className="w-full bg-transparent border-b-2 border-gray-500 focus:border-white text-3xl md:text-5xl text-white placeholder-gray-400 py-4 pr-12 focus:outline-none transition-colors"
                autoFocus={isSearchOpen}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="absolute right-0 top-1/2 -translate-y-1/2"
                aria-label="Submit search"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-gray-400 group-hover:text-white transition-colors"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </form>

            {/* Search Results */}
            <div className="overflow-y-auto max-h-[60vh] text-white">
              {isLoading && searchQuery.length > 0 && (
                <LoadingSpinner></LoadingSpinner>
              )}
              {!isLoading && (
                <ul className="divide-y divide-gray-700">
                  {filteredProducts.length > 0
                    ? filteredProducts.map((product) => (
                        <li key={product._id}>
                          <Link
                            href={`/shop?search=${encodeURIComponent(
                              product.title
                            )}`}
                            onClick={handleCloseSearch}
                            className="block p-3 hover:bg-gray-800 rounded-md transition-colors text-gray-300 hover:text-white"
                          >
                            {product.title}
                          </Link>
                        </li>
                      ))
                    : searchQuery.length > 0 && (
                        <p className="text-center text-gray-400 py-4">
                          No products found.
                        </p>
                      )}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;