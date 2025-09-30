// pages/_app.js

// Import your global CSS
import "../src/app/globals.css";


import { Toaster } from 'react-hot-toast';
import AuthProvider from '../Context/AuthProvider';
import Provider from '../Context/Provider';
import QueryProvider from '../Context/QueryProvider';

// This component acts as the layout for EVERYTHING in the /pages directory
function MyApp({ Component, pageProps }) {
  return (
    <QueryProvider>
      <Provider>
        <AuthProvider>
          {/* This renders your actual page (e.g., AddProductForm) */}
          <Component {...pageProps} /> 
          <Toaster position="top-right" reverseOrder={false} />
        </AuthProvider>
      </Provider>
    </QueryProvider>
  );
}

export default MyApp;