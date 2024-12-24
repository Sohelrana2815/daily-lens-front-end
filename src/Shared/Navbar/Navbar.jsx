import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import useTheme from "../../Hooks/useTheme";
import { LuSun } from "react-icons/lu";
import { GoMoon } from "react-icons/go";
import websiteLogo from "../../assets/Website logo/website logo.png";
import useAuth from "../../Hooks/useAuth";
const Navbar = () => {
  // auth

  const { user, signOutUser } = useAuth();

  // logout function

  const handleSignOut = () => {
    signOutUser();
  };

  const [open, setOpen] = useState(false);
  const { isDarkMode, toggleDarkMode } = useTheme();
  return (
    <div className="shadow-md fixed w-full z-10 top-0 left-0">
      <div className="lg:flex  items-center justify-between bg-white dark:bg-gray-900 dark:text-gray-300 py-6 lg:px-10 px-7">
        {/* Logo Section */}
        <div className="font-bold text-2xl cursor-pointer flex justify-center items-center font-[Poppins] text-gray-800 dark:text-white">
          <span className="text-3xl text-indigo-600 dark:text-indigo-400 mr-1 pt-2">
            <ion-icon name="logo-ionic"></ion-icon>
          </span>
          <div className="flex items-center gap-2">
            <img
              src={websiteLogo}
              className="w-10 xl:w-16 dark:bg-gray-300 rounded-full"
              alt="Logo"
            />
            <p>Daily Lens</p>
          </div>
        </div>

        {/* Menu Icon */}
        <div
          onClick={() => setOpen(!open)}
          className="text-3xl absolute left-8 top-6 cursor-pointer lg:hidden"
        >
          {open ? (
            <FiX className="dark:text-gray-300 text-gray-800" />
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
          <li className="lg:ml-8 lg:my-0 my-6">
            <NavLink
              to="/"
              className="hover:text-indigo-600 dark:hover:text-indigo-400 duration-500"
              onClick={() => setOpen(false)}
            >
              HOME
            </NavLink>
          </li>
          <li className="lg:ml-8 lg:my-0 my-6">
            <NavLink
              to="/addArticles"
              className="hover:text-indigo-600 dark:hover:text-indigo-400 duration-500"
              onClick={() => setOpen(false)}
            >
              Add Articles
            </NavLink>
          </li>
          <li className="lg:ml-8  lg:my-0 my-6">
            <NavLink
              to="/allArticles"
              className="hover:text-indigo-600 dark:hover:text-indigo-400 duration-500"
              onClick={() => setOpen(false)}
            >
              All Articles
            </NavLink>
          </li>
          <li className="lg:ml-8 lg:my-0 my-6">
            <NavLink
              to="/subscriptions"
              className="hover:text-indigo-600 dark:hover:text-indigo-400 duration-500"
              onClick={() => setOpen(false)}
            >
              Subscriptions
            </NavLink>
          </li>
          <li className="lg:ml-8 lg:my-0 my-6">
            <NavLink
              to="/dashboard"
              className="hover:text-indigo-600 dark:hover:text-indigo-400 duration-500"
              onClick={() => setOpen(false)}
            >
              Dashboard
            </NavLink>
          </li>
          {user ? (
            <div className="dropdown lg:dropdown-end">
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
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
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

          <div className="ml-3">
            {isDarkMode ? (
              <button
                onClick={toggleDarkMode}
                className="btn btn-sm btn-warning"
              >
                <LuSun />
              </button>
            ) : (
              <button
                onClick={toggleDarkMode}
                className="btn btn-sm btn-primary"
              >
                <GoMoon />
              </button>
            )}
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
