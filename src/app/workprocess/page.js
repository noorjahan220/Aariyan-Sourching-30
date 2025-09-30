import React from 'react';
import WorkProcess from '../../../Pages/WorkProcess/WorkProcess';

export const metadata = {
  title: 'Aaryan Sourcing – Our Work Process',
  description: "Discover Aaryan Sourcing's step-by-step work process for apparel sourcing and manufacturing, from design to delivery, with a focus on quality and efficiency.",
  keywords: 'Work process, apparel sourcing, garment manufacturing, custom apparel production, Aaryan Sourcing, apparel production steps, manufacturing process, Quality Control, Apparel Manufacturing Process, Garment Production, Fabric Sourcing, On-Time Delivery',
    alternates: {
    canonical: "https://www.aaryansourcing.com/lookbook",
  },
};


const page = () => {
    return (
        <div>
            <WorkProcess></WorkProcess>
        </div>
    );
};

export default page;