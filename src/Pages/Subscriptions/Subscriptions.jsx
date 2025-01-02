import { Link } from "react-router-dom";
import checkoutImg from "../../assets/CheckoutImg/subscription page.png";
import { useState } from "react";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import { FaLock } from "react-icons/fa";

const subscriptionOptions = [
  { label: "1 Minute Plan", value: "1minute", price: 5 },
  { label: "5 Days Plan", value: "5days", price: 20 },
  { label: "10 Days Plan", value: "10days", price: 35 },
];

const Subscriptions = () => {
  const [selectedSubscription, setSelectedSubscription] = useState(null);

  const handleSubscription = (event) => {
    const selectedValue = event.target.value;
    const selected = subscriptionOptions.find(
      (option) => option.value === selectedValue
    );
    setSelectedSubscription(selected);
  };
  return (
    <>
      <SectionTitle
        titleStyle="Select Your"
        title="Perfect Plan"
        subTitle="Choose a subscription plan that suits your needs and gain access to premium features and exclusive content"
      />
      <div className="flex md:flex-col  flex-col-reverse  lg:flex-row justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 md:py-8 lg:py-0">
        {/* Left Section: Subscription Form */}
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 w-full lg:w-1/2 max-w-md mx-4">
          <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200 text-center">
            Choose Your Subscription Plan
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6 text-center">
            Select a plan that fits your needs. Enjoy premium features and
            exclusive content by subscribing today.
          </p>
          <form>
            {/* Subscription Period */}
            <div className="form-control mb-6">
              <label className="label">
                <span className="label-text text-gray-600 dark:text-gray-300">
                  Subscription Period
                </span>
              </label>
              <select
                onChange={handleSubscription}
                className="select select-bordered dark:bg-gray-700 dark:text-gray-200"
                defaultValue=""
              >
                <option value="" disabled>
                  Select your plan
                </option>
                {subscriptionOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label} - ${option.price}
                  </option>
                ))}
              </select>
              <p className="text-sm mt-2 text-gray-500 dark:text-gray-400">
                Plans are billed monthly or annually depending on your choice.
              </p>
            </div>
            {/* Proceed Button */}
            <div className="form-control">
              {selectedSubscription ? (
                <Link
                  to="/payment"
                  state={{ subscription: selectedSubscription }}
                >
                  <button type="submit" className="btn btn-primary w-full py-3">
                    Proceed to Payment
                  </button>
                </Link>
              ) : (
                <button
                  className="btn btn-primary w-full py-3 dark:bg-stone-200 dark:text-stone-500"
                  disabled
                >
                  Proceed to Payment
                  <FaLock />
                </button>
              )}
              <p className="text-sm mt-4 text-gray-500 dark:text-gray-400 text-center">
                You can cancel your subscription anytime from your account
                settings.
              </p>
            </div>
          </form>
        </div>

        {/* Right Section: Illustration */}
        <div className="w-full lg:w-1/2 p-4">
          <img
            src={checkoutImg}
            alt="Subscription Illustration"
            className="rounded-lg shadow-md object-cover w-full h-64 md:h-[500px] max-h-[600px]:"
          />
          <p className="text-gray-600 dark:text-gray-300 mt-6 text-center">
            &quot;Subscribe now and unlock access to our premium articles,
            expert advice, and much more.&quot;
          </p>
        </div>
      </div>
    </>
  );
};

export default Subscriptions;
