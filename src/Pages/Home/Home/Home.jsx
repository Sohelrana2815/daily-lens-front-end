import AllPublishers from "../AllPublishers/AllPublishers";
import Banner from "../Banner/Banner";
import FAQSection from "../FAQSection/FAQSection";
import Plans from "../Plans/Plans";
import Statistics from "../Statistics/Statistics";
import TrendingArticles from "../TrendingArticles/TrendingArticles";

const Home = () => {
  return (
    <>
      <div>
        <Banner />
        <TrendingArticles />
        <AllPublishers />
        <Statistics />
        <Plans />
        <FAQSection/>
      </div>
    </>
  );
};

export default Home;
