import {
  FaChevronRight,
  FaPlus,
  FaMinus,
  FaShoppingCart,
  FaTrashAlt,
} from "react-icons/fa";

import { useState } from "react";
import CheckOutMessage from "./UI/success/CheckOutMessage";
import { useMutation } from "@tanstack/react-query";
import { checkOut, deleteItem, queryClient, updateData } from "../http";
import Error from "./UI/error/Error";
import { getAuthToken, getUser } from "../util/auth";

const Cart = ({ items }) => {
  const [cartItems, setCartItems] = useState(items);
  const user = getUser();
  const token = getAuthToken();

  const { mutate, isError, error } = useMutation({
    mutationFn: ({ mode, id, token }) => updateData(mode, id, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cartItems"] });
    },
  });

  const increaseQuantity = (itemId) => {
    const updatedItems = cartItems.map((item) => {
      if (item._id === itemId && item.totalQty > 0) {
        mutate({ mode: "plus", id: itemId, token: token });
        const newTotalQty = item.totalQty - 1;
        const newQty = item.Qty + 1;
        const newTotalPrice = newQty * item.price;
        return {
          ...item,
          totalQty: newTotalQty,
          Qty: newQty,
          totalPrice: newTotalPrice,
        };
      }
      return item;
    });
    setCartItems(updatedItems);
  };

  const decreaseQuantity = (itemId) => {
    const updatedItems = cartItems.map((item) => {
      if (item._id === itemId && item.Qty > 1) {
        mutate({ mode: "minus", id: itemId, token: token });
        const newTotalQty = item.totalQty + 1;
        const newQty = item.Qty - 1;
        const newTotalPrice = newQty * item.price;
        return {
          ...item,
          totalQty: newTotalQty,
          Qty: newQty,
          totalPrice: newTotalPrice,
        };
      }
      return item;
    });
    setCartItems(updatedItems);
  };

  const {
    mutate: deleteMutate,
    isPending: isDeleting,
    isError: isDeleteError,
    error: deleteError,
  } = useMutation({
    mutationFn: ({ id, user, token }) => deleteItem(id, user, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cartItems"] });
    },
  });

  const deleteItemHandler = (itemId) => {
    deleteMutate({ id: itemId, user: user, token: token });
    setTimeout(() => {
      const updatedItems = cartItems.filter((item) => item._id !== itemId);
      setCartItems(updatedItems);
    }, 2000);
  };

  const {
    data: result,
    mutate: checkoutMutate,
    isPending: isCheckoutPending,
    isError: isCheckoutError,
    error: checkoutError,
    isSuccess: isCheckoutSuccess,
  } = useMutation({
    mutationFn: ({ user, token }) => checkOut(user, token),
  });

  const checkOutHandler = async () => {
    checkoutMutate({ user: user, token: token });
  };

  let totalPrice = 0;
  const shipment = 20;

  // Calculate the total price
  if (cartItems !== null) {
    cartItems.forEach((item) => {
      totalPrice += item.price * item.Qty;
    });
  }

  let discount = Math.round(totalPrice * 0.05);

  if (isCheckoutSuccess) {
    return <CheckOutMessage />;
  }

  if (isError) {
    console.log(error);
    return <Error message="Error in updating the items" />;
  }

  if (isDeleteError) {
    console.log(deleteError);
    return <Error message="Error in deleting the items" />;
  }

  if (isCheckoutError) {
    console.log(checkoutError);
    return <Error message="Error in checkout" />;
  }

  return (
    <div className="min-h-[100vh] h-auto pt-20 w-full">
      <div className="w-[90%] ml-[5%]  flex flex-row justify-between items-center">
        {/* Breadcrumb */}
        <div className="p-2 pr-4 rounded flex flex-row items-center sm:text-lg before:w-2 before:h-4 before:bg-slate-600 before:mr-2 bg-[#e6e6e6]">
          <p className="font-medium text-slate-500 mr-2 cursor-pointer">Home</p>
          <FaChevronRight className="mt-1 text-slate-400 mr-2" />
          <p className="font-semibold text-slate-600 cursor-pointer">Cart</p>
        </div>
      </div>

      {cartItems.length === 0 && (
        <div className="w-full h-screen flex flex-col justify-center items-center">
          <FaShoppingCart className="text-6xl mb-4 text-gray-500" />
          <p className="text-2xl font-bold text-gray-800">
            No Items in the cart
          </p>
        </div>
      )}

      {cartItems.length > 0 && (
        <div className="mt-16 w-[90%] ml-[5%] mb-16 flex flex-col gap-16 justify-center items-center md:flex-row">
          {/* Cart Items */}
          {isDeleting && (
            <div className="flex items-center">
              <FaTrashAlt className="animate-spin mr-2" />
              <p className="text-gray-600">Deleting...</p>
            </div>
          )}

          <div className="flex flex-col w-full">
            {cartItems.map((item) => (
              <div
                className="h-32 w-full flex flex-row items-center mb-4 justify-center"
                key={item._id}
              >
                <div className="h-full ml-[5%] w-[90%] rounded-md flex flex-row items-center border-[1px] border-gray-400 justify-between sm:w-[80%] pl-4 pr-4 lg:pl-8 lg:pr-8 md:w-[90%] lg:w-[80%] relative">
                  <div className="h-full w-full flex flex-row items-center">
                    <img
                      className="h-4/5 w-20 rounded-md sm:w-28"
                      src={`https://bookstore-api-lrop.onrender.com/uploads/images/${item.imageURL}`}
                      alt=""
                    />
                    <div className="ml-2 mt-[-1rem] sm:ml-4">
                      <h1 className="text-sm font-semibold text-gray-700 sm:text-base">
                        {item.title}
                      </h1>
                      <p className="text-xs font-semibold text-gray-500 sm:text-sm">
                        {item.author}
                      </p>
                      <p className="font-semibold mt-2 text-gray-700 text-sm sm:text-base">
                        $ {item.price}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-row h-4/5 justify-center ml-8 items-center gap-4">
                    <div
                      className="bg-[#e6e6e6] p-2 rounded-md cursor-pointer sm:p-4"
                      onClick={() => increaseQuantity(item._id)}
                    >
                      <FaPlus className="text-gray-600 text-sm" />
                    </div>
                    <p className="font-semibold">{item.Qty}</p>
                    <div
                      className="bg-[#e6e6e6] p-2 rounded-md cursor-pointer sm:p-4"
                      onClick={() => decreaseQuantity(item._id)}
                    >
                      <FaMinus className="text-gray-600 text-sm" />
                    </div>
                  </div>
                  <button
                    className="absolute top-0 right-0 mt-2 mr-2  text-gray-700 font-bold text-xs sm:text-sm"
                    onClick={() => deleteItemHandler(item._id)}
                  >
                    X
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}

          <div className="w-2/5 h-auto flex flex-col justify-center items-center">
            <div className="w-full flex flex-row justify-between items-center">
              <h1 className="font-semibold text-gray-500">Subtotal</h1>

              <p className="font-semibold text-gray-600">
                <span className="text-gray-500 font-bold">$</span>
                {` ${totalPrice}`}
              </p>
            </div>
            <div className="mt-2 w-full flex flex-row justify-between items-center">
              <h1 className="font-semibold text-gray-500">Discount(5%)</h1>
              <p className="font-semibold text-gray-600">
                <span className="text-gray-500 font-bold">-$</span>
                {` ${discount}`}
              </p>
            </div>
            <div className="mt-2 w-full flex flex-row justify-between items-center">
              <h1 className="font-semibold text-gray-500">Shipment</h1>

              <p className="font-semibold text-gray-600">
                <span className="text-gray-500 font-bold">$</span>
                {` ${shipment}`}
              </p>
            </div>
            <span className="mt-4 w-full h-[2px] bg-gray-400"></span>
            <div className="mt-2 w-full flex flex-row justify-between items-center">
              <h1 className="font-semibold text-gray-600">Grand Total</h1>
              <p className="font-semibold text-gray-700">
                <span className="text-gray-500 font-bold">$</span>
                {totalPrice - discount + shipment}
              </p>
            </div>

            <button
              className={`mt-6  ${
                isCheckoutPending ? "bg-teal-500" : "bg-black"
              } text-gray-200 p-2 pl-6 pr-6 rounded hover:bg-teal-500 hover:text-white transition duration-300 ease-in-out cursor-pointer text-sm md:text-base`}
              onClick={checkOutHandler}
              type="submit"
              disabled={isCheckoutPending}
            >
              {isCheckoutPending ? "Checking out..." : "Checkout now"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
