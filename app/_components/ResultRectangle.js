import undoIcon from "../../public/undoIcon.svg";
import redoIcon from "../../public/redoIcon.svg";
import saveIcon from "../../public/saveIcon.svg";
import shareIcon from "../../public/shareIcon.svg";
import styles from "../_styles/resultRectangle.module.css";
import { Roboto } from "next/font/google";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPresignedUrl } from "../_utils/requests/images";
import { getImagesByDetails } from "../_utils/store/images";

const roboto = Roboto({
  style: "normal",
  subsets: ["latin"],
  weight: ["400"],
});
const ResultRectangle = (props) => {
  const dispatch = useDispatch();
  const images = useSelector((state) => state.images.images);
  // console.log(images);
  const myBucket = process.env.NEXT_PUBLIC_AWS_BUCKET_NAME;
  const myObjKeyPrefix = process.env.NEXT_PUBLIC_AWS_OBJECT_KEY_PREFIX;
  const templatesBucket = process.env.NEXT_PUBLIC_AWS_TEMPLATES_BUCKET;
  const [currentImage, setCurrentImage] = useState(null);

  const project = useSelector((state) => state.projects.project);

  const iconsArr = [undoIcon, redoIcon, saveIcon, shareIcon];

  const fetchPresignedUrl = async () => {
    if (project?.ChatId) {
      const fullObjKey = myObjKeyPrefix + project.ChatId;
      let imageDetails;
      console.log(project.TemplateId);
      if (project.TemplateId === 1) {
        imageDetails = { bucket: myBucket, key: fullObjKey };
        console.log("got into if ");
      } else {
        console.log("got into else");

        if (images.length !== 0) {
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
          console.log(imageDetails);
        }
      }
      console.log(imageDetails);
      const presignedUrlImage = await getPresignedUrl(imageDetails);
      if (presignedUrlImage) {
        setCurrentImage(presignedUrlImage);
      }
    }
  };

  useEffect(() => {
    const templateDetails = {
      company: "mooza",
      furnitureType: "vanity",
    };
    dispatch(getImagesByDetails(templateDetails));
    fetchPresignedUrl();
  }, [dispatch, project]);

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
