// components/LayoutWrapper.js

'use client'; // This is crucial to mark it as a Client Component

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';

// Define the paths where the layout should NOT be shown
const noLayoutPaths = ['/login', '/register','/admindashboard'];

const LayoutWrapper = ({ children }) => {
  const pathname = usePathname();



  // import { usePathname } from "next/navigation";
// const hideNavbarOn = ["/about", "/login"];
//   const hideNavbar = hideNavbarOn.includes(pathname);

// {!hideNavbar && <Navbar />}
// <main>{children}</main> 



  // Check if the current path is one of the no-layout paths
  const showLayout = !noLayoutPaths.includes(pathname);

  return (
    <>
      {showLayout && <Navbar />}
      {children}
      {showLayout && <Footer />}
    </>
  );
};

export default LayoutWrapper;