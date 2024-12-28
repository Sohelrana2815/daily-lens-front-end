import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const ArticlesDetails = () => {
  const { id } = useParams(); // Get the article ID from the URL
  const [article, setArticle] = useState(null);

  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const fetchArticleDetails = async () => {
      try {
        // Increment view count
        await axiosPublic.patch(`/approvedArticles/${id}/view`);

        // Fetch the article details
        const response = await axiosPublic.get(`/approvedArticles/${id}`);
        setArticle(response.data);
      } catch (error) {
        console.error("Error fetching article details:", error);
      }
    };

    fetchArticleDetails();
  }, [axiosPublic, id]);

  if (!article) return <p>Loading...</p>;
  return (
    <div>
      <h1>{article.articleTitle}</h1>
      <img src={article.articleImage} alt="" />
      <p>{article.articleDescription}</p>
      <p>Views: {article.views}</p>
      <p>Published by: {article.publisherName}</p>
      <p>
        Tags:
        {article.articleTags.map((tag, index) => (
          <span key={index}> #{tag}</span>
        ))}
      </p>
      <p>{article.isPremium && "This is a premium article!"}</p>
    </div>
  );
};

export default ArticlesDetails;
