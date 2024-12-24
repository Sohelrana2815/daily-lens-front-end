import { FaCrown } from "react-icons/fa";

const Plans = () => {
  const plans = [
    {
      title: "Basic Plan",
      price: "Free",
      features: ["Access to 10 articles", "Basic support", "Community access"],
      buttonText: "Get Started",
      buttonStyle: "btn-primary",
    },
    {
      title: "Standard Plan",
      price: "$9.99/month",
      features: [
        "Access to 50 articles",
        "Priority support",
        "Ad-free experience",
      ],
      buttonText: "Upgrade Now",
      buttonStyle: "btn-secondary",
    },
    {
      title: "Premium Plan",
      price: "$19.99/month",
      features: [
        "Unlimited articles",
        "Premium support",
        "Access to exclusive content",
        "Ad-free experience",
      ],
      buttonText: "Go Premium",
      buttonStyle: "btn-success",
    },
  ];
  return (
    <>
      <div className="plans-section grid grid-cols-1 md:grid-cols-3 gap-6 px-4 py-10">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`plan-card border rounded-lg shadow-lg p-6 flex flex-col relative ${
              plan.title === "Premium Plan"
                ? " border-2 border-yellow-400"
                : "border-gray-300"
            }`}
          >
            <div className="flex-grow">
              {plan.title === "Premium Plan" && ( // Conditionally render badge
                <div className="absolute badge badge-warning gap-2 right-1 top-1">
                  <FaCrown />
                  Premium
                </div>
              )}
              {plan.title === "Standard Plan" && ( // Conditionally render badge
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
                  <li key={idx} className="text-gray-700 text-sm mb-2">
                    • {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div className="text-center">
              <button className={`btn ${plan.buttonStyle} w-full`}>
                {plan.buttonText}
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Plans;
