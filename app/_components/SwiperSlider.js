import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";
import ImageIcon from "@/public/ImageIcon.svg";
import SlideLeftIcon from "@/public/SlideLeftIcon.svg";
import SlideRightIcon from "@/public/SlideRightIcon.svg";
import { IconButton } from "@mui/material";
import { useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import styles from "@/app/_styles/slider.module.css";

const SwiperSlider = (props) => {
  const swiperContainerRef = useRef(null);
  const router = useRouter();

  return (
    <div>
      {/* conditional to have 4 or more projects in order to show the slider  */}

      {props.projects && props.projects !== null && (
        <div style={{ display: "flex" }}>
          {props.projects.length >= 4 && (
            <IconButton
              onClick={() => swiperContainerRef.current.swiper.slidePrev()}
            >
              <img src={SlideLeftIcon.src} />
            </IconButton>
          )}
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            slidesPerView={4}
            ref={swiperContainerRef}
          >
            {props.projects.map((project, index) => {
              let image;
              if (project.ImageList.length !== 0) {
                //define image as the last image of imageList if there are any images
                [image] = project.ImageList[project.ImageList.length - 1].value;
              }

              return (
                <SwiperSlide key={index}>
                  <Link href={`/chat/${project.ProjectId}`}>
                    <div className={styles.projectContainer}>
                      {/* if image exists it is shown in src and if not there is a mock image */}
                      {image ? (
                        <img style={{ width: 81, height: 71 }} src={image} />
                      ) : (
                        <img src={ImageIcon.src} />
                      )}
                      <p className={styles.projectName}>
                        {project.CreationDate}
                      </p>
                    </div>
                  </Link>
                </SwiperSlide>
              );
            })}
          </Swiper>
          {props.projects.length >= 4 && (
            <IconButton
              onClick={() => swiperContainerRef.current.swiper.slideNext()}
            >
              <img src={SlideRightIcon.src} />
            </IconButton>
          )}
        </div>
      )}
    </div>
  );
};

export default SwiperSlider;
