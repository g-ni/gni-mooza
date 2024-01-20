import undoIcon from "../../public/undoIcon.svg";
import redoIcon from "../../public/redoIcon.svg";
import saveIcon from "../../public/saveIcon.svg";
import shareIcon from "../../public/shareIcon.svg";
import styles from "../_styles/resultRectangle.module.css";
import { Roboto } from "next/font/google";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getPresignedUrl } from "../_utils/requests/images";

const roboto = Roboto({
  style: "normal",
  subsets: ["latin"],
  weight: ["400"],
});
const ResultRectangle = (props) => {
  const images = useSelector((state) => state.images.images);
  console.log(images);
  const myBucket = process.env.NEXT_PUBLIC_AWS_BUCKET_NAME;
  const myObjKeyPrefix = process.env.NEXT_PUBLIC_AWS_OBJECT_KEY_PREFIX;
  const templatesBucket = process.env.NEXT_PUBLIC_AWS_TEMPLATES_BUCKET;
  const [currentImage, setCurrentImage] = useState(null);

  const project = useSelector((state) => state.projects.project);

  const iconsArr = [undoIcon, redoIcon, saveIcon, shareIcon];

  useEffect(() => {
    const fetchPresignedUrl = async () => {
      if (project?.ImageList) {
        if (project.ImageList.length !== 0 || project.TemplateId !== 1) {
          if (project?.ChatId) {
            try {
              const fullObjKey = myObjKeyPrefix + project.ChatId;
              let imageDetails;
              if (project.TemplateId !== 1) {
                const filteredImage = images.filter((obj) =>
                  obj.Key.includes(project.TemplateId)
                );
                const { Key: imageKey } = filteredImage[0];
                console.log(imageKey);
                imageDetails = {
                  bucket: templatesBucket,
                  key: imageKey,
                  imageType: "template",
                };
              } else {
                imageDetails = { bucket: myBucket, key: fullObjKey };
              }
              console.log(imageDetails);
              const presignedUrlImage = await getPresignedUrl(imageDetails);
              if (presignedUrlImage) {
                // console.log("OLD IMAGE!!!");
                // console.log(
                //   project.ImageList[project.ImageList.length - 1].value[0]
                // );
                console.log("NEW IMAGE!!!");
                console.log(presignedUrlImage);
                //setCurrentImage(project.ImageList[project.ImageList.length - 1].value);
                setCurrentImage(presignedUrlImage);
              } else {
                setCurrentImage(null);
              }
            } catch (error) {
              console.error("Error fetching presigned URL:", error);
              setCurrentImage(null);
            }
          }
        } else {
          setCurrentImage(null);
        }
      }
    };
    fetchPresignedUrl();
  }, [project.ImageList]);

  return (
    <div className={styles.mainDiv}>
      <div className={styles.iconsContainer}>
        {iconsArr.map((icon, index) => {
          return <img key={index} className={styles.icon} src={icon.src} />;
        })}
      </div>
      <div className={styles.resultContainer}>
        {!currentImage ? (
          <p className={`${styles.result} ${roboto.className}`}>
            Here you will see the result!
          </p>
        ) : (
          <img className={styles.resultImage} src={`${currentImage}`} />
        )}
      </div>
    </div>
  );
};

export default ResultRectangle;
