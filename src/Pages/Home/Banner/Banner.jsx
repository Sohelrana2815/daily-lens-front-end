import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { FaChevronLeft, FaChevronRight, FaClock } from "react-icons/fa"; // For custom arrow icons

const bannerImages = [
  { src: "/assets/Banner/banner1.jpg", alt: "Banner 1" },
  { src: "/assets/Banner/banner2.jpg", alt: "Banner 2" },
];

const Banner = () => {
  return (
    <Carousel
      showThumbs={false}
      renderArrowPrev={(clickHandler, hasPrev) =>
        hasPrev && (
          <button
            onClick={clickHandler}
            className="absolute top-1/2 left-5 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-10"
            aria-label="Previous Slide"
          >
            <FaChevronLeft size={20} />
          </button>
        )
      }
      renderArrowNext={(clickHandler, hasNext) =>
        hasNext && (
          <button
            onClick={clickHandler}
            className="absolute top-1/2 right-5 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-10"
            aria-label="Next Slide"
          >
            <FaChevronRight size={20} />
          </button>
        )
      }
    >
      {bannerImages.map((bannerImage, index) => (
        <div
          key={index}
          className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]"
        >
          <img
            src={bannerImage.src}
            alt={bannerImage.alt}
            className="object-cover h-full w-full"
          />
          {/* Card Component */}
          <div className="absolute inset-0 flex items-center justify-center md:left-56 md:justify-start text-start ">
            <div className="bg-white shadow-lg  p-6 max-w-xs md:max-w-md space-y-4 lg:min-h-60 border-black border-t-8">
              {/* Tag and date */}
              <div className="flex items-center gap-x-4">
                <p className="bg-red-600 text-xs px-2 py-[2px] rounded-none font-bold text-start text-white">
                  Sports
                </p>
                <p className="flex  items-center gap-x-2 text-gray-600">
                  <FaClock />
                  {new Date().toLocaleDateString()}
                </p>
              </div>

              {/* Title and button */}
              <div>
                <p className="text-sm md:text-lg lg:text-xl xl:text-2xl font-bold text-gray-600 ">
                  The Green Revolution: How Sustainability is Shaping the Future
                </p>
                <p className="text-gray-600">
                  Explore how eco-friendly innovations are transforming
                  industries and paving the way for a greener tomorrow.
                </p>

                <button className=" border p-1 btn-xs  uppercase rounded-none mt-4 text-gray-500">
                  Read more
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default Banner;
