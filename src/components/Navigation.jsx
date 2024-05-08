import { useEffect, useState } from "react";
import {
  useNavigate,
  Link as RouterLink,
  useLocation,
  useRouteLoaderData,
} from "react-router-dom";
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";

const Navigation = () => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isLogin, setIsLogIn] = useState(false);
  const token = useRouteLoaderData("root");
  useEffect(() => {
    if (token) {
      setIsLogIn(true);
    } else {
      setIsLogIn(false);
    }
  }, [token]);

  const nevigate = useNavigate();

  const logoutHandler = () => {
    setIsLoggingOut(true);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("username");
    localStorage.removeItem("expiration");
    setTimeout(() => {
      setIsLogIn(false);
      setIsLoggingOut(false);
      nevigate("/");
    }, 2000);
  };

  // CSS classes for the list items
  const listIMGStyle = "h-4 w-4 sm:h-6 sm:w-6 sm:group-hover:hidden md:hidden";
  const listNameStyle =
    "hidden text-lg sm:group-hover:block md:block hover:text-teal-700 hover:border-b-[2px] hover:border-b-teal-100 transition duration-300 ease-in-out group";

  // Hooks for navigation and location
  const navigate = useNavigate();
  const location = useLocation();

  // Function to redirect to home and scroll to top
  const redirectToHome = () => {
    navigate("/");
    scroll.scrollToTop();
  };

  // Function to render the navbar based on the current location
  const renderNavbar = () => {
    if (location.pathname === "/") {
      return (
        <nav className="fixed bg-white h-16 w-screen flex flex-row items-center justify-between z-50">
          <RouterLink onClick={redirectToHome}>
            <div className="ml-4 text-lg font-semibold sm:text-xl md:text-2xl lg:ml-8 cursor-pointer">
              <h1>Bookery</h1>
            </div>
          </RouterLink>
          <div className="h-full w-4/5">
            <ul className="flex flex-row h-full w-full justify-evenly items-center md:justify-between">
              <ScrollLink
                onClick={redirectToHome}
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                to="home"
              >
                <li className="cursor-pointer group">
                  <img
                    className={listIMGStyle}
                    src="https://cdn-icons-png.flaticon.com/128/102/102665.png"
                    alt="shop"
                  />
                  <p className={listNameStyle}>Home</p>
                </li>
              </ScrollLink>

              <ScrollLink
                to="author"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
              >
                <li className="cursor-pointer group transition duration-500 ease-in-out">
                  <img
                    className={listIMGStyle}
                    src="https://cdn-icons-png.flaticon.com/128/8896/8896566.png"
                    alt="authors"
                  />
                  <p className={listNameStyle}>Author</p>
                </li>
              </ScrollLink>

              <ScrollLink
                to="categories"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
              >
                <li className="cursor-pointer group">
                  <img
                    className={listIMGStyle}
                    src="https://cdn-icons-png.flaticon.com/128/4059/4059951.png"
                    alt="featured products"
                  />
                  <p className={listNameStyle}>Genres</p>
                </li>
              </ScrollLink>

              <ScrollLink
                to="featured"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
              >
                <li className="cursor-pointer group">
                  <img
                    className={listIMGStyle}
                    src="https://cdn-icons-png.flaticon.com/128/4059/4059951.png"
                    alt="featured products"
                  />
                  <p className={listNameStyle}>Featured</p>
                </li>
              </ScrollLink>

              <div className="w-1/5">
                <ul className="flex flex-row justify-between md:justify-evenly">
                  <RouterLink to="cart">
                    <li className="cursor-pointer">
                      <img
                        className="h-4 w-4 sm:h-6 sm:w-6"
                        src="https://cdn-icons-png.flaticon.com/128/833/833314.png"
                        alt="cart"
                      />
                    </li>
                  </RouterLink>
                  {isLoggingOut && (
                    <li className="ml-4 text-lg font-semibold sm:text-xl md:text-2xl lg:ml-8 flex items-center">
                      <div className="mr-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-gray-900" />
                      </div>
                    </li>
                  )}
                  {isLogin && !isLoggingOut && (
                    <li onClick={logoutHandler} className="cursor-pointer">
                      <img
                        className="h-4 w-4 sm:h-6 sm:w-6"
                        src="https://cdn-icons-png.flaticon.com/128/1077/1077063.png"
                        alt="user"
                      />
                    </li>
                  )}
                  {!isLogin && (
                    <RouterLink to="login" className="cursor-pointer">
                      <img
                        className="h-4 w-4 sm:h-6 sm:w-6"
                        src="https://cdn-icons-png.flaticon.com/128/3596/3596092.png"
                        alt="user"
                      />
                    </RouterLink>
                  )}
                </ul>
              </div>
            </ul>
          </div>
        </nav>
      );
    } else if (
      location.pathname === "/login" ||
      location.pathname === "/register"
    ) {
      return "";
    } else {
      return (
        <nav className="fixed bg-white h-16 w-screen flex flex-row items-center justify-between z-50">
          <RouterLink onClick={redirectToHome}>
            <div className="ml-4 text-lg font-semibold sm:text-xl md:text-2xl lg:ml-8 cursor-pointer">
              <h1>Bookery</h1>
            </div>
          </RouterLink>
          <div className="h-full w-4/5">
            <ul className="flex flex-row h-full w-full justify-evenly items-center">
              <ScrollLink
                onClick={redirectToHome}
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                to="home"
              >
                <li className="cursor-pointer group">
                  <img
                    className={listIMGStyle}
                    src="https://cdn-icons-png.flaticon.com/128/102/102665.png"
                    alt="shop"
                  />
                  <p className={listNameStyle}>Home</p>
                </li>
              </ScrollLink>

              <RouterLink to="/books?query=All Books">
                <li className="cursor-pointer group">
                  <img
                    className={listIMGStyle}
                    src="https://cdn-icons-png.flaticon.com/128/2702/2702134.png"
                    alt="books"
                  />
                  <p className={listNameStyle}>Books</p>
                </li>
              </RouterLink>

              <RouterLink to="cart">
                <li className="cursor-pointer">
                  <img
                    className="h-4 w-4 sm:h-6 sm:w-6"
                    src="https://cdn-icons-png.flaticon.com/128/833/833314.png"
                    alt="cart"
                  />
                </li>
              </RouterLink>
              {isLoggingOut && (
                <li className="ml-4 text-lg font-semibold sm:text-xl md:text-2xl lg:ml-8 flex items-center">
                  <div className="mr-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-gray-900" />
                  </div>
                </li>
              )}
              {isLogin && !isLoggingOut && (
                <li onClick={logoutHandler} className="cursor-pointer">
                  <img
                    className="h-4 w-4 sm:h-6 sm:w-6"
                    src="https://cdn-icons-png.flaticon.com/128/1077/1077063.png"
                    alt="user"
                  />
                </li>
              )}
              {!isLogin && (
                <RouterLink to="login" className="cursor-pointer">
                  <img
                    className="h-4 w-4 sm:h-6 sm:w-6"
                    src="https://cdn-icons-png.flaticon.com/128/3596/3596092.png"
                    alt="user"
                  />
                </RouterLink>
              )}
            </ul>
          </div>
        </nav>
      );
    }
  };

  return renderNavbar();
};

export default Navigation;
