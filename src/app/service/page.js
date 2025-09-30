import React from 'react';
import Service from '../../../Pages/Service/Service'; 

export const metadata = {
  title: "Aaryan Sourcing. – Apparel Services",
  description: "Explore the apparel sourcing services offered by Aaryan Sourcing, including custom apparel manufacturing, design development, and garment production for fashion brands.",
  keywords: [
    "Apparel services", "custom apparel manufacturing", "garment production", 
    "apparel design services", "Aaryan Sourcing", "custom clothing production", 
    "Apparel Sourcing", "Garment Manufacturing", "Custom Apparel Production", 
    "Sourcing Solutions", "Apparel Design & Development"
  ],
  internalLinks: [
    { text: "Learn more about our sourcing process", href: "/work-process" },
    { text: "Explore our sustainability practices in manufacturing", href: "/sustainability" },
    { text: "View our company profile to learn more about our services", href: "/company-profile" }
  ]
};

const ServicePage = () => {
    return (
        <div>
            <Service />
        </div>
    );
};

export default ServicePage;
