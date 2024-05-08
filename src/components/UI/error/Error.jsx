import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";

const Error = ({ message }) => {
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="text-7xl text-red-500 flex flex-row justify-center gap-2 mb-4">
        <FaExclamationTriangle />
      </div>

      <div className="text-xl text-gray-600">{message}</div>

      <div className="mt-4 flex flex-row justify-center gap-4">
        <button
          className="px-4 py-2 bg-black text-white rounded hover:bg-teal-500"
          onClick={handleGoBack}
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default Error;
