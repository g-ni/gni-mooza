import styles from "../_styles/category.module.css";
import { DM_Sans } from "next/font/google";
import CabinetIcon from "../../public/CabinetIcon.svg";
import ClosetIcon from "../../public/ClosetIcon.svg";
import KitchenIcon from "../../public/KitchenIcon.svg";
import ImageContainer from "../../public/ImageContainer.jpg";
import { signIn, useSession } from "next-auth/react";
import { newProject } from "@/app/_utils/store/projects";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "@/app/_utils/store/users";
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
import { postRegister } from "../_utils/requests/auth";

const dmFont = DM_Sans({
  style: ["normal"],
  subsets: ["latin"],
  weight: ["700", "500"],
});

const mockData = [
  {
    title: "Closets",
    img: <img src={KitchenIcon.src} />,
    className: "kitchens",
  },
  {
    title: "TV Consoles",
    img: <img src={ClosetIcon.src} />,
    className: "closets",
  },
  {
    title: "Vanities",
    img: <img src={CabinetIcon.src} />,
    className: "cabinets",
  },
];

const Categories = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { data } = useSession();

  useEffect(() => {
    if (data) {
      const obj = {
        email: data.user.email,
        password: "password",
      };
      postRegister(obj).then(() => {
        dispatch(getUser(data.user.email));
      });
    }
  }, [dispatch, data]);

  const user = useSelector((state) => state.users.user);

  const onClickFurnitureHandler = () => {
    // TODO -  replace with real templateID
    const templateId = 1;
    const chatId = uuidv4();
    const projectId = uuidv4();
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
    } else {
      alert("please login to enter chat!");
    }
  };
  return (
    <div className={styles.mainDiv}>
      <div className={styles.column}>
        <h2 className={`${styles.header} ${dmFont.className}`}>
          Experience AI<br></br> &#39;Generating&#39; Brilliance<br></br>At Your
          Fingertips!
        </h2>
        <div className={styles.mainCategories}>
          {mockData.map((category, index) => {
            return (
              <div key={index}>
                <button
                  className={`${styles.row}${styles.categoryContainer}`}
                  onClick={onClickFurnitureHandler}
                >
                  {category.img}
                </button>

                <p>{category.title}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div className={`${styles.column} ${styles.imageContainer}`}>
        <img className={styles.mainImage} src={ImageContainer.src} />
      </div>
    </div>
  );
};
export default Categories;
