import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import banner1 from "../../../assets/Banner/banner1.jpg";
import banner2 from "../../../assets/Banner/banner2.jpg";

const CustomCarousel = () => {
  return (
    <Carousel>
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
