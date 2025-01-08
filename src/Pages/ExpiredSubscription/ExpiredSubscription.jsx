import { useNavigate } from "react-router-dom";
import expiredImg from "../../assets/Expired Subscription/expired.webp";
const ExpiredSubscription = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 w-11/12 md:w-2/3 lg:w-1/2 text-center">
        <img
          src={expiredImg}
          alt="Expired Subscription"
          className="mx-auto mb-4 max-w-full h-auto rounded-lg"
        />
        <h2 className="text-2xl font-bold text-red-600 mb-2">
          Your Subscription Has Expired
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          Unlock premium articles and enhance your experience with exclusive
          content, ad-free browsing, and much more!
        </p>
        <button
          onClick={() => navigate("/subscriptions")}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-all duration-300"
        >
          Renew Subscription
        </button>
      </div>
    </div>
  );
};

export default ExpiredSubscription;
