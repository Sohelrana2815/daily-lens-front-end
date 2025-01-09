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

  const handleLimitChange = (event) => {
    const newLimit = parseInt(event.target.value, 10);
    setLimit(newLimit);
    setPage(1); // Reset to first page whenever limit changes
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
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
        {/* Select options */}
        <div className="flex flex-wrap items-center justify-end gap-4 p-7">
          <label
            htmlFor="limit"
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Articles Per Page:
          </label>

          <select
            value={limit}
            onChange={handleLimitChange}
            id="limit"
            className="w-32 md:w-40 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm text-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300"
          >
            <option value={3}>3</option>
            <option value={6}>6</option>
            <option value={9}>9</option>
            <option value={12}>12</option>
            <option value={15}>15</option>
            <option value={18}>18</option>
          </select>
        </div>

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

        <div className="flex flex-wrap items-center justify-center  gap-2 mt-10">
          {/* Previous button */}
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className="btn dark:text-white dark:bg-gray-900 btn-sm dark:hover:border-primary"
          >
            <FaAngleLeft />
          </button>

          {/* Dynamic Page Buttons */}

          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`btn btn-sm dark:text-white ${
                currentPage === index + 1
                  ? "btn-active btn-info"
                  : "btn-outline border-none"
              }`}
            >
              {index + 1}
            </button>
          ))}

          {/* Next button */}

          <button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            className="btn dark:text-white dark:bg-gray-900 btn-sm dark:hover:border-primary"
          >
            <FaAngleRight />
          </button>

          {/* Articles per page selector */}
        </div>
      </div>
    </>
  );
};

export default AllArticlesAdmin;
