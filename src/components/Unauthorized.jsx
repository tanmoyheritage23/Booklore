import React from "react";
import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4 text-red-600">
        Unauthorized Access
      </h1>
      <p className="text-gray-600 mb-8">
        Oops! You are not authorized to view this page.
      </p>
      <Link to="/" className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded">
        Back to Homepage
      </Link>
    </div>
  );
};

export default Unauthorized;
