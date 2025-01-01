import ArticlesCard from "./ArticlesCard";
import useApprovedArticles from "../../Hooks/useApprovedArticles";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";

const AllArticlesPublic = () => {
  const { approvedArticles } = useApprovedArticles();

  return (
    <>
      <SectionTitle
        titleStyle="Explore"
        title="All Articles"
        subTitle="Discover the Stories and Insights That Matter Most."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  max-w-screen-2xl mx-auto gap-6">
        {approvedArticles.map((approvedArticle) => (
          <ArticlesCard
            key={approvedArticle._id}
            approvedArticle={approvedArticle}
          />
        ))}
      </div>
    </>
  );
};

export default AllArticlesPublic;
