import CountUp from "react-countup";
const Statistics = () => {
  return (
    <div>
      <div>
        <h1>
          <CountUp start={0} end={500} prefix="$" suffix=" USD" duration={3} />
        </h1>
      </div>
    </div>
  );
};

export default Statistics;
