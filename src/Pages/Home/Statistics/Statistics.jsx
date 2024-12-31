import CountUp from "react-countup";
import useUsers from "../../../Hooks/useUsers";
import { FcGlobe } from "react-icons/fc";
import { FaCrown, FaUsers } from "react-icons/fa";
import user1 from "../../../assets/Total users/user1.webp";
import user2 from "../../../assets/Total users/user2.webp";
import user3 from "../../../assets/Total users/user3.webp";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import StarRatings from "react-star-ratings";

const Statistics = () => {
  const ratingChanged = (newRating) => {
    console.log(newRating);
  };

  const { allUsers } = useUsers();

  // Filter users into normal and premium

  // 1. Normal Users
  const normalUsers = allUsers.filter(
    (user) => user.subscriptionPeriod === null
  ).length;

  //  2. Premium Users

  const premiumUsers = allUsers.filter(
    (user) => user.subscriptionPeriod !== null
  ).length;

  const totalUsers = allUsers.length;

  return (
    <>
      <SectionTitle
        titleStyle="User"
        title="Insights"
        subTitle="A closer look at our growing community"
      />
      <div className="max-w-screen-xl mx-auto my-36">
        {/* Stats Section */}
        <div className="stats stats-vertical dark:bg-gray-800 dark:text-gray-200 lg:stats-horizontal shadow p-8">
          {/* Total Users */}
          <div className="stat">
            <div className="stat-title bg-[#E5E4E2] rounded-lg px-8 py-1 relative">
              <p className="text-[#555555] font-medium">Total Users</p>
              <p className="absolute bottom-1/4 right-2 md:text-lg">
                <FcGlobe />
              </p>
            </div>
            <div className="stat-value text-4xl font-bold">
              <CountUp end={totalUsers} duration={2} separator="," />
            </div>
            <div className="stat-desc dark:text-gray-200">
              Jan 1st - Feb 1st
            </div>
          </div>

          {/* Premium Users */}
          <div className="stat">
            <div className="stat-title bg-[#F3C623] rounded-lg px-8 py-1 relative">
              <p className="text-[#10375C]">Premium Users</p>
              <p className="absolute bottom-1/4 right-2 md:text-lg">
                <FaCrown />
              </p>
            </div>
            <div className="stat-value text-4xl font-bold">
              <CountUp end={premiumUsers} duration={2} separator="," />
            </div>
            <div className="stat-desc dark:text-gray-200">
              ↗︎ <CountUp end={400} duration={1.5} separator="," /> (22%)
            </div>
          </div>

          {/* Normal Users */}
          <div className="stat">
            <div className="stat-title bg-slate-400 px-8 py-1 rounded-lg relative">
              <p className="text-[#FFFDF0]">Normal Users</p>
              <p className="absolute bottom-1/4 right-2">
                <FaUsers className="text-[#FFFDF0] md:text-lg" />
              </p>
            </div>
            <div className="stat-value text-4xl font-bold">
              <CountUp end={normalUsers} duration={2} separator="," />
            </div>
            <div className="stat-desc dark:text-gray-200">
              ↘︎ <CountUp end={90} duration={1.5} separator="," /> (14%)
            </div>
          </div>
        </div>

        <SectionTitle
          titleStyle="Happy"
          title="Readers"
          subTitle="Voices of trust from our satisfied audience."
        />

        {/* User Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8">
          {/* Card 1 */}
          <div className="border rounded-lg shadow-md p-4 flex flex-col items-center">
            <img src={user1} alt="User" className="w-56 rounded-full mb-4" />
            <h3 className="text-xl font-bold mb-2">
              Meet John Doe: A Journalist’s Journey
            </h3>
            <p className="text-gray-600 text-sm mb-4 dark:text-gray-300">
              From writing community stories to covering major events.
            </p>
            <div className="flex flex-col space-y-4">
              <button className="border border-indigo-500 text-indigo-500 px-4 py-1 rounded hover:bg-indigo-500 dark:text-gray-200 hover:text-white">
                View Profile
              </button>
              <button className="border border-green-500 text-green-500 px-4 py-1 rounded hover:bg-green-500 hover:text-white">
                Send Feedback
              </button>
              {/* Rating */}
              <div className="rating-container">
                <StarRatings
                  rating={3.5} // Default value
                  starRatedColor="#ffd700"
                  starDimension="40px"
                  starSpacing="5px"
                  changeRating={ratingChanged}
                  numberOfStars={5}
                  name="rating"
                />
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="border rounded-lg shadow-md p-4 flex flex-col items-center">
            <img src={user2} alt="User" className="w-56 rounded-full mb-4" />
            <h3 className="text-xl font-bold mb-2">
              Spotlight: Sarah Williams
            </h3>
            <p className="text-gray-600 text-sm mb-4 dark:text-gray-300">
              How a small-town blogger became a published author.
            </p>
            <div className="flex flex-col space-y-4">
              <button className="border border-indigo-500 text-indigo-500 px-4 py-1 rounded hover:bg-indigo-500 dark:text-gray-200 hover:text-white">
                View Profile
              </button>
              <button className="border border-green-500 text-green-500 px-4 py-1 rounded hover:bg-green-500 hover:text-white">
                Send Feedback
              </button>
              {/* Rating */}
              <div className="rating-container">
                <StarRatings
                  rating={4} // Default value
                  starRatedColor="#ffd700"
                  starDimension="40px"
                  starSpacing="5px"
                  changeRating={ratingChanged}
                  numberOfStars={5}
                  name="rating"
                />
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="border rounded-lg shadow-md p-4 flex flex-col items-center">
            <img src={user3} alt="User" className="w-56 rounded-full mb-4" />
            <h3 className="text-xl font-bold mb-2">
              Reader Spotlight: Alex Johnson
            </h3>
            <p className="text-gray-600 text-sm mb-4 dark:text-gray-300">
              Sharing thoughts on modern journalism and media trends.
            </p>
            <div className="flex flex-col space-y-4">
              <button className="border dark:text-gray-200 border-indigo-500 text-indigo-500 px-4 py-1 rounded hover:bg-indigo-500 hover:text-white">
                View Profile
              </button>
              <button className="border border-green-500 text-green-500 px-4 py-1 rounded hover:bg-green-500  hover:text-white">
                Send Feedback
              </button>
              {/* Rating */}
              <div className="rating-container">
                <StarRatings
                  rating={3} // Default value
                  starRatedColor="#ffd700"
                  starDimension="40px"
                  starSpacing="5px"
                  changeRating={ratingChanged}
                  numberOfStars={5}
                  name="rating"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Statistics;
