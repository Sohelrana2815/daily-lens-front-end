import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen w-3/4 mx-auto">
      <h2 className="text-red-500 text-9xl font-bold">404</h2>
      <p className="text-4xl font-semibold uppercase">Page not found</p>
      <p className="text-gray-400 text-xl w-3/4 mx-auto text-center lg:w-1/3">
        Oops! The page you were looking for was not found. Perhaps searching can
        help.
      </p>
      <Link>
        <button className="text-red-500 flex items-center gap-x-2">
          <FaHome className="text-red-600" /> Back to Homepage
        </button>
      </Link>
    </div>
  );
};

export default ErrorPage;
