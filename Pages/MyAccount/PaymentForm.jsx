'use client';

import React, { useState } from 'react';

// --- SVG Icon Components for a Clean Structure ---

const CardBrandIcon = ({ brand }) => {
    const logos = {
        visa: <svg viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg" role="img" width="38" height="24" aria-labelledby="pi-visa"><title id="pi-visa">Visa</title><path opacity=".07" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"></path><path fill="#fff" d="M34 1.6c.6 0 1 .4 1 1v17.7c0 .6-.4 1-1 1H4c-.6 0-1-.4-1-1V2.6c0-.6.4-1 1-1h30z"></path><path fill="#1A1F71" d="M14.25 10.191c.563-2.527 2.227-3.957 4.133-3.957.962 0 1.63.435 2.112 1.023l.115.115-.898 3.224-.115-.115c-.287-.435-.9-.87-1.5-.87-.852 0-1.53.55-1.785 1.563-.228.934-.143 1.956.143 2.58.286.623.825.962 1.46.962.724 0 1.29-.323 1.52-.633l.562-2.14h-2.316V10.19H19.74c.057.345.085.69.085 1.05 0 2.28-1.5 3.92-3.562 3.92-2.227 0-3.528-1.5-3.714-3.755zm10.395 6.168h2.316L29.35 6.23h-2.4l-2.057 10.128zM9.82 6.23h-2.17l-1.5 8.13-.243-1.29c-.372-2.028-1.563-3.143-3.1-3.8l-.356-1.59h2.228c.314 0 .57.257.623.572l.485 2.513c.243.99.78 1.813 1.5 2.27.385.243.78.386 1.17.386.4 0 .74-.1 1.028-.286L9.82 6.23zm-6.248 0H1.4L.057 16.36h2.228l.2-1.028h1.563l.228 1.028h2.228L3.572 6.23zM3.975 13.01H2.4l.78-3.956.795 3.956z"></path></svg>,
        mastercard: <svg viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg" role="img" width="38" height="24" aria-labelledby="pi-mastercard"><title id="pi-mastercard">Mastercard</title><path opacity=".07" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"></path><path fill="#fff" d="M34 1.6c.6 0 1 .4 1 1v17.7c0 .6-.4 1-1 1H4c-.6 0-1-.4-1-1V2.6c0-.6.4-1 1-1h30z"></path><circle fill="#EB001B" cx="15" cy="12" r="7"></circle><circle fill="#F79E1B" cx="23" cy="12" r="7"></circle><path fill="#FF5F00" d="M22 12c0-3.87-3.13-7-7-7s-7 3.13-7 7 3.13 7 7 7 7-3.13 7-7z"></path></svg>,
        amex: <svg viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg" role="img" width="38" height="24" aria-labelledby="pi-american_express"><title id="pi-american_express">American Express</title><path opacity=".07" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"></path><path fill="#fff" d="M34 1.6c.6 0 1 .4 1 1v17.7c0 .6-.4 1-1 1H4c-.6 0-1-.4-1-1V2.6c0-.6.4-1 1-1h30z"></path><path fill="#006FCF" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"></path><path fill="#FFF" d="M14.46 14.85l1.63-2.6-1.57-2.52h2.2l.87 1.64.88-1.64h2.16l-1.57 2.52 1.6 2.6h-2.18l-.9-1.66-.91 1.66h-2.18zm10.04 0h-2.1l-1.22-1.57-.93 1.57h-2.18l2.2-3.6-2.12-3.52h2.18l.96 1.61.94-1.61h2.1l-2.12 3.52 2.2 3.6zM8.28 5.1h5.86v1.55H8.28V5.1zm0 3.8h5.86v1.55H8.28V8.9zm0 3.86h5.86v1.55H8.28v-1.55z"></path></svg>,
        discover: <svg viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg" role="img" width="38" height="24" aria-labelledby="pi-discover"><title id="pi-discover">Discover</title><path opacity=".07" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"></path><path fill="#fff" d="M34 1.6c.6 0 1 .4 1 1v17.7c0 .6-.4 1-1 1H4c-.6 0-1-.4-1-1V2.6c0-.6.4-1 1-1h30z"></path><path d="M11.33 12.3c0-3.2 2.5-5.7 6.1-5.7 3.5 0 5.8 2.5 5.8 5.7 0 3.2-2.3 5.7-6.1 5.7-3.6.1-5.8-2.4-5.8-5.7zm9.9.1c0-1.8-1.3-3.1-3.8-3.1-2.5 0-3.8 1.3-3.8 3.1 0 1.8 1.3 3.1 3.8 3.1 2.5 0 3.8-1.3 3.8-3.1zM35.13 6.6c0-.1-.1-.2-.2-.2h-2.5c-.1 0-.2.1-.2.2v.9c0 .1.1.2.2.2h2.5c.1 0 .2-.1.2-.2v-.9zm-3.8.1v.7c0 .1.1.2.2.2h2.5c.1 0 .2-.1.2-.2v-.7c0-.1-.1-.2-.2-.2h-2.5c-.1 0-.2.1-.2.2z" fill="#F68121"></path><path d="M11.33 12.3c0-3.2 2.5-5.7 6.1-5.7 3.5 0 5.8 2.5 5.8 5.7 0 3.2-2.3 5.7-6.1 5.7-3.6.1-5.8-2.4-5.8-5.7zm9.9.1c0-1.8-1.3-3.1-3.8-3.1-2.5 0-3.8 1.3-3.8 3.1 0 1.8 1.3 3.1 3.8 3.1 2.5 0 3.8-1.3 3.8-3.1zM28.13 9.4c0-.1-.1-.2-.2-.2h-2.5c-.1 0-.2.1-.2.2v.9c0 .1.1.2.2.2h2.5c.1 0 .2-.1.2-.2v-.9zm-3.8.1v.7c0 .1.1.2.2.2h2.5c.1 0 .2-.1.2-.2v-.7c0-.1-.1-.2-.2-.2h-2.5c-.1 0-.2.1-.2.2zm7.6-3v.7c0 .1.1.2.2.2h2.5c.1 0 .2-.1.2-.2v-.7c0-.1-.1-.2-.2-.2h-2.5c-.1 0-.2.1-.2.2zm-2.8 11.2c-.1 0-.2.1-.2.2v.7c0 .1.1.2.2.2h2.5c.1 0 .2-.1.2-.2v-.7c0-.1-.1-.2-.2-.2h-2.5zm-1.1-1.1v.7c0 .1.1.2.2.2h2.5c.1 0 .2-.1.2-.2v-.7c0-.1-.1-.2-.2-.2h-2.5c-.1 0-.2.1-.2.2zm4.1 1.2c0-.1-.1-.2-.2-.2h-2.5c-.1 0-.2.1-.2.2v.7c0 .1.1.2.2.2h2.5c.1 0 .2-.1.2-.2v-.7zM2.87 6.5H.27c-.1 0-.2.1-.2.2v.7c0 .1.1.2.2.2h2.6c.1 0 .2-.1.2-.2v-.7c0-.1-.1-.2-.2-.2z" fill="#231F20"></path></svg>,
        diners: <svg viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg" width="38" height="24" role="img" aria-labelledby="pi-diners_club"><title id="pi-diners_club">Diners Club</title><path opacity=".07" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"></path><path fill="#fff" d="M34 1.6c.6 0 1 .4 1 1v17.7c0 .6-.4 1-1 1H4c-.6 0-1-.4-1-1V2.6c0-.6.4-1 1-1h30z"></path><path d="M12 12a5 5 0 1 1 10 0 5 5 0 0 1-10 0zm5-3a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" fill="#006FCF"></path><path d="M22 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" fill="#006FCF"></path></svg>
    };
    return logos[brand] || null;
};

