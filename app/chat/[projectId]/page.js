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
import { Grid, Box } from "@mui/material";

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
    <Box>
      <Navbar image={data ? data.user.image : null} router={router} />
      <Grid container bgcolor="#F5F5F5" justifyContent="center">
        <FurnitureMenu />
        <Grid
          bgcolor="#F1E6E2"
          width="151px"
          height="610px"
          boxShadow="0px 3.88px 5px 0px rgba(166, 163, 163, 0.10)"
          borderRadius="0px 0px 14px 14px"
          item
        ></Grid>
        <Grid
          item
          width="706px"
          marginX="7px"
          // height="610px"
          // bgcolor="#FFF"
          // borderRadius="0px 0px 14px 14px"
        >
          <ResultRectangle messages={chats} />
        </Grid>
        <Grid item width="431px">
          <ChatContainer
            chats={chats}
            onUpdateChats={updateChats}
            session={data ? data : null}
          />
        </Grid>
      </Grid>
    </Box>
  );

  // return (
  //   <div
  //     style={{
  //       display: "flex",
  //       flexDirection: "column",
  //       minHeight: "100vh",
  //     }}
  //   >
  //     <Navbar image={data ? data.user.image : null} router={router} />

  //     <div
  //       style={{
  //         // marginTop: 80,
  //         // background: "#F0F0F0",
  //         flex: 1,
  //         display: "flex",
  //         overflowY: "auto",
  //       }}
  //     >
  //       <div className={styles.row}>
  //         <FurnitureMenu />
  //         <div className={styles.leftColumn}>
  //           <ChatContainer
  //             chats={chats}
  //             onUpdateChats={updateChats}
  //             session={data ? data : null}
  //           />
  //         </div>
  //         <div className={styles.rightColumn}>
  //           <ResultRectangle messages={chats} />
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
};

export default ProjectIdPage;
