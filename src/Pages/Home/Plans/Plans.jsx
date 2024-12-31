import { FaCrown } from "react-icons/fa";
import { Link } from "react-router-dom";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";

const Plans = () => {
  const plans = [
    {
      title: "Basic Plan",
      price: "$5",
      features: ["1 Minute", "Quick updates", "Fast read"],
      buttonText: "Get Started",
      buttonStyle: "btn-primary",
    },
    {
      title: "Standard",
      price: "$20",
      features: ["5 Days", "Daily highlights", "Brief stories"],
      buttonText: "Upgrade Now",
      buttonStyle: "btn-info",
    },
    {
      title: "Premium",
      price: "$35",
      features: ["10 Days", "In-depth", "Comprehensive coverage"],
      buttonText: "Go Premium",
      buttonStyle: "btn-warning",
    },
  ];
  return (
    <>
      <SectionTitle
        titleStyle="Subscription"
        title="Plans"
        subTitle="Tailored plans to match your reading habits."
      />
      <div className="plans-section grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 py-10 max-w-screen-xl mx-auto">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`plan-card border rounded-lg shadow-lg p-6 flex flex-col relative ${
              plan.title === "Premium"
                ? " border-2 border-yellow-400"
                : "border-gray-300"
            }`}
          >
            <div className="flex-grow">
              {plan.title === "Premium" && ( // Conditionally render badge
                <div className="absolute badge badge-warning gap-2 right-1 top-1">
                  <FaCrown />
                  Premium
                </div>
              )}
              {plan.title === "Standard" && ( // Conditionally render badge
                <div className="absolute badge badge-ghost gap-2 right-1 top-1">
                  <FaCrown />
                  Standard
                </div>
              )}
              <h3 className="text-2xl font-semibold text-center mb-4">
                {plan.title}
              </h3>
              <p className="text-center text-xl font-bold mb-6">{plan.price}</p>
              <ul className="features-list mb-6">
                {plan.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className="text-gray-700 dark:text-gray-200 text-sm mb-2"
                  >
                    • {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div className="text-center">
              <Link to="/subscriptions">
                <button className={`btn ${plan.buttonStyle} w-full`}>
                  {plan.buttonText}
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Plans;
