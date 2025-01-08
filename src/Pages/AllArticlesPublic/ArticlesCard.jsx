import { FaCrown } from "react-icons/fa";
import { Link } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
// import useUsers from "../../Hooks/useUsers";
import useUserHome from "../../Hooks/useUserHome";
import SkeletonWrapper from "../../Components/SkeletonWrapper/SkeletonWrapper";
import useLoading from "../../Hooks/useLoading";
import "react-loading-skeleton/dist/skeleton.css";

const ArticlesCard = ({ approvedArticle }) => {
  const skeletonLoading = useLoading();
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
  // const { allUsers } = useUsers();
  const { usersHome } = useUserHome(); // Get the users data for public

  // Find the current user's details

  const currentUser = usersHome?.find((u) => u.email === user?.email);

  // Check if the subscription is active

  const isSubscriptionActive = currentUser?.subscriptionPeriod
    ? new Date(currentUser.subscriptionPeriod) // Compare the current date with the subscription end date > new Date()
    : false;

  return (
    <>
      <div className="flex justify-center items-center py-8">
        <div
          className={`card w-full max-w-xs md:max-w-sm lg:max-w-md shadow-lg transition-transform transform hover:scale-105 relative ${
            isPremium
              ? "border-4 border-yellow-500"
              : "border bg-white dark:bg-gray-900"
          }`}
        >
          {/* Premium Badge */}
          {isPremium && (
            <p className="absolute top-2 right-2 flex items-center gap-1 text-sm font-medium text-gray-900 bg-yellow-500 py-1 px-2 rounded-lg shadow-md">
              Premium <FaCrown />
            </p>
          )}

          <SkeletonWrapper loading={skeletonLoading} width={360} height={200}>
            <figure className="h-48 overflow-hidden rounded-t-lg">
              <img
                src={articleImage}
                alt="Article Thumbnail"
                className="object-cover w-full h-full"
              />
            </figure>
          </SkeletonWrapper>
          <div className="card-body p-5 h-[300px]">
            <SkeletonWrapper loading={skeletonLoading} width={330} height={18}>
              <h2 className="card-title text-lg font-bold text-gray-800 dark:text-slate-300 truncate">
                {articleTitle}
              </h2>
            </SkeletonWrapper>
            <p className="text-sm text-gray-600 dark:text-slate-300">
              <SkeletonWrapper
                loading={skeletonLoading}
                width={100}
                height={15}
              >
                {publisherName}
              </SkeletonWrapper>
            </p>
            <SkeletonWrapper
              loading={skeletonLoading}
              width={300}
              height={10}
              count={3}
            >
              <p className="text-gray-700 mt-2 dark:text-slate-100">
                {articleDescription.slice(0, 80)}{" "}
                <span className="text-blue-600 cursor-pointer dark:text-blue-400">
                  read more...
                </span>
              </p>
            </SkeletonWrapper>
            <div className="card-actions mt-4 flex justify-between">
              <Link to={`/articlesDetails/${_id}`}>
                <SkeletonWrapper
                  loading={skeletonLoading}
                  width={120}
                  height={25}
                >
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
                </SkeletonWrapper>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArticlesCard;
