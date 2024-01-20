import styles from "../_styles/chatContainer.module.css";
import { Skeleton, Avatar, Card, CardContent, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Roboto } from "next/font/google";
import { useState, useEffect, useRef } from "react";
import { getAnswer } from "../_utils/requests/chats";
import { getUserByEmail } from "../_utils/requests/users";
import { Scrollbar } from "react-scrollbars-custom";
import chatGniLogo from "../../public/chatGniLogo.svg";
import submitButton from "../../public/submitButton.svg";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { getProject, projectUpdate } from "../_utils/store/projects";

const roboto = Roboto({
  style: "normal",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const BotCard = styled(Card)(({ theme }) => ({
  "&.MuiCard-root": {
    borderRadius: 14,
    background: "#FFF",
    boxShadow: "14px 27px 45px 4px rgba(112, 144, 176, 0.20)",
    height: "min-content",
    marginTop: 50,
  },
}));

const CustomAvatar = styled(Avatar)(({ theme }) => ({
  filter: "grayscale(1)",
}));

const ProjectChatContainer = (props) => {
  const params = useParams();
  const projectId = params.projectId;
  const project = useSelector((state) => state.projects.project);
  const dispatch = useDispatch();
  const scrollEndRef = useRef(null);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    scrollEndRef.current?.scrollToBottom();
  }, [project?.Chats]);

  const getProjectById = async () => {
    const userEmail = props.session.user.email;
    const user = await getUserByEmail(userEmail);

    const projectKeys = {
      projectId,
      userId: user.UserId,
    };
    dispatch(getProject(projectKeys));
  };

  useEffect(() => {
    if (projectId && props.session) {
      getProjectById();
    }
  }, [dispatch, props.session]);

  const Loading = (
    <div style={{ display: "flex" }}>
      <Skeleton variant="circular" style={{ marginRight: 5 }}>
        <Avatar />
      </Skeleton>
      <Skeleton variant="rectangular" width={500} height={40} />
    </div>
  );

  const onPressKeyHandler = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  const sendMessage = async () => {
    if (input.trim() === "") return;

    const userInputObj = {
      text: input,
      sender: "user",
      timeStamp: new Date().toLocaleString("en-GB"),
    };

    const projectDetails = {
      userId: project.UserId,
      cutList: null,
      imageList: null,
      price: null,
      chatId: project.ChatId,
      templateId: project.TemplateId,
      projectId: project.ProjectId,
      chat: userInputObj,
    };

    dispatch(projectUpdate(projectDetails));

    const obj = {
      id: project.ChatId,
      prompt: input,
    };

    setIsLoading(true);
    setInput("");

    const botResponse = await getAnswer(obj);

    if (botResponse) {
      const botChat = {
        text: botResponse.result,
        sender: "bot",
        timeStamp: new Date().toLocaleString("en-GB"),
      };

      //collect data from botresponse & session and use it to start a new project in DB
      const projectData = {
        userId: project.UserId,
        cutList: botResponse.cut_list_url
          ? botResponse.cut_list_url.cutlist
          : null,
        imageList: botResponse.images ? botResponse.images : null,
        price: botResponse.price ? botResponse.price : null,
        chatId: project.ChatId,
        templateId: project.TemplateId,
        projectId: project.ProjectId,
        chat: botChat,
      };

      dispatch(projectUpdate(projectData));
    }

    setIsLoading(false);
  };
  return (
    <div style={{ /*height: 742, width: 836,*/ display: "flex" }}>
      <div
        className={` ${styles.chatBackground}`}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <Scrollbar ref={scrollEndRef}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              margin: 5,
            }}
          >
            {project && project.Chats && project.Chats.length !== 0
              ? project.Chats.map((message, index) => {
                  return (
                    <div style={{ display: "flex" }} key={index}>
                      {message.sender === "user" ? (
                        <CustomAvatar
                          style={{
                            height: 40,
                            width: 40,
                            marginTop: 40,
                          }}
                          src={props.session ? props.session.user.image : null}
                        />
                      ) : message.sender === "bot" ? (
                        <img
                          style={{ height: 40, width: 40, marginTop: 40 }}
                          src={chatGniLogo.src}
                        />
                      ) : null}

                      <BotCard>
                        {message.text === "loading" ? (
                          <CardContent>{Loading}</CardContent>
                        ) : (
                          <CardContent>{message.text}</CardContent>
                        )}
                      </BotCard>
                    </div>
                  );
                })
              : null}
            {isLoading ? (
              <div style={{ display: "flex" }}>
                <BotCard>
                  <CardContent>{Loading}</CardContent>
                </BotCard>
              </div>
            ) : null}
          </div>
        </Scrollbar>
        <div className={styles.inputDiv}>
          <input
            className={`${styles.chatInput} ${roboto.className}`}
            placeholder="Type your message"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyUp={onPressKeyHandler}
          />
          <IconButton
            style={{ background: "#9A9A9D", marginLeft: 10 }}
            onClick={sendMessage}
          >
            <img src={submitButton.src} />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default ProjectChatContainer;
