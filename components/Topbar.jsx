'use client'
import Link from 'next/link';
import React from 'react';

const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const Topbar = () => {
  return (
    <div className="bg-gray-800  text-gray-300">
      <div className="container max-w-6xl mx-auto px-4 h-9 flex justify-between items-center text-sm">
        <div className="flex items-center space-x-6">
          <div className="flex items-center">
            <PhoneIcon />
            <span>+8801713117849</span>
          </div>
          <div className="flex items-center">
            <MailIcon />
            <span>aaryansourcing@gmail.com </span>
          </div>
        </div>
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/about" className="hover:text-white transition-colors">ABOUT US</Link>
          <Link href="/blog" className="hover:text-white transition-colors">BLOG</Link>
          <Link href="/contact" className="hover:text-white transition-colors">CONTACT US</Link>
        </div>
      </div>
    </div>
  );
};

export default Topbar;