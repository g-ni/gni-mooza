import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import SlideLeftIcon from "@/public/SlideLeftIcon.svg";
import SlideRightIcon from "@/public/SlideRightIcon.svg";
import { IconButton } from "@mui/material";
import { useRef, useEffect, useState } from "react";
import { getImages, getPresignedUrl } from "../_utils/requests/images";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import styles from "@/app/_styles/slider.module.css";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "@/app/_utils/store/users";
import { newProject } from "@/app/_utils/store/projects";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { imagesActions } from "@/app/_utils/store/images";

const Vanities = () => {
  const dispatch = useDispatch();
  const { data } = useSession();
  const router = useRouter();
  const swiperContainerRef = useRef(null);
  const user = useSelector((state) => state.users.user);

  const [preSignedImages, setPresignedImages] = useState([]);

  const getTemplatesHandler = async () => {
    const templateDetails = {
      company: "mooza",
      furnitureType: "vanity",
    };
    //getImages returns the urls of the existing images of templates
    const images = await getImages(templateDetails);
    console.log(images);
    dispatch(imagesActions.setImages(images));
    let presinedArr = [];
    //looping through the images array and turning them to presigned urls
    for (let i = 0; i < images.length; i++) {
      const imageDetails = {
        bucket: process.env.NEXT_PUBLIC_AWS_TEMPLATES_BUCKET,
        key: images[i].Key,
        imageType: "template",
      };
      //the match method extracts the name of the image which is also the templateId
      const templateId = images[i].Key.match(/\/([^\/]+)\.svg$/)[1];

      try {
        const imageUrl = await getPresignedUrl(imageDetails);
        //presignedArr will be an array of objects, each object has the imageUrl and the templateId
        presinedArr.push({
          imageUrl,
          templateId,
        });
      } catch (error) {
        console.error(error);
      }
    }
    console.log(presinedArr);
    setPresignedImages(presinedArr);
  };

  useEffect(() => {
    getTemplatesHandler();
  }, []);

  useEffect(() => {
    if (data) {
      dispatch(getUser(data.user.email));
    }
  }, [data, dispatch]);

  const onClickTemplate = (template) => {
    console.log(template);
    const chatId = uuidv4();
    const projectId = uuidv4();
    const templateId = template.templateId;
    console.log(templateId);
    if (user.UserId !== undefined || null) {
      const projectDetails = {
        userId: user.UserId,
        cutList: [],
        imageList: [],
        price: [],
        chatId: chatId,
        templateId: templateId,
        projectId: projectId,
        chat: [],
      };

      dispatch(newProject(projectDetails)).then(() => {
        router.push(`/chat/${projectId}`);
      });
    }
  };

  return (
    <div style={{ display: "flex" }}>
      {preSignedImages.length >= 4 && (
        <IconButton
          onClick={() => swiperContainerRef.current.swiper.slidePrev()}
        >
          <img src={SlideLeftIcon.src} />
        </IconButton>
      )}
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        slidesPerView={preSignedImages.length < 4 ? preSignedImages.length : 4}
        ref={swiperContainerRef}
      >
        {preSignedImages.map((template, index) => {
          return (
            <SwiperSlide key={index}>
              <button onClick={() => onClickTemplate(template)}>
                <div className={styles.projectContainer}>
                  <img src={template.imageUrl} />
                  <p>{template.templateId}</p>
                </div>
              </button>
            </SwiperSlide>
          );
        })}
      </Swiper>
      {preSignedImages.length >= 4 && (
        <IconButton
          onClick={() => swiperContainerRef.current.swiper.slideNext()}
        >
          <img src={SlideRightIcon.src} />
        </IconButton>
      )}
    </div>
  );
};

export default Vanities;
