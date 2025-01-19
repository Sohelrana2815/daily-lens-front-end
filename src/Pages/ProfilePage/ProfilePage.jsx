import { Link } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";

const ProfilePage = () => {
  const { user } = useAuth(); // Fetch user data from AuthProvider

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-8 w-full max-w-md">
          {/* Header */}
          <h1 className="text-3xl font-extrabold mb-6 text-center text-blue-600 dark:text-blue-400 font-volKHob">
            User Profile
          </h1>

          {/* Profile Info */}
          <div className="flex flex-col items-center mb-6">
            {/* Profile Image */}
            <img
              src={user.photoURL || "https://via.placeholder.com/150"}
              alt="Profile"
              className="w-28 h-28 rounded-full object-cover mb-4 border-4 border-blue-500 dark:border-blue-400 shadow-lg"
            />
            {/* Display Name */}
            <p className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
              {user.displayName || "No Name Provided"}
            </p>
            {/* Email */}
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {user.email || "No Email Available"}
            </p>
          </div>

          {/* Edit Profile Button */}
          <Link to="/editProfile">
            <button className="w-full bg-blue-500 hover:bg-blue-600 dark:bg-blue-400 dark:hover:bg-blue-500 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 shadow-md">
              Edit Profile
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
