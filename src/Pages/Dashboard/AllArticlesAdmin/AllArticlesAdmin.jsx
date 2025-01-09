import { useState } from "react";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useAllArticles from "../../../Hooks/useAllArticles";
import ArticlesCard from "./ArticlesCard";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const AllArticlesAdmin = () => {
  const [page, setPage] = useState(1); // State for current page
  const [limit, setLimit] = useState(3); // State for articles per page

  const { allArticles, currentPage, totalPages, refetch, isPending, error } =
    useAllArticles(page, limit);

  // Go to  Next page
  const handleNextPage = () => {
    if (currentPage < totalPages) setPage((prev) => prev + 1);
  };
  // Go to  Next page
  const handlePreviousPage = () => {
    if (currentPage > 1) setPage((prev) => prev - 1);
  };

  return (
    <>
      <SectionTitle
        titleStyle="Manage"
        title="Articles"
        subTitle="Review, Approve, or Decline Articles to Ensure Quality Content
"
      />
      <div className="dark:bg-gray-900 min-h-screen py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-screen-2xl mx-auto ">
          {isPending ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error loading articles</p>
          ) : (
            allArticles.map((article) => (
              <ArticlesCard
                key={article._id}
                article={article}
                refetch={refetch}
              />
            ))
          )}
        </div>

        {/*Pagination controls  */}

        <div className="flex justify-center dark:text-white mt-10">
          <button
            disabled={currentPage === 1}
            onClick={handlePreviousPage}
            className="btn btn-primary dark:text-white btn-sm"
          >
            <FaAngleLeft />
          </button>
          <p className="mx-4">
            Page {currentPage} of {totalPages}
          </p>
          <button
            disabled={currentPage === totalPages}
            onClick={handleNextPage}
            className="btn btn-secondary btn-sm dark:text-white"
          >
            <FaAngleRight />
          </button>
        </div>
      </div>
    </>
  );
};

export default AllArticlesAdmin;
