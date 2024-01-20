import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Avatar,
  Box,
  Menu,
  MenuItem,
  ListItemText,
} from "@mui/material";
import { Roboto, Alata, Montserrat } from "next/font/google";
import { styled } from "@mui/material/styles";
import backArrowIcon from "../../public/backArrowIcon.svg";
import styles from "../_styles/chatNavbar.module.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signOut } from "next-auth/react";
import gniLogo from "../../public/gniLogo.svg";
import menuIcon from "../../public/menuIcon.svg";
import expandArrowIcon from "../../public/expandArrowIcon.svg";
import Link from "next/link";

const montserrat = Montserrat({
  style: "normal",
  subsets: ["latin"],
  weight: ["500"],
});

const roboto = Roboto({
  style: "normal",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const alata = Alata({
  style: "normal",
  subsets: ["latin"],
  weight: ["400"],
});

const CenterTypography = styled(Typography)(({ theme }) => ({
  color: "#146574",
  textAlign: "center",
  fontFeatureSettings: "'clig' off, 'liga' off",
  fontFamily: alata.style.fontFamily,
  fontSize: 22,
  fontStyle: "normal",
  fontWeight: 400,
  lineHeight: 18 /* 81.818% */,
}));

const LogoTypography = styled(Typography)(({ theme }) => ({
  color: "#000",
  fontFeatureSettings: "'clig' off, 'liga' off",
  fontFamily: montserrat.style.fontFamily,
  fontSize: 60,
  fontStyle: "normal",
  fontWeight: 500,
  // lineHeight: 18,
}));

const NavbarOption = styled(Typography)(({ theme }) => ({
  color: "#000",
  textAlign: "center",
  fontFeatureSettings: "'clig' off, 'liga' off",
  fontFamily: roboto.style.fontFamily,
  fontSize: 26,
  fontStyle: "normal",
  fontWeight: 400,
  // lineHeight: 18,
  marginTop: 18,
}));

const HomeLink = styled(Typography)(({ theme }) => ({
  color: "#146574",
  textAlign: "center",
  fontFeatureSettings: "'clig' off, 'liga' off",
  fontFamily: roboto.style.fontFamily,
  fontSize: 22,
  fontStyle: "normal",
  fontWeight: 500,
  lineHeight: 18 /* 81.818% */,
}));

const CustomAvatar = styled(Avatar)(({ theme }) => ({
  filter: "grayscale(1)",
}));

const ChatNavbar = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const id = open ? "simple-popover" : undefined;
  return (
    <Box /*sx={{ flexGrow: 1 }}*/>
      <AppBar
        position="relative"
        style={{
          // flexShrink: 0,
          background: "#fff",
        }}
      >
        <Toolbar style={{ height: 80 }}>
          <div style={{ display: "flex", flex: 1 }}>
            <Link href="/">
              <img
                src={gniLogo.src}
                style={{ marginRight: 16, marginTop: 10 }}
              />
            </Link>

            <LogoTypography>GNI</LogoTypography>
          </div>

          <div style={{ display: "flex" }}>
            <NavbarOption style={{ marginRight: 33 }}>About us</NavbarOption>
            <NavbarOption style={{ marginRight: 33 }}>
              How it works{" "}
            </NavbarOption>
            <NavbarOption style={{ marginRight: 10 }}>Design</NavbarOption>
            <IconButton style={{ marginRight: 33 }}>
              <img src={expandArrowIcon.src} />
            </IconButton>
            <NavbarOption>Contact us</NavbarOption>
            <IconButton style={{ marginLeft: 47, marginRight: 47 }}>
              <img src={menuIcon.src} />
            </IconButton>

            {/* <CenterTypography style={{ margin: "auto" }}>
            Generate your Design
          </CenterTypography> */}
            <IconButton onClick={handleClick} id="lock-button">
              <CustomAvatar
                alt="profile_pic"
                src={props.image}
                style={{
                  width: 54,
                  height: 54,
                  flexShrink: 0,
                }}
              />
            </IconButton>
          </div>

          <Menu
            id="lock-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "lock-button",
              role: "listbox",
            }}
          >
            <MenuItem>
              <ListItemText onClick={() => signOut({ callbackUrl: "/" })}>
                Logout
              </ListItemText>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default ChatNavbar;
