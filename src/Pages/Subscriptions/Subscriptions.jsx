import { loadStripe } from "@stripe/stripe-js";
import checkoutImg from "../../assets/CheckoutImg/payment-information-concept-illustration_114360-2296.jpg";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../Components/CheckoutForm/CheckoutForm";

// TODO: create account and get pk
const stripePromise = loadStripe("pk");
const Subscriptions = () => {
  return (
    <div>
      <div>
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </div>
      <img src={checkoutImg} alt="" />
    </div>
  );
};

export default Subscriptions;
