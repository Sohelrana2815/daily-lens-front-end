import useAllArticles from "../../../Hooks/useAllArticles";
import ArticlesCard from "./ArticlesCard";

const AllArticlesAdmin = () => {
  const { allArticles, refetch, isPending, error } = useAllArticles();

  return (
    <div>
      <h2>{allArticles.length}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allArticles.map((article) => (
          <ArticlesCard key={article._id} article={article} />
        ))}
      </div>
    </div>
  );
};

export default AllArticlesAdmin;
