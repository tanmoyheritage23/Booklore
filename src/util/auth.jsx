export const getTokenDuration = () => {
  const storedExpirationDate = localStorage.getItem("expiration");
  const expirationDate = new Date(storedExpirationDate);
  const now = new Date();
  const duration = expirationDate.getTime() - now.getTime();

  return duration;
};

export const getAuthToken = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return null;
  }

  const tokenDuration = getTokenDuration();

  if (tokenDuration < 0) {
    return "EXPIRED";
  }
  return token;
};

export const tokenLoader = () => {
  const token = getAuthToken();
  return token;
};

export const getUser = () => {
  const user = localStorage.getItem("user");
  return user;
};
export const getUserName = () => {
  const name = localStorage.getItem("username");

  return name;
};

export const apiUrl = "https://bookstore-api-lrop.onrender.com";
