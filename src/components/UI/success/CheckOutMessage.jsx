import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getUserName } from "../../../util/auth";

const CheckOutMessage = () => {
  const navigate = useNavigate();
  const user = getUserName();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-3xl font-bold mb-4">
        Thank you for your purchase, {user}!
      </h2>
      <p className="text-lg mb-8">We appreciate your business.</p>
      <div className="flex items-center space-x-4">
        <button
          className="flex items-center justify-center bg-black hover:bg-teal-500 text-white px-4 py-2 rounded transition-colors duration-300"
          onClick={() => navigate("/")}
        >
          <FaHome className="mr-2" />
          Home
        </button>
      </div>
    </div>
  );
};

export default CheckOutMessage;
