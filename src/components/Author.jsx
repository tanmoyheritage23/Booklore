import { Link } from "react-router-dom";
import React, { useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import William_Shakespear from "../assets/William_Shakespear.jpg";
import Agatha_Christie from "../assets/Agatha_Christie.jpg";
import JK_Rowlingn from "../assets/J.K._Rowling.jpg";
import Dan_Brown from "../assets/Dan_Brown.jpg";
import Stephen_King from "../assets/Stephen_King.jpg";

const Authors = [
  { image: William_Shakespear, name: "William Shakespeare" },
  { image: Agatha_Christie, name: "Agatha Christie" },
  { image: JK_Rowlingn, name: "J.K. Rowling" },
  { image: Dan_Brown, name: "Dan Brown" },
  { image: Stephen_King, name: "Stephen King" },
];

const Author = () => {
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

  // Render a list of authors with their images and names as links
  return (
    <div
      id="author"
      className="mt-16 p-4 mb-8 flex flex-col justify-center items-center"
    >
      <h1 className="mb-10 text-2xl font-semibold sm:text-3xl md:text-4xl relative z-40">
        Top Authors
        <span className="absolute left-[35%] right-0 bottom-[-0.7rem] w-[30%] h-1 bg-gray-400 rounded"></span>
      </h1>
      <div className="flex felx-row text-4xl mb-10 gap-12 text-gray-400">
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
        {Authors.map((author) => (
          <Link to={`/books?query=${author.name}`} key={author.name}>
            <div className="w-64 flex flex-col mb-8 ">
              <img
                className="h-72 rounded-sm shadow-sm"
                src={author.image}
                alt=""
              />

              <div className="w-full h-16 flex justify-center items-center bg-[#e6e6e6] shadow-lg rounded-sm">
                <h1 className="font-semibold text-gray-700 md:text-lg tracking-wider">
                  {author.name}
                </h1>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Author;
