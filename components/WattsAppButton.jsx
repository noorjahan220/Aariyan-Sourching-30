import Link from 'next/link';
import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const WattsAppButton = () => {
  return (
     <Link href={"https://wa.me/880 1713-117849?text=Hello%20I%20want%20to%20know%20more"}><div className="fixed bottom-20 right-5 z-50">
      {/* Active green dot */}
      <span className="absolute animate-bounce top-0 right-0 flex h-3 w-3">
        <span className="absolute inline-flex h-full w-full z-30 rounded-full bg-green-400"></span>
        <span className="relative inline-flex rounded-full z-30 h-3 w-3 bg-green-400"></span>
      </span>

      {/* WhatsApp icon with bounce animation */}
     <FaWhatsapp className="text-[#128C7E] text-4xl lg:text-5xl drop-shadow-lg" />
    
    </div>
    </Link>
  );
};

export default WattsAppButton;
