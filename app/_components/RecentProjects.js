import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRef } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { getProjectsByUserId } from "@/app/_utils/store/projects";
import { getUser } from "@/app/_utils/store/users";
import { getPresignedUrl } from "../_utils/requests/images";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import TemplateBox from "./TemplateBox";
import Image from "next/image";
import Link from "next/link";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Montserrat } from "next/font/google";
import styles from "@/app/_styles/slider.module.css";

const montserrat = Montserrat({
  style: "normal",
  subsets: ["latin"],
  weight: ["400", "700", "500"],
});

const Heading = styled(Typography)(({ theme }) => ({
  color: "#58646A",
  textAlign: "center",
  fontFeatureSettings: "'clig' off, 'liga' off",
  fontFamily: montserrat.style.fontFamily,
  fontSize: "34.128px",
  fontWeight: 700,
  lineHeight: "43.608px",
}));

const RecentProjects = () => {
  // const swiperContainerRef = useRef(null);
  const projects = useSelector((state) => state.projects.projects);
  const dispatch = useDispatch();
  const { data } = useSession();
  const [presignedImgs, setPresignedImgs] = useState({});
  const myBucket = process.env.NEXT_PUBLIC_AWS_BUCKET_NAME;
  const myObjKeyPrefix = process.env.NEXT_PUBLIC_AWS_OBJECT_KEY_PREFIX;

  useEffect(() => {
    if (data) {
      dispatch(getUser(data.user.email)).then((result) => {
        dispatch(getProjectsByUserId(result.payload.UserId));
      });
    }
  }, [dispatch, data]);

  useEffect(() => {
    if (projects.length > 0) {
      // Fetch presigned URLs for projects with images
      const fetchPresignedUrls = async () => {
        const projectsWithImages = projects.filter(
          (project) => project.ImageList.length !== 0
        );
        const promises = projectsWithImages.map((project) =>
          createPresignedUrl(project.ChatId)
        );

        try {
          const urls = await Promise.all(promises);
          setPresignedImgs(
            urls.reduce(
              (acc, url, index) => ({
                ...acc,
                [projectsWithImages[index].ProjectId]: url,
              }),
              {}
            )
          );
        } catch (error) {
          console.error("Error fetching presigned URLs:", error);
          // Handle errors appropriately
        }
      };

      fetchPresignedUrls();
    }
  }, [projects]);

  const createPresignedUrl = async (chatId) => {
    const fullObjKey = myObjKeyPrefix + chatId;
    const imageDetails = { bucket: myBucket, key: fullObjKey };

    const presignedUrl = await getPresignedUrl(imageDetails);
    console.log(presignedUrl);
    return presignedUrl;
  };

  return (
    <Box marginTop="77.73px" marginBottom="81.53px">
      <Heading marginBottom="53.64px">Continue where you left</Heading>
      <Box width={1206} marginLeft={22}>
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          slidesPerView={3}
          scrollbar
        >
          {projects.length > 0 &&
            projects.map((project, index) => {
              return (
                <SwiperSlide
                  className={styles.swiperSlider}
                  key={index}
                  style={{ width: "363px" }}
                >
                  <Link href={`/chat/${project.ProjectId}`}>
                    <TemplateBox
                      bgBox="#CFD7DB"
                      image={
                        presignedImgs[project.ProjectId] ? (
                          <Image
                            src={presignedImgs[project.ProjectId]}
                            alt={`Image ${index + 1}`}
                            fill
                            sizes="100vw"
                          />
                        ) : null
                      }
                    />
                  </Link>
                </SwiperSlide>
              );
            })}
        </Swiper>
      </Box>
    </Box>
  );
};

export default RecentProjects;
