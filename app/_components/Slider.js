import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import SlideLeftIcon from "@/public/SlideLeftIcon.svg";
import SlideRightIcon from "@/public/SlideRightIcon.svg";
import { IconButton } from "@mui/material";
import { useRef } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const Slider = () => {
  const swiperContainerRef = useRef(null);

  return (
    <div>
      <IconButton onClick={() => swiperContainerRef.current.swiper.slidePrev()}>
        <img src={SlideLeftIcon.src} />
      </IconButton>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        slidesPerView={4}
        ref={swiperContainerRef}
      ></Swiper>
      <IconButton onClick={() => swiperContainerRef.current.swiper.slideNext()}>
        <img src={SlideRightIcon.src} />
      </IconButton>
    </div>
  );
};

export default Slider;
