import { useEffect, useState } from "react";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import ArticlesCard from "./ArticlesCard";

const AllArticlesAdmin = () => {
  const [articles, setArticles] = useState([]);

  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    axiosPublic
      .get("/articles")
      .then((response) => {
        setArticles(response.data);
      })
      .catch((error) => {
        console.error("Error while fetching data: ", error);
      });
  }, [axiosPublic]);

  return (
    <div>
      <h2>{articles.length}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <ArticlesCard key={article._id} article={article} />
        ))}
      </div>
    </div>
  );
};

export default AllArticlesAdmin;
