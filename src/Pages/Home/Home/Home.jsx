import AllPublishers from "../AllPublishers/AllPublishers";
import Banner from "../Banner/Banner";
import Plans from "../Plans/Plans";
import Statistics from "../Statistics/Statistics";
import TrendingArticles from "../TrendingArticles/TrendingArticles";

const Home = () => {
  return (
    <>
      <div className="my-32">
        <Banner />
        <TrendingArticles />
        <AllPublishers />
        <Statistics />
        <Plans />
      </div>
    </>
  );
};

export default Home;
