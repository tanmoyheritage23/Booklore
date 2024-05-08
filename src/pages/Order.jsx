import React, { Suspense } from "react";
const BookOrder = React.lazy(() => import("../components/BookOrder"));
import { redirect, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchSpecificBook, queryClient } from "../http";
import LoaderSpinner from "../components/UI/Loader";
import Error from "../components/UI/error/Error";
import { getAuthToken } from "../util/auth";

const Order = () => {
  const { bookID } = useParams();

  const {
    data: book,
    isError,
    error,
  } = useQuery({
    queryKey: ["books", { bookID: bookID }],
    queryFn: () => fetchSpecificBook(bookID),
  });

  if (isError) {
    console.log(error);
    return <Error message="Error in fetching book" />;
  }

  return (
    <Suspense fallback={<LoaderSpinner message="Loading book items..." />}>
      <BookOrder book={book ? book : []} />
    </Suspense>
  );
};

export default Order;

export const Loader = ({ params }) => {
  const token = getAuthToken();
  if (!token) return redirect("/unAuth");
  const { bookID } = params;

  return queryClient.fetchQuery({
    queryKey: ["books", { bookID: bookID }],
    queryFn: () => fetchSpecificBook(bookID),
  });
};
