import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const PaymentSuccess = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 p-6">
      <CheckCircle size={80} className="text-red-600 mb-4" />
      <h1 className="text-3xl font-bold text-red-700 mb-2">Payment Successful!</h1>
      <p className="text-gray-700 mb-6 text-center">
        Thank you for your purchase. Your order has been placed successfully.
      </p>
      <Link
        to="/"
        className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded transition"
      >
        Go to Home
      </Link>

      <Link
        to="/deliverOrder"
        className="bg-red-600 mt-4 hover:bg-red-700 text-white px-6 py-3 rounded transition"
      >
        Order Review Of Deliver Order
      </Link>
    </div>
  );
};

export default PaymentSuccess;
