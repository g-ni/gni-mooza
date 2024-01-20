import {
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import inspirationIcon from "../../public/inspirationIcon.svg";
import projectsIcon from "../../public/projectsIcon.svg";
import templatesIcon from "../../public/templatesIcon.svg";
import styles from "../_styles/chatMenu.module.css";
import { styled } from "@mui/material/styles";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  style: "normal",
  subsets: ["latin"],
  weight: ["400"],
});

const MenuText = styled(ListItemText)(({ theme }) => ({
  display: "flex",
  width: 95,
  height: 18,
  flexDirection: "column",
  justifyContent: "center",
  color: "#146574",
  fontFeatureSettings: "'clig' off, 'liga' off",
  fontFamily: roboto.style.fontFamily,
  fontSize: 18,
  fontStyle: "normal",
  fontWeight: 400,
  lineHeight: 18,
}));

const CustomDrawer = styled(Drawer)(({ theme }) => ({
  width: 252,
  height: 903,
  "& .css-12i7wg6-MuiPaper-root-MuiDrawer-paper": {
    borderRadius: "0px 20px 20px 20px",
    boxShadow: "0px 17px 40px 4px rgba(112, 144, 176, 0.11)",
    marginTop: 110,
  },
}));

const ChatMenu = (props) => {
  const menuOptions = [
    {
      name: "My Projects",
      image: <img src={projectsIcon.src} />,
    },
    {
      name: "Inspiration",
      image: <img src={inspirationIcon.src} />,
    },
    {
      name: "Templates",
      image: <img src={templatesIcon.src} />,
    },
  ];

  // const [open, setOpen] = useState(false);

  // const toggleDrawer = (isOpen) => (event) => {
  //   if (
  //     event.type === "keydown" &&
  //     (event.key === "Tab" || event.key === "Shift")
  //   ) {
  //     return;
  //   }

  //   setOpen(isOpen);
  // };

  return (
    <div /*className={styles.mainDiv}*/>
      <IconButton
        onClick={props.toggle(true)}
        size="large"
        edge="start"
        aria-label="menu"
        style={{ margin: 2, color: "#146574" }}
      >
        <MenuIcon />
      </IconButton>
      <CustomDrawer
        anchor="left"
        open={props.open}
        variant="persistent"
        onClose={props.toggle(false)}
        // style={{
        //   borderRadius: "0px 20px 20px 20px",
        //   boxShadow: "0px 17px 40px 4px rgba(112, 144, 176, 0.11)",
        // }}
      >
        <div
          role="presentation"
          onClick={props.toggle(false)}
          onKeyDown={props.toggle(false)}
        >
          <div className={`${styles.divLogo} ${roboto.className}`}>
            <p className={styles.logo}>G-NI Logo</p>
          </div>
          <List>
            {menuOptions.map((option, index) => {
              return (
                <ListItemButton key={index}>
                  <ListItemIcon
                    style={{ width: 24, height: 24, flexShrink: 0 }}
                  >
                    {option.image}
                  </ListItemIcon>
                  <MenuText>{option.name}</MenuText>
                </ListItemButton>
              );
            })}
          </List>
        </div>
      </CustomDrawer>
    </div>
  );
};

export default ChatMenu;
