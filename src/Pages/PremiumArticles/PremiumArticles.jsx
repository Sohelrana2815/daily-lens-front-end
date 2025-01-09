import { useEffect } from "react";
import { useState } from "react";
// import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import useUserHome from "../../Hooks/useUserHome";

const PremiumArticles = () => {
  const [premiumArticles, setPremiumArticles] = useState([]);
  // const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth(); // Get current logged-in user
  const { usersHome } = useUserHome(); // Get the users data for public
  // Find the current user's details

  const currentUser = usersHome?.find((u) => u.email === user?.email);

  // Check if the subscription is active

  const isSubscriptionActive = currentUser?.subscriptionPeriod
    ? new Date(currentUser.subscriptionPeriod) // Compare the current date with the subscription end date > new Date()
    : false;

  useEffect(() => {
    axiosSecure
      .get("/premiumArticles")
      .then((response) => {
        setPremiumArticles(response.data);
      })
      .catch((error) => {
        console.error("Error Premium Articles Fetching Data", error);
      });
  }, [axiosSecure]);

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-sm md:max-w-screen-2xl mx-auto p-4">
        {premiumArticles.map((premiumArticle) => (
          <div
            key={premiumArticle._id}
            className="card card-compact bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 shadow-2xl border border-yellow-300 relative overflow-hidden rounded-lg transition-transform transform hover:scale-105 hover:shadow-3xl"
          >
            {/* Premium Badge */}
            <div className="absolute top-3 right-3 bg-yellow-800 text-white text-xs font-bold px-4 py-1 rounded-full shadow-md">
              PREMIUM
            </div>

            {/* Article Image */}
            <figure>
              <img
                src={premiumArticle.articleImage}
                alt="Premium Article"
                className="rounded-t-lg h-64 object-cover w-full"
              />
            </figure>

            {/* Article Details */}
            <div className="card-body p-5 space-y-4">
              <h2 className="card-title text-slate-900 text-lg font-bold">
                {premiumArticle.articleTitle}
              </h2>
              <p className="text-sm italic text-gray-900">
                By: {premiumArticle.publisherName}
              </p>
              <p className="text-gray-800 text-sm leading-relaxed ">
                {premiumArticle.articleDescription}
              </p>
              <div className="card-actions justify-end">
                {premiumArticle?.isPremium && !isSubscriptionActive ? (
                  <button
                    disabled
                    className="btn dark:bg-stone-400 cursor-not-allowed border-none  rounded-full px-8 py-2 text-sm shadow-md"
                  >
                    View Details
                  </button>
                ) : (
                  <Link to={`/articlesDetails/${premiumArticle._id}`}>
                    <button className="btn bg-yellow-800 hover:bg-yellow-900 border-none text-white rounded-full px-8 py-2 text-sm shadow-md">
                      View Details
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default PremiumArticles;
