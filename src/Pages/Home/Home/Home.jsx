import AllPublishers from "../AllPublishers/AllPublishers";
import Banner from "../Banner/Banner";
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
        <h2>Plans</h2>
      </div>
    </>
  );
};

export default Home;
