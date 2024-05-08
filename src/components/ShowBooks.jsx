import { useState } from "react";
import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";

const ShowBooks = ({ books, pageName }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter books based on the search term
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="h-[120vh] w-full grid place-items-center">
      <div className="w-[90%] pt-20 flex flex-row justify-between items-center">
        {/* Breadcrumb */}
        <div className="p-2 rounded flex flex-row items-center sm:text-lg before:w-2 before:h-4 before:bg-slate-600 before:mr-2 bg-[#e6e6e6]">
          <p className="font-medium text-slate-500 mr-2 cursor-pointer">Home</p>
          <FaChevronRight className="mt-1 text-slate-400 mr-2" />
          <p className="font-semibold text-slate-600 cursor-pointer">
            {pageName}
          </p>
        </div>

        {/* Search input */}
        <div className="p-4 w-60 h-10 flex flex-row items-center border-[1px] border-gray-700 rounded sm:w-80 hover:bg-gray-100 hover:border-gray-800">
          <img
            className="h-4 w-4 sm:h-5 sm:w-5 mr-2"
            src="https://cdn-icons-png.flaticon.com/128/54/54481.png"
            alt="search"
          />
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearchChange}
            className="font-semibold h-10 bg-transparent border-none outline-none"
          />
        </div>
      </div>

      {/* Display filtered books */}
      <div className="w-4/5 mt-8 mb-16 grid grid-flow-col gap-10 place-items-center overflow-x-auto overscroll-contain scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 scrollbar-thumb-rounded-full scrollbar-track-rounded-full cursor-pointer">
        {filteredBooks.map((book) => (
          <div className="w-52 flex flex-col mb-8" key={book._id}>
            {/* Book image */}
            <img
              className="h-60 w-full rounded-sm shadow-sm"
              src={`https://bookstore-api-lrop.onrender.com/uploads/images/${book.imageURL}`}
              alt=""
            />
            <div className="w-full flex flex-row justify-between items-center">
              <div className="mt-2 flex flex-col">
                {/* Book title */}
                <h1 className="font-semibold text-gray-700 text-base">
                  {book.title.length > 20
                    ? book.title.slice(0, 12) + "..."
                    : book.title}
                </h1>
                {/* Book price */}
                <p className="font-bold text-base ">
                  <span className="text-base font-bold text-gray-600 ">$</span>
                  {` ${book.price}`}
                </p>
              </div>
              {/* Link to order page */}
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

export default ShowBooks;
