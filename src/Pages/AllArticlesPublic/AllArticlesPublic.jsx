import { useEffect, useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import ArticlesCard from "./ArticlesCard";

const AllArticlesPublic = () => {
  const axiosPublic = useAxiosPublic();
  const [approvedArticles, setApprovedArticles] = useState([]);

  useEffect(() => {
    axiosPublic
      .get("/approvedArticles")
      .then((response) => {
        setApprovedArticles(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [axiosPublic]);

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
