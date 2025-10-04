// File: DownLoad.js

import Link from 'next/link';
import React from 'react';
import { FaDownload } from "react-icons/fa";

// Define your server URL, preferably from an environment variable
const SERVER_URL = "http://localhost:5000";

const DownLoad = ({ productId }) => {
    return (
        <div className='flex flex-col gap-3'>
            {/* product sheet download link */}
            <a
                // The href now points to our new, specific API route
                href={`${SERVER_URL}/download-product-sheet/${productId}`}
                // The download attribute tells the browser to download the file
                download
                className='w-[180px] bg-[#E4DFCC] px-3 py-2 rounded-sm capitalize flex flex-wrap items-center gap-2 hover:bg-[#d9d3bb] transition cursor-pointer'
            >
                <FaDownload />
                Product Sheet
            </a>

            {/* more downloads link (remains the same) */}
            <Link href={'/resource'} className='w-[180px] bg-[#E4DFCC] px-3 py-2 rounded-sm capitalize flex flex-wrap items-center gap-2 hover:bg-[#d9d3bb] transition'>
                <FaDownload />
                More Downloads
            </Link>
        </div>
    );
};

export default DownLoad;