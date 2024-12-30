import ArticlesCard from "./ArticlesCard";
import useApprovedArticles from "../../Hooks/useApprovedArticles";

const AllArticlesPublic = () => {
  const { approvedArticles } = useApprovedArticles();

  return (
    <div>
      <h2 className="text-center">
        Approved Articles: {approvedArticles.length}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {approvedArticles.map((approvedArticle) => (
          <ArticlesCard
            key={approvedArticle._id}
            approvedArticle={approvedArticle}
          />
        ))}
      </div>
    </div>
  );
};

export default AllArticlesPublic;
