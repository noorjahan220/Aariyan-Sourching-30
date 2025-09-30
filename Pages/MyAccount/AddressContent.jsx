'use client';
import React, { useState } from 'react';
import axios from "axios";


const FormField = ({ label, children, className = '' }) => (
  <div className={className}>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label}
    </label>
    {children}
  </div>
);


export default function AddressContent() {

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    companyName: '',
    country: '',
    street1: '',
    street2: '',
    city: '',
    postcode: '',
    phone: '',
    email: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://api.aaryansourcing.com/address', formData);
      console.log('Saved:', res.data);
      alert('Address saved successfully!');
    } catch (err) {
      console.error(err);
      alert('Error saving address');
    }
  };
  return (
    
   <>
 <h2 className="text-3xl font-bold text-gray-800 lg:mb-5">
        Address
      </h2>
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
      
      <div className="flex flex-col md:flex-row gap-6">
        <FormField label="First Name*" className="flex-1">
          <input
            type="text"
            className="w-full border border-gray-300 px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-gray-500"
          />
        </FormField>
        <FormField label="Last Name*" className="flex-1">
          <input
            type="text"
            className="w-full border border-gray-300 px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-gray-500"
          />
        </FormField>
      </div>

      <FormField label="Company name (optional)">
        <input
          type="text"
          className="w-full border border-gray-300 px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-gray-500"
        />
      </FormField>

      <FormField label="Country / Region*">
        <div className="relative">
          <select className="w-full border border-gray-300 px-3 py-2.5 appearance-none bg-white focus:outline-none focus:ring-1 focus:ring-gray-500 text-gray-500">
            <option>Select country</option>
            <option>United States</option>
            <option>Canada</option>
            <option>United Kingdom</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </FormField>

      <FormField label="Street Address*">
        <input
          type="text"
          placeholder="House no and street name"
          className="w-full border border-gray-300 px-3 py-2.5 text-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-500"
        />
        <input
          type="text"
          placeholder="Apartment, suite, unit etc. (optional)"
          className="w-full border border-gray-300 px-3 py-2.5 mt-4 text-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-500"
        />
      </FormField>

      <div className="flex flex-col md:flex-row gap-6">
        <FormField label="Town / City*" className="flex-1">
          <input
            type="text"
            className="w-full border border-gray-300 px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-gray-500"
          />
        </FormField>
        <FormField label="Postcode / Zip*" className="flex-1">
          <input
            type="text"
            className="w-full border border-gray-300 px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-gray-500"
          />
        </FormField>
      </div>

      <FormField label="Phone*">
        <input
          type="tel"
          className="w-full border border-gray-300 px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-gray-500"
        />
      </FormField>

      <FormField label="Email Address*">
        <input
          type="email"
          placeholder="demoname@gmail.com"
          className="w-full border border-gray-300 px-3 py-2.5 text-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-500"
        />
      </FormField>

      <div>
        <button type="submit" className="bg-gray-800 text-white font-semibold px-8 py-2.5 hover:bg-gray-700 transition-colors">
          Save address
        </button>
      </div>

    </form>
   </>
  );
}