import {
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  Box,
  Menu,
  MenuItem,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@/public/menuIcon.svg";
import styles from "../_styles/navbar.module.css";
import { styled } from "@mui/material/styles";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";
import MoozaLogo from "@/public/MoozaLogo.png";
import Image from "next/image";
import CartIcon from "@/public/CartIcon.svg";
import { LogoTypography } from "./CustomUI";

const CustomAvatar = styled(Avatar)(({ theme }) => ({
  filter: "grayscale(1)",
}));

const Navbar = (props) => {
  const { data } = useSession();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        style={{
          height: 64,
          flexShrink: 0,
          background: "#fff",
        }}
      >
        <Toolbar
          className={styles.navbar}
          sx={{ justifyContent: "space-between" }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <IconButton>
              <Image src={MoozaLogo} />
            </IconButton>
            <LogoTypography sx={{ marginTop: "1rem" }} component="div">
              Powered By <span style={{ fontWeight: "700" }}>GNi</span>
            </LogoTypography>
          </div>

          <div style={{ display: "flex" }}>
            <IconButton /*edge="end"*/>
              <Image src={CartIcon} />
            </IconButton>
            <IconButton onClick={handleClick} id="lock-button">
              <CustomAvatar
                className={styles.avatar}
                alt="profile_pic"
                src={props.image}
                style={{
                  marginLeft: 27,
                  marginRight: 27,
                  width: 35,
                  height: 35,
                }}
              />
            </IconButton>
            <IconButton style={{ marginRight: 20 }}>
              <Image src={MenuIcon} />
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
              {!data ? (
                <ListItemText
                  onClick={() =>
                    signIn(
                      "auth0",
                      {
                        callbackUrl: "/",
                      },
                      { prompt: "login" }
                    )
                  }
                >
                  Login
                </ListItemText>
              ) : (
                <ListItemText onClick={() => signOut({ callbackUrl: "/" })}>
                  Logout
                </ListItemText>
              )}
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
