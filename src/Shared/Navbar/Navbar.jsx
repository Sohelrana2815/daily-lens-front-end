import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import useTheme from "../../Hooks/useTheme";
import { LuSun } from "react-icons/lu";
import { GoMoon } from "react-icons/go";
import websiteLogo from "../../assets/Website logo/website logo.png";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import useAdmin from "../../Hooks/useAdmin";

const Navbar = () => {
  const [isAdmin, adminLoading] = useAdmin();
  const { user, signOutUser, loading } = useAuth();
  const [open, setOpen] = useState(false);
  const { isDarkMode, toggleDarkMode } = useTheme();

  // logout function

  const handleSignOut = () => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout",
    }).then((result) => {
      if (result.isConfirmed) {
        signOutUser();
        Swal.fire({
          title: `${user.displayName} Logged out!`,
          icon: "success",
        });
      }
    });
  };
  // console.log("Admin Status in Navbar:", { isAdmin, adminLoading });
  if (adminLoading || loading) {
    return <span className="loading loading-bars loading-lg"></span>;
  }
  return (
    <>
      <div className="shadow-md fixed w-full z-10 top-0  left-0">
        <div className="lg:flex  items-center justify-around bg-white dark:bg-gray-900 dark:text-gray-300 py-6 lg:px-10 px-7">
          {/* Logo Section */}
          <div className="font-bold text-2xl cursor-pointer flex justify-center items-center font-[Poppins] text-gray-800 dark:text-white ">
            <span className="text-3xl text-indigo-600 dark:text-indigo-400 mr-1 pt-2 ">
              <ion-icon name="logo-ionic"></ion-icon>
            </span>
            <div className="flex items-center gap-2">
              <img
                src={websiteLogo}
                className="w-10 xl:w-16 dark:bg-gray-300 rounded-full xl:p-2"
                alt="Logo"
              />
              <Link to="/">
                <p className="hover:text-indigo-500">Daily Lens</p>
              </Link>
            </div>
          </div>

          {/* Menu Icon */}

          <div
            onClick={() => setOpen(!open)}
            className="text-3xl absolute left-8 top-6 cursor-pointer lg:hidden"
          >
            {/* close and open icon navbar */}
            {open ? (
              <FiX className="dark:text-red-600 text-red-600" />
            ) : (
              <FiMenu className="dark:text-gray-300 text-gray-800" />
            )}
          </div>

          {/* Navigation Links */}
          <ul
            className={`lg:flex lg:items-center lg:pb-0 pb-12 absolute lg:static lg:bg-white bg-base-200 dark:bg-gray-800 lg:dark:bg-gray-900 text-gray-800 dark:text-gray-300 lg:z-auto z-[-1] left-0 w-full lg:w-auto lg:pl-0 pl-9 transition-all duration-500 ease-in ${
              open ? "top-20 " : "top-[-490px]"
            }`}
          >
            {/* Home */}
            <li className="lg:ml-8 lg:my-0 my-6">
              <NavLink
                to="/"
                className="hover:text-indigo-600 dark:hover:text-indigo-400 duration-500"
                onClick={() => setOpen(false)}
              >
                HOME
              </NavLink>
            </li>
            {/* Add Articles (Private route) */}
            {user && (
              <li className="lg:ml-8 lg:my-0 my-6">
                <NavLink
                  to="/addArticles"
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 duration-500"
                  onClick={() => setOpen(false)}
                >
                  Add Articles
                </NavLink>
              </li>
            )}
            {/* All Articles (Public) */}
            <li className="lg:ml-8  lg:my-0 my-6">
              <NavLink
                to="/allArticles"
                className="hover:text-indigo-600 dark:hover:text-indigo-400 duration-500"
                onClick={() => setOpen(false)}
              >
                All Articles
              </NavLink>
            </li>
            {/* My Articles (Private route) */}
            {user && (
              <li className="lg:ml-8  lg:my-0 my-6">
                <NavLink
                  to="/myArticles"
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 duration-500"
                  onClick={() => setOpen(false)}
                >
                  My Articles
                </NavLink>
              </li>
            )}
            {/*subscription (Private route)  */}
            {user && (
              <li className="lg:ml-8 lg:my-0 my-6">
                <NavLink
                  to="/subscriptions"
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 duration-500"
                  onClick={() => setOpen(false)}
                >
                  Subscriptions
                </NavLink>
              </li>
            )}

            {/* Dashboard (private route) */}
            {isAdmin && (
              <li className="lg:ml-8 lg:my-0 my-6">
                <NavLink
                  to="/dashboard/analytics"
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 duration-500"
                  onClick={() => setOpen(false)}
                >
                  Dashboard
                </NavLink>
              </li>
            )}
            {/* Premium Articles (private and premium user only) */}
            <li className="lg:ml-8 lg:my-0 my-6">
              <NavLink
                to="/premiumArticles"
                className="hover:text-indigo-600 dark:hover:text-indigo-400 duration-500"
                onClick={() => setOpen(false)}
              >
                Premium Articles
              </NavLink>
            </li>
            {/* Dark mode */}
            <label className="flex items-center cursor-pointer gap-4 p-2 rounded-md transition duration-300 lg:ml-8">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={isDarkMode}
                  onChange={toggleDarkMode}
                  className="sr-only" // Hides the input for better visuals
                />
                <div
                  className={`w-10 h-5 rounded-full ${
                    isDarkMode ? "bg-yellow-500" : "bg-gray-400"
                  } transition-colors duration-300`}
                ></div>
                <div
                  className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                    isDarkMode ? "translate-x-5" : ""
                  }`}
                ></div>
              </div>
              <span className="text-gray-700 dark:text-gray-300">
                {isDarkMode ? (
                  <LuSun className="text-xl lg:text-2xl text-yellow-400" />
                ) : (
                  <GoMoon className="text-xl lg:text-2xl text-gray-800" />
                )}
              </span>
            </label>

            {user ? (
              <div className="dropdown lg:dropdown-end lg:ml-8">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                  title={user?.displayName}
                >
                  <div className="w-10 rounded-full">
                    <img alt={user?.displayName} src={user?.photoURL} />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content dark:bg-gray-900 bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                >
                  <li>
                    <a className="justify-between">
                      Profile
                      <span className="badge">New</span>
                    </a>
                  </li>
                  <li>
                    <a>Settings</a>
                  </li>
                  <li>
                    <a onClick={handleSignOut}>Logout</a>
                  </li>
                </ul>
              </div>
            ) : (
              <>
                <li className="lg:ml-8 lg:my-0 my-6">
                  <NavLink
                    to="/signIn"
                    className="hover:text-indigo-600 dark:hover:text-indigo-400 duration-500"
                    onClick={() => setOpen(false)}
                  >
                    Sign in
                  </NavLink>
                </li>
                <li className="lg:ml-8 lg:my-0 my-6">
                  <NavLink
                    to="/signUp"
                    className="hover:text-indigo-600 dark:hover:text-indigo-400 duration-500"
                    onClick={() => setOpen(false)}
                  >
                    Sign up
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
