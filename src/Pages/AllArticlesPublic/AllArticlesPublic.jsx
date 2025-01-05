import ArticlesCard from "./ArticlesCard";
import useApprovedArticles from "../../Hooks/useApprovedArticles";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import { useEffect, useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoFilter } from "react-icons/io5";
const AllArticlesPublic = () => {
  const { approvedArticles } = useApprovedArticles(); // Custom hook to fetch articles
  const [searchTerm, setSearchTerm] = useState(""); // Search input
  const [filteredArticles, setFilteredArticles] = useState(approvedArticles); // Filtered articles

  const [selectedPublisher, setSelectedPublisher] = useState(""); // Publisher filter
  const [selectedTags, setSelectedTags] = useState([]); // Tags filter

  // Extract unique publishers and tags
  const publishers = Array.from(
    new Set(approvedArticles.map((article) => article.publisherName))
  );

  const tags = Array.from(
    new Set(approvedArticles.flatMap((article) => article.articleTags))
  );

  // Apply filters whenever dependencies change
  useEffect(() => {
    const applyFilters = () => {
      let filtered = approvedArticles;

      // Filter by search term
      if (searchTerm.trim()) {
        filtered = filtered.filter((article) =>
          article.articleTitle.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      // Filter by publisher
      if (selectedPublisher) {
        filtered = filtered.filter(
          (article) => article.publisherName === selectedPublisher
        );
      }

      // Filter by tags
      if (selectedTags.length > 0) {
        filtered = filtered.filter((article) =>
          selectedTags.every((tag) => article.articleTags.includes(tag))
        );
      }

      setFilteredArticles(filtered);
    };

    applyFilters();
  }, [approvedArticles, searchTerm, selectedPublisher, selectedTags]);

  // Handle tag selection toggle
  const handleTagToggle = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  // Search on Enter key
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      // Trigger filter application (already happens via useEffect)
    }
  };

  return (
    <>
      <div>
        <SectionTitle
          titleStyle="Explore"
          title="All Articles"
          subTitle="Discover the Stories and Insights That Matter Most."
        />

        {/* Search Bar */}

        <div className="max-w-screen-2xl mx-auto flex justify-end p-4 ">
          {/* Search Bar */}
          <div className="relative md:w-1/2 w-full">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyPress}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 w-full dark:text-gray-950"
            />
            <p className="absolute top-3 right-3 dark:text-gray-950">
              <FaMagnifyingGlass />
            </p>
          </div>
        </div>

        <div className="max-w-screen-2xl flex lg:flex-row-reverse mx-auto items-center justify-between border border-primary-100 dark:border-gray-800 p-4 rounded-lg mb-4">
          {/* Tags Filter */}
          <div className="flex flex-col gap-4 lg:gap-0 lg:w-1/2">
            <label className="font-medium flex items-center gap-2 font-volKHob text-gray-800 dark:text-gray-200">
              <IoFilter className="md:text-lg xl:text-xl" />
              Filter by Tags:
            </label>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <label key={tag} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={tag}
                    checked={selectedTags.includes(tag)}
                    onChange={() => handleTagToggle(tag)}
                  />
                  {tag}
                </label>
              ))}
            </div>
          </div>

          {/* Publisher Filter */}

          <div className="flex flex-col gap-4 lg:gap-0 lg:w-1/3">
            <select
              value={selectedPublisher}
              onChange={(e) => setSelectedPublisher(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:text-gray-950"
            >
              <option value="">All Publishers</option>
              {publishers.map((publisher) => (
                <option key={publisher} value={publisher}>
                  {publisher}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-screen-2xl mx-auto gap-6">
          {filteredArticles.length > 0 ? (
            filteredArticles.map((article) => (
              <ArticlesCard key={article._id} approvedArticle={article} />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No articles found.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default AllArticlesPublic;
