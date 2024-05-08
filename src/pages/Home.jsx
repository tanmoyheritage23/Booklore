import HeroSection from "../components/HeroSection";
import Author from "../components/Author";
import BookGenres from "../components/BookGenres";
import FeaturedBooks from "../components/FeatutedBooks";
import NewsletterSubscription from "../components/NewsletterSubscription";
import LoaderSpinner from "../components/UI/Loader";
import { useQuery } from "@tanstack/react-query";
import { fetchBooks } from "../http";
import Error from "../components/UI/error/Error";

const Home = () => {
  const {
    data: books,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["books"],
    queryFn: fetchBooks,
  });

  if (isPending) {
    return <LoaderSpinner message="Fetching Books..." />;
  }

  if (isError) {
    console.log(error);
    return <Error message="Error Fetching Books" />;
  }
  return (
    <>
      <HeroSection />
      <Author />
      <BookGenres />
      <FeaturedBooks books={books} />
      <NewsletterSubscription />
    </>
  );
};

export default Home;
