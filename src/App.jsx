import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/Root";
import Home from "./pages/Home";
import Order, { Loader as orderLoader } from "./pages/Order";
import BooksQuery, { Loader as bookLoader } from "./pages/BooksQuery";
import OrderCart, { Loader as cartLoader } from "./pages/OrderCart";
import ErrorPage from "./pages/ErrorPage";
import RegisterPage, { action as registerAction } from "./pages/RegisterPage";
import LoginPage, { action as loginAction } from "./pages/LoginPage";
import { tokenLoader } from "./util/auth";
import Unauth from "./pages/Unauth";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./http";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    id: "root",
    loader: tokenLoader,
    children: [
      { index: true, element: <Home /> },
      { path: "register", element: <RegisterPage />, action: registerAction },
      { path: "login", element: <LoginPage />, action: loginAction },
      { path: "books", element: <BooksQuery />, loader: bookLoader },
      { path: "order/:bookID", element: <Order />, loader: orderLoader },
      { path: "cart", element: <OrderCart />, loader: cartLoader },
    ],
  },
  {
    path: "/unAuth",
    element: <Unauth />,
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
