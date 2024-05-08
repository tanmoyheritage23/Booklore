import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaChevronLeft, FaChevronRight } from "react-icons/fa";

import adventure from "../assets/Adventure.jpeg";
import self_help from "../assets/Self_help.jpeg";
import Horror from "../assets/horror.jpeg";
import Fantasy from "../assets/fantacy.jpeg";
import Drama from "../assets/drama.jpeg";
import Thriller from "../assets/thriller.jpeg";

const items = [
  { label: "Adventure", image: adventure },
  { label: "Self-Help", image: self_help },
  { label: "Horror", image: Horror },
  { label: "Fantasy", image: Fantasy },
  { label: "Drama", image: Drama },
  { label: "Thriller", image: Thriller },
];

const BookGenres = () => {
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
      id="categories"
      className="mt-16 p-4 mb-8 flex flex-col justify-center items-center"
    >
      <h1 className="text-2xl font-semibold sm:text-3xl md:text-4xl mb-12 relative z-40">
        Genres
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
        {items.map((item, index) => (
          <div
            key={index}
            className="w-72 h-80 rounded-md bg-[center_30%] shadow-sm"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${item.image})`,
              backgroundSize: "cover",
            }}
          >
            <Link
              to={`/books?query=${item.label}`}
              className="mt-8 h-4/5 flex flex-row justify-center items-end "
            >
              <button className="h-12 w-3/5 bg-gray-200 rounded font-bold flex flex-row items-center justify-between p-4 hover:bg-teal-400 hover:text-white transition duration-300 ease-in-out group">
                {item.label}
                <FaArrowRight className="text-sm mt-[5px] text-gray-500 group-hover:text-white" />
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookGenres;
