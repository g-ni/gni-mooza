import styles from "../_styles/chatContainer.module.css";
import { Skeleton, Avatar, Card, CardContent, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Roboto, Montserrat } from "next/font/google";
import { useState, useEffect, useRef } from "react";
import { getAnswer } from "../_utils/requests/chats";
import { getUserByEmail } from "../_utils/requests/users";
import { Scrollbar } from "react-scrollbars-custom";
import chatGniLogo from "../../public/chatGniLogo.svg";
import submitButton from "../../public/submitButton.svg";
import { useDispatch, useSelector } from "react-redux";
import { chatsActions } from "../_utils/store/chats";
import { getProject, projectUpdate } from "../_utils/store/projects";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

const roboto = Roboto({
  style: "normal",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const montserrat = Montserrat({
  style: "normal",
  subsets: ["latin"],
  weight: ["400", "700", "500"],
});

const BotCard = styled(Card)(({ theme, background }) => ({
  "&.MuiCard-root": {
    borderRadius: 14,
    border: background === "gray" && "1px solid #E2E8F0",
    background: background === "white" ? "#FFF" : "rgba(213, 213, 215, 0.58)",
    boxShadow:
      background === "white"
        ? "0px 5px 13px 0px rgba(166, 163, 163, 0.40)"
        : "0px 5px 4px 0px rgba(0, 0, 0, 0.40)",
    height: "min-content",
    marginTop: 50,
    fontSize: 14,
    fontFamily: montserrat.style,
  },
}));

const CustomAvatar = styled(Avatar)(({ theme }) => ({
  filter: "grayscale(1)",
}));

const ChatContainer = (props) => {
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

  useEffect(() => {
    if (props.session) {
      sendInitialMessage();
    }
  }, [dispatch, props.session]);

  const Loading = (
    <div style={{ display: "flex", marginLeft: 90 }}>
      <Skeleton variant="circular" style={{ marginRight: 5 }}>
        <Avatar />
      </Skeleton>
      <Skeleton variant="rectangular" width={500} height={40} />
    </div>
  );

  const PageLoading = (
    <div style={{ display: "flex" }}>
      <Skeleton
        variant="circular"
        width={30}
        height={30}
        style={{ marginRight: 5, backgroundColor: "black" }}
      />

      <Skeleton
        variant="circular"
        width={30}
        height={30}
        style={{ marginRight: 5, backgroundColor: "black" }}
      />
      <Skeleton
        variant="circular"
        width={30}
        height={30}
        style={{ marginRight: 5, backgroundColor: "black" }}
      />
    </div>
  );

  const onPressKeyHandler = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };
  /*sendInitialmessage is a function that sends the initial data to the chatbot in 
in order to get the initial message from the bot*/
  const sendInitialMessage = async () => {
    /*in order to get a project by its id the userId is also needed 
    because it's a secondary key in the table*/
    if (projectId) {
      const userEmail = props.session.user.email;
      const user = await getUserByEmail(userEmail);

      const projectKeys = {
        projectId,
        userId: user.UserId,
      };
      dispatch(getProject(projectKeys)).then(async (result) => {
        /* when getting the project, if it's the first time we enter to this project
        there will be a message displayed (the meaning is the Chats array in db is empty) */
        if (result.payload.Chats.length === 0) {
          let obj = {};
          //in case it isn't a template
          if (result.payload.TemplateId === 1) {
            obj = {
              id: result.payload.ChatId,
              prompt: `Hi! my name is ${props.session.user.name}`,
            };
          }
          //in case it is a template
          else {
            obj = {
              id: result.payload.ChatId,
              prompt: "",
              templateId: result.payload.TemplateId,
              username: props.session.user.name,
              isFirstPrompt: true,
              companyName: "mooza",
              cabinetType: "vanity",
            };
          }

          const botResponse = await getAnswer(obj);

          const answerObj = {
            text: botResponse.result,
            sender: "bot",
            timeStamp: new Date().toLocaleString("en-GB"),
          };

          const projectDetails = {
            userId: user.UserId,
            cutList: null,
            imageList: null,
            price: null,
            chatId: result.payload.ChatId,
            templateId: result.payload.TemplateId,
            projectId,
            chat: answerObj,
          };

          dispatch(projectUpdate(projectDetails));
        }
      });
    }
  };

  const sendMessage = async () => {
    if (input.trim() === "") return;
    //this object represents the input of the user
    const userInputObj = {
      text: input,
      sender: "user",
      timeStamp: new Date().toLocaleString("en-GB"),
    };

    //every time a user sends a message the project is updated (the Chats array is updated)

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
    //here the project updates the Chats array by saving the user's input
    dispatch(projectUpdate(projectDetails));
    let obj = {};
    //not a template
    if (project.TemplateId === 1) {
      obj = {
        id: project.ChatId,
        prompt: input,
      };
    }
    //is a template
    else {
      obj = {
        id: project.ChatId,
        prompt: input,
        templateId: project.TemplateId,
        username: props.session.user.name,
        isFirstPrompt: false,
        companyName: "mooza",
        cabinetType: "vanity",
      };
    }

    setIsLoading(true);

    setInput("");

    const botResponse = await getAnswer(obj);

    if (botResponse) {
      const botChat = {
        text: botResponse.result,
        sender: "bot",
        timeStamp: new Date().toLocaleString("en-GB"),
      };
      dispatch(chatsActions.addChat(botChat));

      //collect data from botresponse update the project in DB
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
    <div className={styles.mainDiv}>
      <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <Scrollbar ref={scrollEndRef}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              margin: 10,
              zIndex: 2,
              position: "relative",
            }}
          >
            {project && project.Chats && project.Chats.length !== 0
              ? project.Chats.map((message, index) => {
                  return (
                    <div
                      className={
                        message.sender === "user"
                          ? styles.messageContainerUser
                          : styles.messageContainer
                      }
                      key={index}
                    >
                      {message.sender === "user" ? (
                        <CustomAvatar
                          style={{
                            height: 40,
                            width: 40,
                            marginTop: 40,
                            marginLeft: 20,
                            marginRight: 20,
                          }}
                          src={props.session ? props.session.user.image : null}
                        />
                      ) : message.sender === "bot" ? (
                        <img
                          style={{
                            height: 40,
                            width: 40,
                            marginTop: 40,
                            marginLeft: 20,
                            marginRight: 20,
                          }}
                          src={chatGniLogo.src}
                        />
                      ) : null}

                      <BotCard
                        background={message.sender === "bot" ? "white" : "gray"}
                      >
                        <CardContent>{message.text}</CardContent>
                      </BotCard>
                    </div>
                  );
                })
              : PageLoading}
            {isLoading ? (
              <div style={{ display: "flex" }}>
                <BotCard style={{ marginLeft: 90 }} background={"white"}>
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
            style={{
              background: "#FF661F",
              height: "25",
              width: "25",
              marginLeft: 10,
            }}
            onClick={sendMessage}
          >
            <img src={submitButton.src} />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default ChatContainer;
