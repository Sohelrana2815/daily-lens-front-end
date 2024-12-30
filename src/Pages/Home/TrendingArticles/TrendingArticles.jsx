import { useEffect, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation } from "swiper/modules";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
const TrendingArticles = () => {
  // approved article
  const [trendingArticles, setTrendingArticles] = useState([]);

  const axiosPublic = useAxiosPublic();
  useEffect(() => {
    const fetchTrendingArticles = async () => {
      try {
        const response = await axiosPublic.get("/trendingArticles");
        setTrendingArticles(response.data);
      } catch (error) {
        console.error("Error fetching trending articles:", error);
      }
    };
    fetchTrendingArticles();
  }, [axiosPublic]);

  return (
    <>
      <div className="max-w-screen-2xl mx-auto p-4 dark:bg-gray-600 bg-base-200 my-40">
        <SectionTitle title="Trending Articles Based on Popularity" />
        <Swiper
          slidesPerView={1}
          centeredSlides={true}
          spaceBetween={30}
          pagination={{
            type: "fraction",
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="mySwiper"
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {trendingArticles.map((trendingArticle) => (
            <SwiperSlide key={trendingArticle._id}>
              <div className="card bg-base-100 shadow-xl rounded-lg max-w-xs md:max-w-sm lg:max-w-md mx-auto h-[450px] md:h-[500px]">
                <figure className="relative h-48 md:h-56 lg:h-64">
                  <img
                    className="w-full h-full object-cover rounded-t-lg"
                    src={trendingArticle.articleImage}
                    alt="Article"
                  />
                  <p className="absolute text-white bg-black bg-opacity-60 p-2 rounded-lg top-4 left-4 text-xs md:text-sm lg:text-base">
                    {new Date(trendingArticle.postedDate).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      }
                    )}
                  </p>
                </figure>
                <div className="card-body p-4 md:p-6 h-[300px]">
                  <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-600">
                    {trendingArticle.articleTitle}
                  </h2>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-sm md:text-base text-gray-600">
                      {trendingArticle.publisherName}
                    </p>
                    <p className="text-sm md:text-base text-gray-700 flex items-center gap-1">
                      <FaEye />
                      {trendingArticle.views}
                    </p>
                  </div>
                  <p className="text-sm md:text-base text-gray-600 mt-2 flex flex-wrap gap-2 items-center">
                    {trendingArticle.articleTags.map((articleTag, index) => (
                      <span
                        key={index}
                        className="bg-red-600 text-white px-2 py-[2px] rounded-none text-xs md:text-sm"
                      >
                        # {articleTag}
                      </span>
                    ))}
                  </p>
                  <p className="text-sm md:text-base text-gray-700 mt-4">
                    {trendingArticle.articleDescription.slice(0, 79)}...
                  </p>
                  <Link to="/allArticles">
                    <button className=" text-xs rounded-none text-gray-900 border px-2 py-[2px] uppercase hover:bg-red-600 hover:text-white">
                      Read more
                    </button>
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default TrendingArticles;
