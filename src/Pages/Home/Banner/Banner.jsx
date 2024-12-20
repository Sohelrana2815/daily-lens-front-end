import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import banner1 from "../../../assets/Banner/banner1.jpg";
import banner2 from "../../../assets/Banner/banner2.jpg";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const CustomCarousel = () => {
  return (
    <Carousel
      showArrows
      renderArrowPrev={(onClickHandler, hasPrev, label) =>
        hasPrev && (
          <button
            type="button"
            onClick={onClickHandler}
            title={label}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-gray-800 text-white flex items-center justify-center"
          >
            <FiChevronLeft />
          </button>
        )
      }
      renderArrowNext={(onClickHandler, hasNext, label) =>
        hasNext && (
          <button
            type="button"
            onClick={onClickHandler}
            title={label}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-gray-800 text-white flex items-center justify-center"
          >
            <FiChevronRight />
          </button>
        )
      }
    >
      <div>
        <img src={banner1} alt="Banner 1" />
      </div>
      <div>
        <img src={banner2} alt="Banner 2" />
      </div>
      <div>{/* <img src={banner3} alt="Banner 3" /> */}</div>
      <div>{/* <img src={banner4} alt="Banner 4" /> */}</div>
    </Carousel>
  );
};

export default CustomCarousel;
