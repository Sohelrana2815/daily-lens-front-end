import { Link } from "react-router-dom";
import checkoutImg from "../../assets/CheckoutImg/payment-information-concept-illustration_114360-2296.jpg";
import { useState } from "react";

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
      <div className="flex flex-col justify-center items-center min-h-screen">
        <div className="flex flex-col items-center">
          <form>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Subscription Period</span>
              </label>
              <select
                onChange={handleSubscription}
                className="select select-bordered"
                defaultValue="value"
              >
                <option value="">Select your plan</option>
                {subscriptionOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label} - ${option.price}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-control mt-6">
              {selectedSubscription ? (
                <Link
                  to="/payment"
                  state={{ subscription: selectedSubscription }}
                >
                  <button type="submit" className="btn btn-primary">
                    Proceed to Payment
                  </button>
                </Link>
              ) : (
                <button className="btn btn-primary" disabled>
                  Proceed to Payment
                </button>
              )}
            </div>
          </form>
        </div>
        <img src={checkoutImg} alt="" />
      </div>
    </>
  );
};

export default Subscriptions;
