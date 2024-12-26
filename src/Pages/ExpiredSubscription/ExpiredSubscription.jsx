import expiredImg from "../../assets/Expired Subscription/expired.webp";
const ExpiredSubscription = () => {
  return (
    <div>
      <h2 className="text-center font-bold text-red-600">
        Your subscription is expired
      </h2>
      <img src={expiredImg} alt="" />
    </div>
  );
};

export default ExpiredSubscription;
