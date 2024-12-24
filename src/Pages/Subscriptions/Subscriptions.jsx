import { Link } from "react-router-dom";
import checkoutImg from "../../assets/CheckoutImg/payment-information-concept-illustration_114360-2296.jpg";

const Subscriptions = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <Link to="/payment">
        <button className="btn btn-primary">Pay</button>
      </Link>
      <img src={checkoutImg} alt="" />
    </div>
  );
};

export default Subscriptions;
