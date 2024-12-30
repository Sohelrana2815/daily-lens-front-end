import CountUp from "react-countup";
import useUsers from "../../../Hooks/useUsers";

const Statistics = () => {
  const { allUsers } = useUsers();

  // Filter users into normal and premium

  const normalUsers = allUsers.filter(
    (user) => user.subscriptionPeriod === null
  );
  const premiumUsers = allUsers.filter(
    (user) => user.subscriptionPeriod !== null
  );

  return (
    <div>
      <div>
        <h2>Total Users: {allUsers.length}</h2>
        <h2>Normal Users: {normalUsers.length}</h2>
        <h2>Premium Users: {premiumUsers.length}</h2>

        <div className="stats">
          <div className="stat-item">
            <h3>Total Users</h3>
            <CountUp start={0} end={allUsers.length} duration={3} />
          </div>
          <div className="stat-item">
            <h3>Normal Users</h3>
            <CountUp start={0} end={normalUsers.length} duration={3} />
          </div>
          <div className="stat-item">
            <h3>Premium Users</h3>
            <CountUp start={0} end={premiumUsers.length} duration={3} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
