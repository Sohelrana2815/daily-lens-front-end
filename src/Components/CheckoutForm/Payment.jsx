import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useLocation, useNavigate } from "react-router-dom";

// Make sure to call 'loadStripe outside of a component's render to avoid recreating the `stripe` object on every render'

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);
const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const subscriptionData = location.state?.subscription;
  console.log(subscriptionData);

  if (!subscriptionData) {
    // Redirect if no subscription data is found
    navigate("/");
  }

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm subscription={subscriptionData} />
    </Elements>
  );
};

export default Payment;
