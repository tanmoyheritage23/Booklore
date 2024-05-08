import { FaBomb } from "react-icons/fa";

// Error component
const Error = ({ title, message }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <FaBomb className="text-red-500 text-5xl mr-2" />{" "}
      {/* Renders the FaBomb icon component */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">{title}</h2>{" "}
        {/* Renders the error title */}
        <p className="text-xl">{message}</p> {/* Renders the error message */}
      </div>
    </div>
  );
};

export default Error;
