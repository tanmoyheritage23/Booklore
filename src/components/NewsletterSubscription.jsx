import React from "react";

const NewsletterSubscription = () => {
  return (
    <div className="mt-16 flex flex-col justify-center items-center mb-16">
      <div className="p-8 text-center">
        <h2 className="text-xl font-bold mb-4 md:text-2xl">
          Subscribe to our newsletter to get updates on our latest collection
        </h2>
        <p className="text-gray-500 font-medium md:text-xl">
          Get 20% off on your first order by subscribing to our newsletter
        </p>
      </div>

      <form className="flex flex-col sm:flex-row gap-4">
        <input
          type="email"
          placeholder="Enter your email"
          className="p-2 px-4 w-72 border-[1px] border-gray-600 rounded md:w-80"
          required
        />
        <button
          type="submit"
          className="bg-black text-white py-2 px-4 rounded-md hover:bg-teal-500 transition-colors duration-300"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default NewsletterSubscription;
