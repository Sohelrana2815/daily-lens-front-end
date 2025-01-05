import { FaCrown } from "react-icons/fa";
import { Link } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import useUsers from "../../Hooks/useUsers";

const ArticlesCard = ({ approvedArticle }) => {
  const {
    _id,
    publisherName,
    articleTitle,
    articleDescription,
    articleImage,
    articleTags,
    postedDate,
    status,
    authorName,
    authorEmail,
    authorPhoto,
    isPremium,
  } = approvedArticle;

  const { user } = useAuth(); // Get current logged-in user
  const { allUsers } = useUsers(); // Get all users data

  // Find the current user's details

  const currentUser = allUsers?.find((u) => u.email === user?.email);

  // Check if the subscription is active

  const isSubscriptionActive = currentUser?.subscriptionPeriod
    ? new Date(currentUser.subscriptionPeriod) // Compare the current date with the subscription end date > new Date()
    : false;

  return (
    <>
      <div className="flex justify-center items-center py-8">
        <div
          className={`card w-full max-w-xs md:max-w-sm lg:max-w-md shadow-lg transition-transform transform hover:scale-105 ${
            isPremium
              ? "border-4 border-yellow-500"
              : "border bg-white dark:bg-gray-900"
          }`}
        >
          <figure className="h-48 overflow-hidden rounded-t-lg">
            <img
              src={articleImage}
              alt="Article Thumbnail"
              className="object-cover w-full h-full"
            />
          </figure>
          <div className="card-body p-5 h-[300px]">
            <div className="flex items-center justify-between ">
              <h2 className="card-title text-lg font-bold text-gray-800 dark:text-slate-300">
                {articleTitle}
              </h2>
              {isPremium && (
                <>
                  <p className="badge dark:border-none text-slate-700 bg-yellow-500 text-sm p-2 dark:text-gray-900">
                    Premium
                    <span className="ml-1 text-gray-900  ">
                      <FaCrown />
                    </span>
                  </p>
                </>
              )}
            </div>
            <p className="text-sm text-gray-600 dark:text-slate-300">
              {publisherName}
            </p>
            <p className="text-gray-700 mt-2 dark:text-slate-100">
              {articleDescription.slice(0, 80)}{" "}
              <span className="text-blue-600 cursor-pointer dark:text-blue-400">
                read more...
              </span>
            </p>
            <div className="card-actions mt-4 flex justify-between">
              <Link to={`/articlesDetails/${_id}`}>
                <button
                  disabled={isPremium && !isSubscriptionActive} // Disable for premium articles without subscription
                  className={`w-full p-2 text-sm font-medium rounded-lg text-white transition-all duration-300 ${
                    isPremium && !isSubscriptionActive
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                  }`}
                >
                  View Details
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArticlesCard;
