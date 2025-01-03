import { GoMoon } from "react-icons/go";
import { LuSun } from "react-icons/lu";
import { Link, NavLink, Outlet } from "react-router-dom";
import useTheme from "../../Hooks/useTheme";
import websiteLogo from "../../assets/Website logo/website logo.png";
const Dashboard = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  const navLinks = (
    <>
      <li>
        <NavLink to="/dashboard/allUsers">All Users</NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/allArticles">All Articles</NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/addPublisher">Add Publisher</NavLink>
      </li>

      {/* Shared navLinks */}
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
    </>
  );

  return (
    <>
      {/* Dark mode */}
      <div className="relative">
        <label className="flex items-center cursor-pointer gap-4 p-2 rounded-md transition duration-300 lg:ml-8 absolute z-10 left-80 top-4 md:left-60">
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
      </div>
      {/* drawer */}

      <div className="drawer ">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          {/* Navbar */}
          <div className="navbar bg-base-300 w-full dark:bg-gray-800 dark:text-gray-300">
            <div className="flex-none lg:hidden">
              <label
                htmlFor="my-drawer-3"
                aria-label="open sidebar"
                className="btn btn-square btn-ghost"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block h-6 w-6 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>
            <div className="mx-2 flex-1 px-2">
              <Link to="/" className="flex items-center gap-x-4">
                <img
                  src={websiteLogo}
                  className="w-12 justify-center dark:bg-gray-400 rounded-full"
                  alt=""
                />

                <p>Daily Lens</p>
              </Link>
            </div>
            <div className="hidden flex-none lg:block">
              <ul className="menu menu-horizontal">
                {/* Navbar menu content here */}
                {navLinks}
              </ul>
            </div>
          </div>
          {/* Page content here */}
          <div className="dark:bg-black">
            <Outlet />
          </div>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-3"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 min-h-full w-80 p-4 dark:bg-gray-800 dark:text-gray-300">
            {/* Sidebar content here */}
            {navLinks}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
