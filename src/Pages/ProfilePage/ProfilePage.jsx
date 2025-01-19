import { Link } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";

const ProfilePage = () => {
  const { user } = useAuth(); // Fetch user data from AuthProvider

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center text-blue-600">
            User Profile
          </h1>
          <div className="flex flex-col items-center mb-6">
            <img
              src={user.photoURL || "https://via.placeholder.com/150"}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover mb-4 border border-gray-300"
            />
            <p className="text-lg font-semibold text-gray-700 mb-2">
              {user.displayName || "No Name Provided"}
            </p>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
          <Link to="/editProfile">
            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md font-semibold transition duration-200">
              Edit Profile
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
