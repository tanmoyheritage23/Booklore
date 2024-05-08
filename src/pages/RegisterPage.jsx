import axios from "axios";
import { redirect } from "react-router-dom";
import Register from "../components/Register";
import { apiUrl } from "../util/auth";

const RegisterPage = () => {
  return <Register />;
};

export default RegisterPage;

export const action = async ({ request }) => {
  try {
    const data = await request.formData();

    const userData = {
      name: data.get("name"),
      email: data.get("email"),
      password: data.get("password"),
    };

    await axios.post(`${apiUrl}/api/user/register`, userData);

    return redirect("/login");
  } catch (error) {
    return error.response;
  }
};
