import Error from "../components/Error";
import { useRouteError } from "react-router-dom";

// ErrorPage component
const ErrorPage = () => {
  const error = useRouteError(); // Retrieves error information from the route
  console.log(error);
  let title = "An error occurred!";
  let message = "Something went wrong!";

  if (error.status === 500) {
    message = error.data.message; // Updates the message if the error status is 500
  }

  if (error.status === 404) {
    title = "Not found!";
    message = "Could not find resource or page."; // Updates the title and message if the error status is 404
  }

  return (
    <Error title={title} message={message} /> // Renders the Error component with the title and message
  );
};

export default ErrorPage;
