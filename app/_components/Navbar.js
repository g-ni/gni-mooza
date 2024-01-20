import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Avatar,
  Box,
  Menu,
  MenuItem,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { DM_Sans } from "next/font/google";
import styles from "../_styles/navbar.module.css";
import { styled } from "@mui/material/styles";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";

const dmFont = DM_Sans({
  style: ["normal"],
  subsets: ["latin"],
  weight: ["400"],
});

const CustomTypography = styled(Typography)(({ theme }) => ({
  color: "#146574",
  textAlign: "center",
  fontFeatureSettings: "'clig' off, 'liga' off",
  fontSize: 18,
  fontWeight: 400,
  fontStyle: "normal",
  lineHeight: 18,
  fontFamily: dmFont.style.fontFamily,
}));

const CustomButton = styled(Button)(({ theme }) => ({
  display: "flex",
  padding: "18px 24px",
  justifyContent: "flex-end",
  alignItems: "center",
  gap: "8px",
  borderRadius: "30px",
  background: "#146574",
  textTransform: "none",
  fontSize: "16px",
  fontStyle: "normal",
  fontWeight: 700,
  lineHeight: "18px",
  fontFamily: dmFont.style.fontFamily,
  "&.MuiButton-contained": {
    background: "#146574",
  },
  "&:hover": {
    background: "gray",
  },
}));

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
          height: 110,
          flexShrink: 0,
          background: "#fff",
        }}
      >
        <Toolbar>
          <IconButton
            className={styles.menu}
            size="large"
            edge="start"
            aria-label="menu"
            style={{ margin: 2, color: "#146574" }}
          >
            <MenuIcon />
          </IconButton>
          <CustomTypography style={{ flexGrow: 1, margin: 33 }}>
            GNI Logo
          </CustomTypography>
          <CustomTypography style={{ margin: 33 }}>About Us</CustomTypography>
          <CustomTypography style={{ margin: 33 }}>
            How exactly it works
          </CustomTypography>

          <CustomTypography
            style={{
              marginLeft: 33,
            }}
          >
            Design
          </CustomTypography>
          <IconButton className={styles.arrow}>
            <ExpandMoreIcon />
          </IconButton>

          <CustomTypography style={{ margin: 33 }}>Contact Us</CustomTypography>
          <CustomButton variant="contained">Get Started</CustomButton>
          <IconButton onClick={handleClick} id="lock-button">
            <CustomAvatar
              className={styles.avatar}
              alt="profile_pic"
              src={props.image}
              style={{
                marginLeft: 27,
                width: 54,
                height: 54,
                flexShrink: 0,
              }}
            />
          </IconButton>
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
