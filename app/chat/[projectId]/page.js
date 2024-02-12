"use client";

import ResultRectangle from "@/app/_components/ResultRectangle";
import ChatContainer from "@/app/_components/ChatContainer";
import { styled } from "@mui/material/styles";
import ChatNavbar from "@/app/_components/ChatNavbar";
import Navbar from "@/app/_components/Navbar";
import { useState, useEffect } from "react";
import { postRegister } from "@/app/_utils/requests/auth";
import { getUserByEmail } from "@/app/_utils/requests/users";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import styles from "../chat.module.css";
import FurnitureMenu from "@/app/_components/FurnitureMenu";

const drawerWidth = 252;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    // marginLeft: `-${drawerWidth}px`,
    // ...(open && {
    //   transition: theme.transitions.create("margin", {
    //     easing: theme.transitions.easing.easeOut,
    //     duration: theme.transitions.duration.enteringScreen,
    //   }),
    //   marginLeft: 0,
    // }),
  })
);

const ProjectIdPage = () => {
  const { data } = useSession();

  const router = useRouter();

  const [chats, setChats] = useState([]);

  const updateChats = (updatedChats) => {
    setChats(updatedChats);
  };

  // const dynamoRegister = async () => {
  //   if (data !== undefined) {
  //     const user = await getUserByEmail(data.user.email);
  //     console.log(user);
  //     if (user !== null) {
  //       console.log("user exists");
  //     } else {
  //       const obj = {
  //         email: data.user.email,
  //         password: "123456",
  //       };
  //       await postRegister(obj);
  //     }
  //   }
  // };

  // useEffect(() => {
  //   dynamoRegister();
  // }, [data?.user]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Navbar image={data ? data.user.image : null} router={router} />

      <div
        style={{
          // marginTop: 80,
          // background: "#F0F0F0",
          flex: 1,
          display: "flex",
          overflowY: "auto",
        }}
      >
        <div className={styles.row}>
          <FurnitureMenu />
          <div className={styles.leftColumn}>
            <ChatContainer
              chats={chats}
              onUpdateChats={updateChats}
              session={data ? data : null}
            />
          </div>
          <div className={styles.rightColumn}>
            <ResultRectangle messages={chats} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectIdPage;
