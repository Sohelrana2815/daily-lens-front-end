import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useUsers from "../../Hooks/useUsers";

const CheckoutForm = ({ subscription }) => {
  const { user } = useAuth();
  const { refetch } = useUsers();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const { label, value, price } = subscription;

  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    if (price) {
      const packagePrice = {
        price: parseFloat(price),
      };

      axiosPublic
        .post("/create-payment-intent", { packagePrice })
        .then((response) => {
          setClientSecret(response.data.clientSecret);
        })
        .catch((error) => {
          console.error("Error creating payment intent:", error);
        });
    }
  }, [axiosPublic, price, value]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (card == null) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
    } else {
      console.log(paymentMethod);

      setError("");
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      console.log("Confirm error");
    } else {
      if (paymentIntent.status === "succeeded") {
        setTransactionId(paymentIntent.id);

        // Optimistic update
        const subscriptionInfo = {
          price: paymentIntent.amount,
          period: subscription.value,
        };

        axiosPublic
          .patch(`/userSubscriptionInfo/${user?.email}`, { subscriptionInfo })
          .then((response) => {
            if (response.data.modifiedCount > 0) {
              refetch();
              Swal.fire({
                title: "Thank you for subscription",
                text: "You Can Access Premium Articles!",
                icon: "success",
              });
              navigate("/");
            }
          })
          .catch((error) => {
            console.error("Error updating subscription:", error);
          });
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <form
        className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 space-y-6"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold text-center text-blue-700">
          Payment Form for{" "}
          {subscription ? `${label} - $${price}` : "Loading..."}
        </h2>
        <p className="text-center text-gray-600">
          Enter your card details below to proceed with the payment.
        </p>
        <div className="relative">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
            className="p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <button
          className="w-full bg-blue-500 text-white py-3 rounded-lg text-lg font-medium hover:bg-blue-600 transition duration-200 disabled:opacity-50"
          type="submit"
          disabled={!stripe || !clientSecret}
        >
          Pay
        </button>
        <p className="text-red-600">{error}</p>
        {transactionId && (
          <p className="text-center text-green-500">
            Your Transaction Id: {transactionId}
          </p>
        )}
      </form>
    </div>
  );
};

export default CheckoutForm;
