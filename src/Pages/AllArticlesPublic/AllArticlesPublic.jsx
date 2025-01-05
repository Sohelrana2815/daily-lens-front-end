import ArticlesCard from "./ArticlesCard";
import useApprovedArticles from "../../Hooks/useApprovedArticles";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import { useEffect, useState } from "react";

const AllArticlesPublic = () => {
  const { approvedArticles } = useApprovedArticles();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredArticles, setFilteredArticles] = useState(approvedArticles);

  // Handle search functionality

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setFilteredArticles(approvedArticles); // if search input is empty, show all articles
      return;
    }

    // Filter articles based on search term

    const filtered = approvedArticles.filter((article) =>
      article.articleTitle.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredArticles(filtered);
  };

  // Trigger search when user presses Enter key

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Update filtered articles when approvedArticles or searchTerm changes

  useEffect(() => {
    setFilteredArticles(approvedArticles);
  }, [approvedArticles, searchTerm]);

  return (
    <>
      <SectionTitle
        titleStyle="Explore"
        title="All Articles"
        subTitle="Discover the Stories and Insights That Matter Most."
      />
      {/* Search Bar */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search articles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyPress}
          className="px-4 py-2 border border-gray-300 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:text-gray-950"
        />
        <button
          onClick={handleSearch}
          className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Search
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  max-w-screen-2xl mx-auto gap-6">
        {filteredArticles.length > 0 ? (
          filteredArticles.map((article) => (
            <ArticlesCard key={article._id} approvedArticle={article} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No articles found for &quot;{searchTerm}&quot;.
          </p>
        )}
      </div>
    </>
  );
};

export default AllArticlesPublic;
