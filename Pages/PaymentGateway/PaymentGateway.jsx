"use client";

import {
  FiCreditCard,
  FiLock,
  FiCheckCircle,
  FiAlertTriangle,
  FiLoader,
} from "react-icons/fi";
import { FaPaypal, FaGoogle, FaApple } from "react-icons/fa";
import { useState } from "react";

const PaymentMethod = ({ method, label, icon, selectedMethod, onSelect }) => {
  const isSelected = method === selectedMethod;
  return (
    <button
      type="button"
      onClick={() => onSelect(method)}
      className={`flex items-center w-full sm:w-1/2 lg:w-full p-4 rounded-lg border-2 transition-all duration-200 ${
        isSelected
          ? "border-yellow-400 bg-yellow-50"
          : "border-gray-300 hover:border-gray-400"
      }`}
    >
      {icon}
      <span
        className={`ml-4 font-semibold ${
          isSelected ? "text-yellow-700" : "text-gray-700"
        }`}
      >
        {label}
      </span>
    </button>
  );
};

const PaymentGateway = ({
  amount = 0,
  currency = "USD",
  onPaymentSuccess,
  onPaymentError,
}) => {
  const [selectedMethod, setSelectedMethod] = useState("card");
  const [cardDetails, setCardDetails] = useState({
    number: "",
    name: "",
    expiry: "",
    cvc: "",
  });
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("idle"); // idle, success, error

  const currencySymbols = { USD: "$", EUR: "€", GBP: "£", JPY: "¥" };
  const currencySymbol = currencySymbols[currency] || "$";

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    let formattedValue = value;
    if (name === "number") {
      formattedValue = value
        .replace(/\D/g, "")
        .replace(/(\d{4})(?=\d)/g, "$1 ");
    } else if (name === "expiry") {
      formattedValue = value
        .replace(/\D/g, "")
        .replace(/(\d{2})(?=\d)/g, "$1/");
    } else if (name === "cvc") {
      formattedValue = value.replace(/\D/g, "");
    }

    setCardDetails({ ...cardDetails, [name]: formattedValue });

    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (
      !cardDetails.number ||
      cardDetails.number.replace(/\s/g, "").length !== 16
    ) {
      newErrors.number = "Please enter a valid 16-digit card number.";
    }
    if (!cardDetails.name.trim()) {
      newErrors.name = "Name on card is required.";
    }
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(cardDetails.expiry)) {
      newErrors.expiry = "Enter expiry date in MM/YY format.";
    } else {
      const [month, year] = cardDetails.expiry.split("/");
      const expiryDate = new Date(`20${year}`, month - 1);
      if (expiryDate < new Date()) {
        newErrors.expiry = "Card has expired.";
      }
    }
    if (!/^\d{3,4}$/.test(cardDetails.cvc)) {
      newErrors.cvc = "Enter a valid 3 or 4-digit CVC.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedMethod === "card") {
      if (!validateForm()) return;
    }

    setIsProcessing(true);
    setPaymentStatus("idle");

    // Mock API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Mock success/error response
    if (Math.random() > 0.15) {
      // 85% success rate
      setPaymentStatus("success");
      if (onPaymentSuccess) {
        onPaymentSuccess({
          method: selectedMethod,
          amount,
          currency,
          transactionId: `txn_${Date.now()}`,
        });
      }
    } else {
      setPaymentStatus("error");
      if (onPaymentError) {
        onPaymentError("The payment could not be processed. Please try again.");
      }
    }

    setIsProcessing(false);
  };

  if (paymentStatus === "success") {
    return (
      <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg max-w-md w-full text-center mx-auto">
        <FiCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Payment Successful!
        </h2>
        <p className="text-gray-600">
          Thank you for your purchase. A receipt has been sent to your email.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl my-7">
      <div className="">
        <div className="mb-4">
          <p className="mt-1  font-semibold text-xl text-gray-700">
            Complete your purchase for {currencySymbol}
            {amount.toFixed(2)}
          </p>
        </div>
        <div className="bg-white  rounded-2xl ">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <PaymentMethod
              method="card"
              label="Credit / Debit Card"
              icon={<FiCreditCard className="text-2xl text-gray-800" />}
              selectedMethod={selectedMethod}
              onSelect={setSelectedMethod}
            />
            <PaymentMethod
              method="paypal"
              label="PayPal"
              icon={<FaPaypal className="text-2xl text-gray-800" />}
              selectedMethod={selectedMethod}
              onSelect={setSelectedMethod}
            />
            <PaymentMethod
              method="googlepay"
              label="Google Pay"
              icon={<FaGoogle className="text-2xl text-gray-800" />}
              selectedMethod={selectedMethod}
              onSelect={setSelectedMethod}
            />
            <PaymentMethod
              method="applepay"
              label="Apple Pay"
              icon={<FaApple className="text-2xl text-gray-800" />}
              selectedMethod={selectedMethod}
              onSelect={setSelectedMethod}
            />
          </div>

          {selectedMethod === "card" && (
            <div className="space-y-6 border-t pt-6">
              <div>
                <label
                  htmlFor="number"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Card Number
                </label>
                <input
                  type="text"
                  id="number"
                  name="number"
                  value={cardDetails.number}
                  onChange={handleInputChange}
                  placeholder="0000 0000 0000 0000"
                  maxLength="19"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none transition-all ${
                    errors.number
                      ? "border-red-500 focus:ring-red-200"
                      : "border-gray-300 focus:ring-yellow-200 focus:border-yellow-400"
                  }`}
                />
                {errors.number && (
                  <p className="mt-2 text-sm text-red-600">{errors.number}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Name on Card
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={cardDetails.name}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none transition-all ${
                    errors.name
                      ? "border-red-500 focus:ring-red-200"
                      : "border-gray-300 focus:ring-yellow-200 focus:border-yellow-400"
                  }`}
                />
                {errors.name && (
                  <p className="mt-2 text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="expiry"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    id="expiry"
                    name="expiry"
                    value={cardDetails.expiry}
                    onChange={handleInputChange}
                    placeholder="MM/YY"
                    maxLength="5"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none transition-all ${
                      errors.expiry
                        ? "border-red-500 focus:ring-red-200"
                        : "border-gray-300 focus:ring-yellow-200 focus:border-yellow-400"
                    }`}
                  />
                  {errors.expiry && (
                    <p className="mt-2 text-sm text-red-600">{errors.expiry}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="cvc"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    CVC
                  </label>
                  <input
                    type="text"
                    id="cvc"
                    name="cvc"
                    value={cardDetails.cvc}
                    onChange={handleInputChange}
                    placeholder="123"
                    maxLength="4"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none transition-all ${
                      errors.cvc
                        ? "border-red-500 focus:ring-red-200"
                        : "border-gray-300 focus:ring-yellow-200 focus:border-yellow-400"
                    }`}
                  />
                  {errors.cvc && (
                    <p className="mt-2 text-sm text-red-600">{errors.cvc}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {paymentStatus === "error" && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center">
              <FiAlertTriangle className="mr-3 flex-shrink-0" />
              <span>
                Payment failed. Please check your details and try again.
              </span>
            </div>
          )}

          <button
            type="submit"
            onClick={handleSubmit}
            disabled={isProcessing}
            className="mt-8 w-full bg-yellow-500 text-gray-900 font-bold py-4 px-6 rounded-lg hover:bg-yellow-400 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-300 flex items-center justify-center shadow-md hover:shadow-lg"
          >
            {isProcessing ? (
              <FiLoader className="animate-spin mr-3" />
            ) : (
              <FiLock className="mr-3" />
            )}
            <span className="text-lg">
              {isProcessing
                ? "Processing..."
                : `Pay ${currencySymbol}${amount.toFixed(2)}`}
            </span>
          </button>

          <div className="mt-6 flex items-center justify-center text-gray-500">
            <FiLock className="mr-2 text-gray-400" />
            <p className="text-sm">Your payment is secure and encrypted</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentGateway;
