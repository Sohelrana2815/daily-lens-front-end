import { useEffect, useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const AllArticlesPublic = () => {
  const axiosPublic = useAxiosPublic();
  const [approvedArticles, setApprovedArticles] = useState([]);

  useEffect(() => {
    axiosPublic
      .get("/approvedArticles?status=approved")
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
      <div>
        {approvedArticles.map((approvedArticle) => (
          <ul key={approvedArticle._id}>{approvedArticle.articleTitle}</ul>
        ))}
      </div>
    </div>
  );
};

export default AllArticlesPublic;
