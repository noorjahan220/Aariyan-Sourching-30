import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaPhoneAlt,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const footerLogo = "/logo.png";
const appstoreURL = "https://i.ibb.co/nNpN7s6K/app-stor.webp";
const googlePlayURL = "https://i.ibb.co/JWG1wS9N/google-play.webp";
const paymentURL = "https://i.ibb.co/zVSbVxqC/payment.webp";

// Social Icons JSON Data with individual colors
const socialLinks = [
  { name: "Facebook", icon: FaFacebookF, link: "https://facebook.com", color: "#1877F2" },
  { name: "Twitter", icon: FaTwitter, link: "https://twitter.com", color: "#1DA1F2" },
  { name: "Instagram", icon: FaInstagram, link: "https://instagram.com", color: "#E1306C" },
  { name: "LinkedIn", icon: FaLinkedinIn, link: "https://linkedin.com", color: "#0A66C2" },
];

const Footer = () => {
  return (
    <footer className="w-full  bg-[#F6F6F6]">
      <div className="md:flex flex-wrap w-full max-w-6xl mx-auto px-4">
        <div className="w-full lg:w-[30%] py-10 sm:py-14 ">
          <Image className="bg-[#F6F6F6]" src={footerLogo} alt="App Store" width={150} height={50} />

          <h3 className="text-sm sm:text-base lg:text-[16px] font-semibold sub_title_color my-5 uppercase">
            QUESTION OR FEEDBACK?
          </h3>
          <div className="flex items-center gap-2 my-2">
            <FaPhoneAlt />
            <span className="text-sm sm:text-base font-medium mr-2">
              +018 900 6690
            </span>
          </div>
          <div className="flex items-center gap-2 my-2">
            <MdEmail />
            <span className="text-sm sm:text-base font-medium">
              support@ariya.com
            </span>
          </div>

          <div className="flex gap-2 mt-6 sm:mt-8">
            <Image
              src={appstoreURL}
              alt="App Store"
              width={120}
              height={50}
              className="cursor-pointer"
            />
            <Image
              src={googlePlayURL}
              alt="Google Play"
              width={120}
              height={50}
              className="cursor-pointer"
            />
          </div>
        </div>

        <div className="w-full lg:w-[70%] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-10 py-10 sm:py-14 ">
          <div>
            <div className="mb-6 sm:mb-10">
              <h3 className="text-xs sm:text-sm font-bold tracking-wide uppercase">
                Company
              </h3>
              <div className="mt-2 mb-4 relative">
                <div className="absolute top-0 w-full h-0.5 bg-gray-200"></div>
                <div className="absolute top-0 w-12 h-0.5 bg-yellow-400 rounded"></div>
              </div>
            </div>
            <ul className="text-xs sm:text-sm text-gray-600 space-y-2">
              <li>
                <Link href="/about" className="hover:text-black">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/profile" className="hover:text-black">
                  Profile
                </Link>
              </li>
              <li>
                <Link href="/workprocess" className="hover:text-black">
                  Work Process
                </Link>
              </li>
              <li>
                <Link href="/certificates" className="hover:text-black">
                  Certificate
                </Link>
              </li>
              <li>
                <Link href="/Sustainability" className="hover:text-black">
                  Sustainability
                </Link>
              </li>
            
            </ul>
          </div>
          <div>
            <div className="mb-6 sm:mb-10">
              <h3 className="text-xs sm:text-sm font-bold tracking-wide uppercase">
                Service
              </h3>
              <div className="mt-2 mb-4 relative">
                <div className="absolute top-0 w-full h-0.5 bg-gray-200"></div>
                <div className="absolute top-0 w-12 h-0.5 bg-yellow-400 rounded"></div>
              </div>
            </div>
            <ul className="text-xs sm:text-sm text-gray-600 space-y-2">
              <li>
                <Link href="/service" className="hover:text-black">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-black">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/order" className="hover:text-black">
                  Order Now
                </Link>
              </li>
              <li>
                <Link href="/Sizechart" className="hover:text-black">
                  Size Guide
                </Link>
              </li>
                <li>
                <Link href="/shop" className="hover:text-black">
                  Shop
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <div className="mb-6 sm:mb-10">
              <h3 className="text-xs sm:text-sm font-bold tracking-wide uppercase">
                MARKETING
              </h3>
              <div className="mt-2 mb-4 relative">
                <div className="absolute top-0 w-full h-0.5 bg-gray-200"></div>
                <div className="absolute top-0 w-12 h-0.5 bg-yellow-400 rounded"></div>
              </div>
            </div>
            <ul className="text-xs sm:text-sm text-gray-600 space-y-2">
              <li>
                <Link href="/resource" className="hover:text-black">
                  Resources
                </Link>
              </li>
              <li>
                <Link href="/lookbook" className="hover:text-black">
                  Lookbook
                </Link>
              </li>
              <li>
                <Link href="/colors" className="hover:text-black">
                  Color Card
                </Link>
              </li>
              <li>
                <Link href="/printingembroidery" className="hover:text-black">
                  Printing & Embroidery
                </Link>
              </li>
              <li>
                <Link href="/compliance" className="hover:text-black">
                  Compliance
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <div className="mb-6 sm:mb-10">
              <h3 className="text-xs sm:text-sm font-bold tracking-wide uppercase">
                Stay up-to-date
              </h3>
              <div className="mt-2 mb-4 relative">
                <div className="absolute top-0 w-full h-0.5 bg-gray-200"></div>
                <div className="absolute top-0 w-12 h-0.5 bg-yellow-400 rounded"></div>
              </div>
            </div>
            <ul className="text-xs sm:text-sm text-gray-600 space-y-2">
              <li>
                <Link href="/Cookie" className="hover:text-black">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="/codeofconduct" className="hover:text-black">
                  Code of Conduct
                </Link>
              </li>
              <li>
                <Link href="/Privecy" className="hover:text-black">
                  Privacy & Policy
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-black">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-black">
                  Blogs
                </Link>
              </li>
              <li></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-[#E4E4E4]">
        <div className=" w-full max-w-6xl mx-auto px-4 py-8 sm:py-10  flex flex-col sm:flex-row items-center justify-between">
          <p className="text-xs sm:text-sm md:text-base mb-4 md:mb-0">
            &copy; 2025 Ayira. All rights reserved.
          </p>

          {/* Social icons rendered from JSON (each with its own color) */}
          <div className="flex space-x-3 sm:space-x-4 mb-4 md:mb-0 text-sm sm:text-base">
            {socialLinks.map((s, idx) => {
              const Icon = s.icon;
              return (
                <a
                  key={idx}
                  href={s.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className="transition transform hover:scale-110"
                  style={{ color: s.color, display: "inline-flex", alignItems: "center" }}
                >
                  <Icon />
                </a>
              );
            })}
          </div>

          <div>
            <Image
              src={paymentURL}
              alt="Payment Methods"
              width={160}
              height={40}
              className="h-auto sm:w-[200px]"
            />
          </div>

          <div></div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;