const CardNumberIcon = () => (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" className="h-6 w-6">
        <path d="M21 4H3C1.9 4 1 4.9 1 6v12c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H3V6h18v12zM5 10h9v2H5v-2z"></path>
    </svg>
);

const cardBrands = ['visa', 'mastercard', 'amex', 'discover', 'diners'];

// --- Main Payment Form Component ---
const PaymentForm = () => {
    const [formData, setFormData] = useState({
        cardNumber: '',
        expiryDate: '',
        csc: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would handle the form submission, e.g., send to an API
        console.log('Payment Data Submitted:', formData);
        alert('Payment method added successfully!');
    };

    return (
        <div className="bg-white min-h-screen">
            <div className="max-w-6xl">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">Payment methods</h1>
                
                <div className="border border-gray-300">
                    <div className="p-4 border-b border-gray-300">
                        <div className="flex items-center">
                            <input
                                id="credit-card"
                                name="payment-method"
                                type="radio"
                                defaultChecked
                                className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                            />
                            <label htmlFor="credit-card" className="ml-3 block text-base font-medium text-gray-800">
                                Credit card
                            </label>
                            <div className="ml-auto flex items-center space-x-2">
                                {cardBrands.map(brand => (
                                    <CardBrandIcon key={brand} brand={brand} />
                                ))}
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-slate-50 p-6 sm:p-8">
                        <p className="text-sm text-gray-600 mb-6">Pay securely using your credit card.</p>
                        
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Card Number */}
                            <div>
                                <label htmlFor="card-number" className="block text-sm font-medium text-gray-700 mb-1">
                                    Card number<span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        name="cardNumber"
                                        id="card-number"
                                        value={formData.cardNumber}
                                        onChange={handleChange}
                                        className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder=".... .... .... ...."
                                        required
                                    />
                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
                                        <CardNumberIcon />
                                    </div>
                                </div>
                            </div>

                            {/* Expiry Date & CVC */}
                            <div className="flex flex-col md:flex-row gap-6">
                                <div className="flex-1">
                                    <label htmlFor="expiry-date" className="block text-sm font-medium text-gray-700 mb-1">
                                        Expiry Date<span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="expiryDate"
                                        id="expiry-date"
                                        value={formData.expiryDate}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="MM / YY"
                                        required
                                    />
                                </div>
                                <div className="flex-1">
                                    <label htmlFor="csc" className="block text-sm font-medium text-gray-700 mb-1">
                                        Card security code<span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="csc"
                                        id="csc"
                                        value={formData.csc}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="CSC"
                                        required
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="mt-6">
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        className="w-auto bg-gray-900 text-white font-semibold py-3 px-6 rounded-md hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                    >
                        Add payment method
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentForm;