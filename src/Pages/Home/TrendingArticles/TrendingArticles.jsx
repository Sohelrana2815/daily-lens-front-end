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
const TrendingArticles = () => {
  const [trendingArticles, setTrendingArticles] = useState([]);

  const [swiperRef, setSwiperRef] = useState(null);
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

  let appendNumber = 4;
  let prependNumber = 1;

  const prepend2 = () => {
    swiperRef.prependSlide([
      '<div class="swiper-slide">Slide ' + --prependNumber + "</div>",
      '<div class="swiper-slide">Slide ' + --prependNumber + "</div>",
    ]);
  };

  const prepend = () => {
    swiperRef.prependSlide(
      '<div class="swiper-slide">Slide ' + --prependNumber + "</div>"
    );
  };

  const append = () => {
    swiperRef.appendSlide(
      '<div class="swiper-slide">Slide ' + ++appendNumber + "</div>"
    );
  };

  const append2 = () => {
    swiperRef.appendSlide([
      '<div class="swiper-slide">Slide ' + ++appendNumber + "</div>",
      '<div class="swiper-slide">Slide ' + ++appendNumber + "</div>",
    ]);
  };
  return (
    <>
      <h2 className="text-center">
        6 Trending articles: {trendingArticles.length}
      </h2>

      <Swiper
        onSwiper={setSwiperRef}
        slidesPerView={3}
        centeredSlides={true}
        spaceBetween={30}
        pagination={{
          type: "fraction",
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {trendingArticles.map((trendingArticle) => (
          <SwiperSlide key={trendingArticle._id}>
            <div className="card">
              <img
                src={trendingArticle.articleImage}
                alt={trendingArticle.articleTitle}
              />
              <h3 className="article-title">{trendingArticle.articleTitle}</h3>
              <p className="article-views">Views: {trendingArticle.views}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <p className="append-buttons">
        <button onClick={() => prepend2()} className="prepend-2-slides">
          Prepend 2 Slides
        </button>
        <button onClick={() => prepend()} className="prepend-slide">
          Prepend Slide
        </button>
        <button onClick={() => append()} className="append-slide">
          Append Slide
        </button>
        <button onClick={() => append2()} className="append-2-slides">
          Append 2 Slides
        </button>
      </p>
    </>
  );
};

export default TrendingArticles;
