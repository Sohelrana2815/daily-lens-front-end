import { useEffect } from "react";
import { useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { Link } from "react-router-dom";

const PremiumArticles = () => {
  const [premiumArticles, setPremiumArticles] = useState([]);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    axiosPublic
      .get("/premiumArticles")
      .then((response) => {
        setPremiumArticles(response.data);
      })
      .catch((error) => {
        console.error("Error Premium Articles Fetching Data", error);
      });
  }, [axiosPublic]);

  return (
    <>
      <div>
        {premiumArticles.map((premiumArticle) => (
          <div
            key={premiumArticle._id}
            className="card card-compact bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-white w-96 shadow-2xl border border-yellow-300"
          >
            <figure>
              <img
                src={premiumArticle.articleImage}
                alt="Shoes"
                className="rounded-t-lg"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title text-white">
                {premiumArticle.articleTitle}
              </h2>
              <p className="text-white">{premiumArticle.publisherName}</p>
              <p className="text-white">{premiumArticle.articleDescription}</p>
              <div className="card-actions justify-end">
                <Link to={`/articlesDetails/${premiumArticle._id}`}>
                  <button className="btn bg-yellow-700 hover:bg-yellow-800 border-none text-white">
                    Details
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default PremiumArticles;
