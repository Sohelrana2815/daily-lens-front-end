import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import Button from "./Button";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="shadow-md w-full fixed top-0 left-0">
      <div className="md:flex items-center justify-between bg-white py-6 md:px-10 px-7">
        {/* Logo Section */}
        <div
          className="font-bold text-2xl cursor-pointer flex items-center font-[Poppins] 
      text-gray-800"
        >
          <span className="text-3xl text-indigo-600 mr-1 pt-2">
            <ion-icon name="logo-ionic"></ion-icon>
          </span>
          Designer
        </div>

        {/* Menu Icon */}
        <div
          onClick={() => setOpen(!open)}
          className="text-3xl absolute right-8 top-6 cursor-pointer md:hidden"
        >
          {open ? (
            <FiX className="text-black" />
          ) : (
            <FiMenu className="text-black" />
          )}
        </div>

        {/* Navigation Links */}
        <ul
          className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
            open ? "top-20 " : "top-[-490px]"
          }`}
        >
          <li className="md:ml-8 text-xl md:my-0 my-7">
            <NavLink
              to="/"
              className="text-gray-800 hover:text-gray-400 duration-500"
              onClick={() => setOpen(false)}
            >
              HOME
            </NavLink>
          </li>
          <li className="md:ml-8 text-xl md:my-0 my-7">
            <NavLink
              to="/service"
              className="text-gray-800 hover:text-gray-400 duration-500"
              onClick={() => setOpen(false)}
            >
              SERVICE
            </NavLink>
          </li>
          <li className="md:ml-8 text-xl md:my-0 my-7">
            <NavLink
              to="/about"
              className="text-gray-800 hover:text-gray-400 duration-500"
              onClick={() => setOpen(false)}
            >
              ABOUT
            </NavLink>
          </li>
          <li className="md:ml-8 text-xl md:my-0 my-7">
            <NavLink
              to="/blogs"
              className="text-gray-800 hover:text-gray-400 duration-500"
              onClick={() => setOpen(false)}
            >
              BLOG&apos;S
            </NavLink>
          </li>
          <li className="md:ml-8 text-xl md:my-0 my-7">
            <NavLink
              to="/contact"
              className="text-gray-800 hover:text-gray-400 duration-500"
              onClick={() => setOpen(false)}
            >
              CONTACT
            </NavLink>
          </li>
          <Button>Get Started</Button>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
