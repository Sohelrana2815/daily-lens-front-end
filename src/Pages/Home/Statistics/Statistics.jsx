import CountUp from "react-countup";
const Statistics = () => {
  return (
    <div>
      <div>
        <h1>
          <CountUp start={0} end={100} duration={2.5} />
        </h1>
      </div>
    </div>
  );
};

export default Statistics;
