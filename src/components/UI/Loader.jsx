import { FaSpinner } from "react-icons/fa";

const LoaderSpinner = ({ message }) => {
  return (
    <div className="flex justify-center items-center h-screen">
      <FaSpinner className="animate-spin mr-2" />
      <p>{message}</p>
    </div>
  );
};

export default LoaderSpinner;
