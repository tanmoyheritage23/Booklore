import { useState } from "react";
import { FaChevronRight, FaMinus, FaPlus } from "react-icons/fa";
import { useMutation } from "@tanstack/react-query";
import { postOrder, queryClient } from "../http";
import Error from "./UI/error/Error";
import { Link } from "react-router-dom";
import { getAuthToken, getUser } from "../util/auth";

const BookOrder = ({ book }) => {
  const [totalQty, setTotalQty] = useState(book.totalQty - 1);
  const [quantity, setQuantity] = useState(1);

  const { mutate, isPending, isError, error, isSuccess } = useMutation({
    mutationFn: ({ orderDetails, user, token }) =>
      postOrder(orderDetails, user, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cartItems"] });
    },
  });

  const handleAddToCart = () => {
    const user = getUser();
    const token = getAuthToken();
    mutate({
      orderDetails: { bookId: book._id, qty: quantity },
      user: user,
      token: token,
    });
  };

  const decreaseQtyHandler = () => {
    setTotalQty(totalQty < 10 && quantity > 1 ? totalQty + 1 : totalQty);

    setQuantity(quantity > 1 ? quantity - 1 : 1);
  };

  const increaseQtyHandler = () => {
    setTotalQty(totalQty > 0 ? totalQty - 1 : 0);

    setQuantity(totalQty > 0 ? quantity + 1 : quantity);
  };

  if (isError) {
    console.log(error);
    return <Error message={error.response?.data || "Add to cart error"} />;
  }

  return (
    <div className="pt-20 h-auto w-full mb-16">
      {/* Breadcrumb navigation */}
      <div className="ml-[5%] p-2 max-w-[20rem] rounded flex flex-row items-center sm:text-lg before:w-2 before:h-4 before:bg-slate-600 before:mr-2 bg-[#e6e6e6]">
        <p className="font-medium text-slate-500 mr-2 cursor-pointer">Home</p>
        <FaChevronRight className="mt-1 text-slate-400 mr-2" />
        <p className="font-medium text-slate-500 mr-2 cursor-pointer">Order</p>
        <FaChevronRight className="mt-1 text-slate-400 mr-2" />
        <p className="font-semibold text-slate-600 cursor-pointer">Book</p>
      </div>

      {/* Book details and ordering */}
      <div className="mt-12 mb-16 flex-col">
        <div className="flex flex-row justify-center items-center gap-8 md:gap-12">
          {/* Book image */}
          <img
            className="h-[12rem] w-[10rem] rounded md:h-[15rem] md:w-[12rem] lg:h-[18rem] lg:w-[15rem]"
            src={`https://bookstore-api-lrop.onrender.com/uploads/images/${book.imageURL}`}
            alt=""
          />

          <div className="h-[12rem] md:h-[15rem] lg:h-[16rem] lg:mt-[1rem]">
            {/* Book title */}
            <h1 className="font-bold text-lg md:text-xl lg:text-2xl tracking-wide">
              {book.title}
            </h1>

            {/* Book price */}
            <p className="mt-2 md:mt-4 font-semibold text-gray-800 md:text-lg lg:text-xl">
              {`$ ${book.price}`}
            </p>

            {/* Stock availability */}
            {totalQty <= 0 && (
              <p
                className={`mt-2 md:mt-4 text-sm md:text-base lg:text-lg font-semibold text-red-600 ${
                  isSuccess ? "mb-8" : ""
                }`}
              >
                Out of Stocks
              </p>
            )}
            {totalQty > 0 && (
              <p
                className={`mt-2 md:mt-4 text-sm md:text-base lg:text-lg font-semibold text-gray-500 ${
                  isSuccess ? "mb-8" : ""
                }`}
              >
                Only {totalQty} left <span className="text-sm">in Stocks</span>
              </p>
            )}

            {/* Quantity selector */}
            {!isSuccess && (
              <div className="mt-2 flex flex-col gap-8">
                <div className="flex flex-row items-center space-x-4">
                  <div
                    className={`p-2 md:p-4 bg-[#e6e6e6] rounded ${
                      totalQty < 0
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }`}
                    onClick={decreaseQtyHandler}
                  >
                    <FaMinus className="cursor-pointer text-gray-500 text-xs" />
                  </div>
                  <span className="font-bold text-gray-600 md:text-lg">
                    {quantity}
                  </span>
                  <div
                    className={`p-2 md:p-4 bg-[#e6e6e6] rounded ${
                      totalQty < 0
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }`}
                    onClick={increaseQtyHandler}
                  >
                    <FaPlus className="cursor-pointer text-gray-500 text-xs" />
                  </div>
                </div>

                {/* Add to cart button */}

                <button
                  className={`p-3 w-48 rounded ${
                    isPending ? "bg-teal-500" : "bg-black"
                  } text-white hover:bg-teal-500 hover:text-white transition duration-300 ease-in-out ${
                    totalQty < 0 ? "cursor-not-allowed" : "cursor-pointer"
                  } text-sm md:text-base`}
                  onClick={handleAddToCart}
                  disabled={isPending || totalQty < 0}
                >
                  {isPending ? "Adding..." : "Add to cart"}
                </button>
              </div>
            )}
            {isSuccess && (
              <Link
                to="/cart"
                className={`px-8 py-4 rounded  text-white bg-teal-500 hover:text-white text-sm md:text-base`}
              >
                View Cart
              </Link>
            )}
          </div>
        </div>

        {/* Book details */}
        <div className="mt-12 flex flex-col justify-center items-center lg:mt-14">
          {/* Section title */}
          <h1 className="text-xl font-semibold md:text-2xl lg:text-3xl mb-6 bg-[#e6e6e6] p-4 rounded shadow-lg">
            Details
          </h1>

          {/* Book information */}
          <div className="w-4/5">
            <h1 className="text-xl mb-4 font-semibold lg:text-2xl">
              {book.title}{" "}
              <span className="text-base font-thin lf:text-lg">
                - {book.author}
              </span>
            </h1>
            <p className="text-sm md:text-base lg:text-lg">{book.summary}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookOrder;
