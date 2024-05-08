import React, { Suspense } from "react";
import { redirect } from "react-router-dom";
const Cart = React.lazy(() => import("../components/Cart"));
import { useQuery } from "@tanstack/react-query";
import { cartOrder, queryClient } from "../http";
import LoaderSpinner from "../components/UI/Loader";
import Error from "../components/UI/error/Error";
import { getAuthToken, getUser } from "../util/auth";

const OrderCart = () => {
  const token = getAuthToken();
  const user = getUser();
  const {
    data: cartItems,
    isError,
    error,
  } = useQuery({
    queryKey: ["cartItems"],
    queryFn: () => cartOrder(user, token),
  });

  if (isError) {
    console.log(error);
    return <Error message="Error fetching cart items" />;
  }

  return (
    <Suspense fallback={<LoaderSpinner message="Loading cart items..." />}>
      <Cart items={cartItems} />
    </Suspense>
  );
};

export default OrderCart;

export const Loader = () => {
  const token = getAuthToken();
  const user = getUser();
  if (!token) return redirect("/unAuth");

  return queryClient.fetchQuery({
    queryKey: ["cartItems"],
    queryFn: () => cartOrder(user, token),
  });
};
