import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { fetchBooks } from "../http";
import Error from "./UI/error/Error";
import LoaderSpinner from "./UI/Loader";

const FeaturedBooks = ({ books }) => {
  const featuredBooks = books?.filter((book) => book.featured === true) || [];

  const containerRef = useRef(null);
  const [leftClick, setLeftClick] = useState(true);
  const [rightClick, setRightClick] = useState(false);

  const scrollToPrevious = () => {
    // Scroll to the previous set of featured products
    const container = containerRef.current;
    container.scrollTo({
      left: container.scrollLeft - container.offsetWidth,
      behavior: "smooth",
    });
    setLeftClick(true);
    setRightClick(false);
  };

  const scrollToNext = () => {
    // Scroll to the next set of featured products
    const container = containerRef.current;
    container.scrollTo({
      left: container.scrollLeft + container.offsetWidth,
      behavior: "smooth",
    });
    setLeftClick(false);
    setRightClick(true);
  };

  return (
    <div
      id="featured"
      className="p-4 mb-16 flex flex-col justify-center items-center"
    >
      <h1 className="text-2xl font-semibold sm:text-3xl md:text-4xl mb-12 relative z-40">
        Featured Books
        <span className="absolute left-[38%] right-0 bottom-[-1rem] w-[25%] h-1 bg-gray-400 rounded"></span>
      </h1>

      <div className="flex felx-row text-4xl mb-8 gap-12 text-gray-400">
        <FaChevronLeft
          className={`cursor-pointer ${
            leftClick ? "text-black" : "text-gray-400"
          }`}
          onClick={scrollToPrevious}
        />
        <FaChevronRight
          className={`cursor-pointer ${
            rightClick ? "text-black" : "text-gray-400"
          }`}
          onClick={scrollToNext}
        />
      </div>

      <div
        className="w-3/5 md:w-4/5 grid grid-flow-col gap-12 place-items-center  overscroll-contain overflow-x-hidden"
        ref={containerRef}
      >
        {featuredBooks.map((book) => (
          <div className="w-60 flex flex-col" key={book._id}>
            <img
              className="h-72 w-full rounded-sm shadow-lg"
              src={`https://bookstore-api-lrop.onrender.com/uploads/images/${book.imageURL}`}
              alt=""
            />
            <div className="w-full flex flex-row justify-between items-center ">
              <div className="mt-2 flex flex-col">
                <h1 className="font-semibold text-gray-700">
                  {book.title.length > 20
                    ? book.title.slice(0, 17) + "..."
                    : book.title}
                </h1>
                <p className="font-bold">{`$ ${book.price}`}</p>
              </div>
              <Link to={`/order/${book._id}`}>
                <div className="h-12 w-12 cursor-pointer flex justify-center items-center hover:bg-teal-400 rounded-md shadow-sm transition duration-300 ease-in-out group">
                  <img
                    className="h-6 w-6 group-hover:h-8 group-hover:w-8"
                    src="https://cdn-icons-png.flaticon.com/128/2543/2543369.png"
                    alt=""
                  />
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedBooks;
