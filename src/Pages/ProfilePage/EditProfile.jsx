import { useState } from "react";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";

const EditProfile = () => {
  const { user, updateUserProfile } = useAuth(); // use the auth hook to access user data and methods
  const [name, setName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");

  const handleUpdateProfile = (e) => {
    e.preventDefault();

    updateUserProfile(name, photoURL)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Profile Update!",
          text: "Your profile has been updated successfully.",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: error.message,
        });
      });
  };

  return (
    <>
      <div className="flex flex-col items-center min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
        {/* Header Section */}
        <div className="text-center py-8">
          <h1 className="text-4xl font-extrabold text-gray-800 dark:text-white">
            Update Your Profile
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Keep your information up-to-date for a seamless experience.
          </p>
        </div>

        {/* Content Section */}
        <div className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          {/* Current Profile Section */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center">
              {/* Current Photo */}
              <img
                src={user?.photoURL || "https://via.placeholder.com/150"}
                alt="User Avatar"
                className="w-28 h-28 rounded-full border-4 border-blue-500 dark:border-blue-400 object-cover shadow-lg"
              />
              {/* Current Display Name */}
              <h3 className="mt-4 text-2xl font-semibold text-gray-800 dark:text-gray-100">
                {user?.displayName || "No Display Name"}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {user?.email || "No Email Available"}
              </p>
            </div>
          </div>

          {/* Update Profile Form */}
          <form
            onSubmit={handleUpdateProfile}
            className="space-y-6 transition-all duration-300"
          >
            {/* Display Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-600 dark:text-gray-300"
              >
                Display Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter new display name"
                className="w-full px-4 py-3 mt-2 border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            {/* Photo URL */}
            <div>
              <label
                htmlFor="photoURL"
                className="block text-sm font-medium text-gray-600 dark:text-gray-300"
              >
                Photo URL
              </label>
              <input
                type="text"
                id="photoURL"
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
                placeholder="Enter new photo URL"
                className="w-full px-4 py-3 mt-2 border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-600 dark:hover:bg-blue-700 transition duration-300 shadow-lg"
            >
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
